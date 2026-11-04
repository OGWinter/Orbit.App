import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import type { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, getSupabaseConfigError } from '../services/supabase';

/**
 * Distinguishes invalid/expired/missing recovery sessions from ordinary transient or validation errors.
 */
export const isRecoverySessionInvalidError = (error: AuthError | Error | null): boolean => {
  if (!error) return false;

  const message = error.message ? error.message.toLowerCase() : '';
  const status = 'status' in error && typeof (error as any).status === 'number' ? (error as any).status : 0;
  const code = 'code' in error && typeof (error as any).code === 'string' ? (error as any).code.toLowerCase() : '';

  const invalidSessionMessages = [
    'session missing',
    'session expired',
    'token expired',
    'invalid token',
    'invalid jwt',
    'jwt expired',
    'user not found',
    'sub claim',
    'recovery link',
    'recovery token',
    'not authorized',
    'unauthorized',
    'session not found',
    'auth session missing',
    'recovery authorization required',
  ];

  const invalidSessionCodes = [
    'session_not_found',
    'user_not_found',
    'token_expired',
    'bad_jwt',
    'invalid_token',
    'session_expired',
  ];

  if (invalidSessionCodes.includes(code)) {
    return true;
  }

  if (invalidSessionMessages.some((msg) => message.includes(msg))) {
    return true;
  }

  if (status === 401 || status === 403) {
    return true;
  }

  return false;
};

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  configError: string | null;
  isRecoverySession: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | Error | null; needsEmailVerification?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | Error | null }>;
  signOut: () => Promise<{ error: AuthError | Error | null }>;
  resetPasswordForEmail: (email: string) => Promise<{ error: AuthError | Error | null }>;
  updatePassword: (password: string) => Promise<{ error: AuthError | Error | null }>;
  clearRecoverySession: () => void;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  session: null,
  loading: false,
  isConfigured: false,
  configError: null,
  isRecoverySession: false,
  signUp: async () => ({ error: new Error('AuthProvider is not mounted') }),
  signIn: async () => ({ error: new Error('AuthProvider is not mounted') }),
  signOut: async () => ({ error: null }),
  resetPasswordForEmail: async () => ({ error: new Error('AuthProvider is not mounted') }),
  updatePassword: async () => ({ error: new Error('AuthProvider is not mounted') }),
  clearRecoverySession: () => {},
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Recovery authorization is strictly initialized to false.
  // URL parameters or hash fragments must never grant authorization.
  const [isRecoverySession, setIsRecoverySession] = useState<boolean>(false);
  const isRecoveryRef = useRef<boolean>(false);

  useEffect(() => {
    isRecoveryRef.current = isRecoverySession;
  }, [isRecoverySession]);

  const configured = isSupabaseConfigured();
  const configError = getSupabaseConfigError();

  useEffect(() => {
    if (!configured || !supabase) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    // Fetch initial session (generic session does NOT grant recovery authorization)
    supabase.auth
      .getSession()
      .then(({ data: { session: initialSession }, error }) => {
        if (error) {
          if (isMounted) {
            setSession(null);
            setUser(null);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSession(null);
          setUser(null);
          setLoading(false);
        }
      });

    // Listen to Supabase auth transitions
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (isMounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // ONLY authorize when Supabase itself emits PASSWORD_RECOVERY
        if (event === 'PASSWORD_RECOVERY') {
          isRecoveryRef.current = true;
          setIsRecoverySession(true);
        } else if (event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
          isRecoveryRef.current = false;
          setIsRecoverySession(false);
        }

        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [configured]);

  const signUp = async (
    email: string,
    password: string,
    fullName: string
  ): Promise<{ error: AuthError | Error | null; needsEmailVerification?: boolean }> => {
    if (!configured || !supabase) {
      return {
        error: new Error(
          configError ||
            'Supabase authentication is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file.'
        ),
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        return { error };
      }

      // Check if email confirmation is required:
      // When email confirmation is enabled in Supabase, data.session is null until verified.
      const needsEmailVerification = !data.session;
      return { error: null, needsEmailVerification };
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error('An unexpected error occurred during registration.'),
      };
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ error: AuthError | Error | null }> => {
    if (!configured || !supabase) {
      return {
        error: new Error(
          configError ||
            'Supabase authentication is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file.'
        ),
      };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error };
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error('An unexpected error occurred during sign-in.'),
      };
    }
  };

  const signOut = async (): Promise<{ error: AuthError | Error | null }> => {
    isRecoveryRef.current = false;
    setIsRecoverySession(false);

    if (!configured || !supabase) {
      setSession(null);
      setUser(null);
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setSession(null);
        setUser(null);
      }
      return { error };
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error('An unexpected error occurred during sign-out.'),
      };
    }
  };

  const resetPasswordForEmail = async (
    email: string
  ): Promise<{ error: AuthError | Error | null }> => {
    if (!configured || !supabase) {
      return {
        error: new Error(
          configError ||
            'Supabase authentication is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file.'
        ),
      };
    }

    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      return { error };
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error('An unexpected error occurred during password recovery.'),
      };
    }
  };

  const updatePassword = async (
    password: string
  ): Promise<{ error: AuthError | Error | null }> => {
    if (!configured || !supabase) {
      return {
        error: new Error(
          configError ||
            'Supabase authentication is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file.'
        ),
      };
    }

    // Strictly require verified PASSWORD_RECOVERY event
    // Never allow generic sessions or URL parameters to bypass this check
    if (!isRecoverySession && !isRecoveryRef.current) {
      return {
        error: new Error(
          'Recovery authorization required: You must access this page via a valid password recovery event emitted by Supabase.'
        ),
      };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        // If the error indicates an invalid, missing, or expired recovery session, clear authorization
        if (isRecoverySessionInvalidError(error)) {
          isRecoveryRef.current = false;
          setIsRecoverySession(false);
        }
        return { error };
      }

      isRecoveryRef.current = false;
      setIsRecoverySession(false);
      return { error: null };
    } catch (err) {
      const errorObj =
        err instanceof Error ? err : new Error('An unexpected error occurred during password update.');
      if (isRecoverySessionInvalidError(errorObj)) {
        isRecoveryRef.current = false;
        setIsRecoverySession(false);
      }
      return {
        error: errorObj,
      };
    }
  };

  const clearRecoverySession = useCallback(() => {
    isRecoveryRef.current = false;
    setIsRecoverySession(false);
  }, []);

  const value: AuthContextType = {
    user,
    session,
    loading,
    isConfigured: configured,
    configError,
    isRecoverySession,
    signUp,
    signIn,
    signOut,
    resetPasswordForEmail,
    updatePassword,
    clearRecoverySession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context || defaultAuthContext;
};
