/**
 * Google OAuth Service
 * Simplified version to avoid CORS and FedCM issues
 */

// Simple Google types
interface GoogleCredentialResponse {
  credential: string;
}

class GoogleAuthService {
  private clientId: string;
  private isLoaded: boolean = false;
  private isInitialized: boolean = false;
  private pendingPromise: Promise<string> | null = null;

  constructor() {
    // Use environment variable
    this.clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '58398704119-laopqg34cmgca6g6er7s16a3mbamn93f.apps.googleusercontent.com';
    
    // Validate client ID format
    if (!this.clientId || !this.clientId.includes('.apps.googleusercontent.com')) {
      console.warn('Google Client ID is not properly configured. Please check your .env file.');
    }
  }

  /**
   * Load Google Identity Services script
   */
  async loadGoogleScript(): Promise<void> {
    if (this.isLoaded || document.getElementById('google-identity-script')) {
      this.isLoaded = true;
      return;
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.id = 'google-identity-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        this.isLoaded = true;
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google Identity Services'));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * Get Google object from window
   */
  private getGoogle(): any {
    return (window as any).google;
  }

  /**
   * Initialize Google OAuth
   */
  private async initializeGoogle(): Promise<void> {
    if (this.isInitialized) return;

    await this.loadGoogleScript();

    return new Promise((resolve) => {
      const checkGoogle = () => {
        const google = this.getGoogle();
        if (google?.accounts?.id) {
          google.accounts.id.initialize({
            client_id: this.clientId,
            auto_select: false,
            cancel_on_tap_outside: true,
            // Disable FedCM to avoid CORS issues
            use_fedcm_for_prompt: false
          });
          this.isInitialized = true;
          resolve();
        } else {
          setTimeout(checkGoogle, 100);
        }
      };
      checkGoogle();
    });
  }

  /**
   * Sign in with Google - simplified approach
   */
  async signInWithPopup(): Promise<string> {
    // Validate client ID first
    if (!this.clientId || !this.clientId.includes('.apps.googleusercontent.com')) {
      throw new Error('Google Client ID is not configured. Please check your environment variables.');
    }

    // Prevent multiple simultaneous requests
    if (this.pendingPromise) {
      return this.pendingPromise;
    }

    this.pendingPromise = this.performSignIn();
    
    try {
      const result = await this.pendingPromise;
      return result;
    } finally {
      this.pendingPromise = null;
    }
  }

  /**
   * Perform the actual sign in
   */
  private async performSignIn(): Promise<string> {
    await this.initializeGoogle();

    return new Promise((resolve, reject) => {
      const google = this.getGoogle();
      
      // Create a temporary div for Google button
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'fixed';
      tempDiv.style.top = '-1000px';
      tempDiv.style.left = '-1000px';
      tempDiv.style.visibility = 'hidden';
      document.body.appendChild(tempDiv);

      // Set up callback
      const handleCredentialResponse = (response: GoogleCredentialResponse) => {
        if (document.body.contains(tempDiv)) {
          document.body.removeChild(tempDiv);
        }
        resolve(response.credential);
      };

      // Initialize with callback
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: false,
        use_fedcm_for_prompt: false
      });

      // Render button and auto-click
      try {
        google.accounts.id.renderButton(tempDiv, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'signin_with'
        });

        // Auto-click the button
        setTimeout(() => {
          const button = tempDiv.querySelector('[role="button"]') as HTMLElement;
          if (button) {
            button.click();
          } else {
            // Fallback to prompt
            google.accounts.id.prompt();
          }
        }, 100);

      } catch (error) {
        console.error('Button render error:', error);
        // Direct prompt fallback
        google.accounts.id.prompt();
      }

      // Cleanup timeout
      setTimeout(() => {
        if (document.body.contains(tempDiv)) {
          document.body.removeChild(tempDiv);
        }
        reject(new Error('Google sign-in timeout'));
      }, 30000);
    });
  }

  /**
   * Decode JWT token to get user info
   */
  decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid Google JWT token');
    }
  }

  /**
   * Reset the service state
   */
  reset(): void {
    this.pendingPromise = null;
    this.isInitialized = false;
    const google = this.getGoogle();
    if (google?.accounts?.id) {
      google.accounts.id.cancel();
    }
  }
}

// Export singleton instance
const googleAuthService = new GoogleAuthService();
export default googleAuthService;
