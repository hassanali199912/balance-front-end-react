import { useEffect } from 'react';

/**
 * Google OAuth Callback Component
 * Handles the OAuth redirect and extracts the ID token
 */
const GoogleAuthCallback: React.FC = () => {
  useEffect(() => {
    try {
      // Parse the URL fragment for the ID token
      const urlParams = new URLSearchParams(window.location.hash.substring(1));
      const idToken = urlParams.get('id_token');
      const error = urlParams.get('error');

      if (error) {
        // Send error to parent window
        window.opener?.postMessage({
          type: 'GOOGLE_AUTH_ERROR',
          error: error
        }, window.location.origin);
        window.close();
        return;
      }

      if (idToken) {
        // Send token to parent window
        window.opener?.postMessage({
          type: 'GOOGLE_AUTH_SUCCESS',
          token: idToken
        }, window.location.origin);
        window.close();
        return;
      }

      // No token found
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error: 'No authentication token received'
      }, window.location.origin);
      window.close();

    } catch (error) {
      // Send error to parent window
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error: 'Failed to process authentication'
      }, window.location.origin);
      window.close();
    }
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#666'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
        <p>Processing authentication...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;
