// Google Identity Services Type Definitions

export interface GoogleAuthResponse {
  credential: string;
  select_by: string;
}

export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
  iss: string;
  aud: string;
  exp: number;
  iat: number;
}

export interface GoogleNotification {
  isDisplayed(): boolean;
  isNotDisplayed(): boolean;
  getNotDisplayedReason(): string;
  isSkippedMoment(): boolean;
  getSkippedReason(): string;
  isDismissedMoment(): boolean;
  getDismissedReason(): string;
}

export interface GoogleAccountsId {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleAuthResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
    context?: string;
  }) => void;
  prompt: (callback?: (notification: GoogleNotification) => void) => void;
  renderButton: (parent: HTMLElement, options: {
    type?: 'standard' | 'icon';
    theme?: 'outline' | 'filled_blue' | 'filled_black';
    size?: 'large' | 'medium' | 'small';
    text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
    shape?: 'rectangular' | 'pill' | 'circle' | 'square';
    logo_alignment?: 'left' | 'center';
    width?: string | number;
    locale?: string;
  }) => void;
  disableAutoSelect: () => void;
  cancel: () => void;
}

export interface GoogleAccounts {
  id: GoogleAccountsId;
}

export interface GoogleGlobal {
  accounts: GoogleAccounts;
}

// Extend window interface for Google
declare global {
  interface Window {
    googleAuth?: GoogleGlobal;
  }
}
