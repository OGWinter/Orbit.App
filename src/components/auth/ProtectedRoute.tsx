import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, isConfigured, configError } = useAuth();
  const location = useLocation();

  // While Supabase session is resolving, show a clean loading screen
  // Never briefly flash protected workspace content before authentication is resolved
  if (loading) {
    return (
      <div className="workspace-loading-screen" role="status" aria-live="polite">
        <div className="workspace-loading-spinner" />
        <p>Loading Orbit workspace...</p>
      </div>
    );
  }

  // Handle missing Supabase configuration gracefully without displaying a broken workspace
  if (!isConfigured) {
    return (
      <div className="workspace-config-error" role="alert">
        <div className="auth-notice-box error">
          <span>⚠</span>
          <div>
            <strong>Configuration Required:</strong>
            <p style={{ margin: '4px 0 0', fontSize: '13px' }}>
              {configError ||
                'Supabase environment variables are missing. Configure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to access your workspace.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to /login and preserve requested destination
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
