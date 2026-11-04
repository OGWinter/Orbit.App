import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, getSupabaseConfigError } from '../services/supabase';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  configError: string | null;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | Error | null; needsEmailVerification?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | Error | null }>;
  signOut: () => Promise<{ error: AuthError | Error | null }>;
  resetPasswordForEmail: (email: string) => Promise<{ error: AuthError | Error | null }>;
  updatePassword: (password: string) => Promise<{ error: AuthError | Error | null }>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  session: null,
  loading: false,
  isConfigured: false,
  configError: null,
  signUp: async () => ({ error: new Error('AuthProvider is not mounted') }),
  signIn: async () => ({ error: new Error('AuthProvider is not mounted') }),
  signOut: async () => ({ error: null }),
  resetPasswordForEmail: async () => ({ error: new Error('AuthProvider is not mounted') }),
  updatePassword: async () => ({ error: new Error('AuthProvider is not mounted') }),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const configured = isSupabaseConfigured();
  const configError = getSupabaseConfigError();

  useEffect(() => {
    if (!configured || !supabase) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    // Fetch initial session
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

    // Listen to auth state transitions
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
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
        error: new Error(configError || 'Supabase authentication is not configured. Please check your environment variables.'),
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
      // When email confirmation is enabled, Supabase does not return an active session immediately.
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
        error: new Error(configError || 'Supabase authentication is not configured. Please check your environment variables.'),
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
        error: new Error(configError || 'Supabase authentication is not configured. Please check your environment variables.'),
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
        error: new Error(configError || 'Supabase authentication is not configured. Please check your environment variables.'),
      };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      return { error };
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error('An unexpected error occurred during password update.'),
      };
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    isConfigured: configured,
    configError,
    signUp,
    signIn,
    signOut,
    resetPasswordForEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context || defaultAuthContext;
};
