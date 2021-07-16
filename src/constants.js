export const routes = {
  HOME: '/',

  /*
   * Opportunities
   */

  /* public */
  OPPORTUNITIES: '/opportunities',
  OPPORTUNITY: '/opportunities/[id]',
  NEWS: '/news',
  ABOUT: '/about',
  CONDITIONS: '/conditions',
  PRIVACY: '/privacy',
  ISSUER: '/issuer',
  LOGIN: '/login',
  REGISTER: '/register',

  /* user */
  user: {
    OPPORTUNITIES: '/profile/opportunities',
    EDIT_PROFILE: '/profile/edit',
    PROFILE: '/profile'
  },

  /* issuer */
  issuer: {
    OPPORTUNITIES: '/issuer/opportunities',
    OPPORTUNITY: '/issuer/opportunities/[id]',
    CREATE_OPPORTUNITY: '/opportunities/create',
    EDIT_OPPORTUNITY: '/opportunities/[id]/edit',
    REGISTER: '/issuer/register'
  },

  /* admin */
  admin: {
    VALIDATE_OPPORTUNITY: '/admin/validate-opportunities',
    VALIDATE_ISSUER: '/admin/validate-issuers'
  }
};

export const inputTypes = {
  TEXT: 'text',
  DROPDOWN: 'dropdown',
  TEXTAREA: 'textarea',
  EMAIL: 'email',
  URL: 'url'
};

export const roles = {
  ADMIN: 'admin',
  ISSUER: 'issuer',
  PARTICIPANT: 'participant'
};

// TODO these need to be implemented in the existing code
// plenty of codes still need to be added here
export const errorCodes = {
  UNEXPECTED_ERROR: 'UNEXPECTED_ERROR',
  PARTICIPANT_ALREADY_EXISTS: 'PARTICIPANT_ALREADY_EXISTS',
  ERROR_CREATING_PARTICIPANT: 'ERROR_CREATING_PARTICIPANT',
  ERROR_SENDING_EMAIL: 'ERROR_SENDING_EMAIL',
  EMAIL_VERIFICATION_TOKEN_EXPIRED: 'EMAIL_VERIFICATION_TOKEN_EXPIRED',
  ERROR_VERIFYING_EMAIL: 'ERROR_VERIFYING_EMAIL',
  LOGIN_INCORRECT_CREDENTIALS: 'LOGIN_INCORRECT_CREDENTIALS',
  ERROR_LOGGING_IN: 'ERROR_LOGGING_IN',
  ERROR_LOGGING_OUT: 'ERROR_LOGGING_OUT'
};

export const errorMessages = {
  UNEXPECTED_ERROR: 'An unexpected error occurred.',
  PARTICIPANT_ALREADY_EXISTS: 'A participant with this email address already exists.',
  ERROR_CREATING_PARTICIPANT: 'An unexpected error occurred while creating the participant.',
  ERROR_SENDING_EMAIL: 'An unexpected error occurred while sending the verification email.',
  EMAIL_VERIFICATION_TOKEN_EXPIRED: 'This token has expired, please request a new one.',
  ERROR_VERIFYING_EMAIL: 'An unexpected error occurred while verifying the email address.',
  LOGIN_INCORRECT_CREDENTIALS: 'The login credentials do not match any known records.',
  ERROR_LOGGING_IN: 'An unexpected error occurred while logging in.',
  ERROR_LOGGING_OUT: 'An unexpected error occurred while logging out.'
};

export const jwtSecret = process.env.JWT_SECRET;
export const frontendUrl = process.env.HOST_URL;
