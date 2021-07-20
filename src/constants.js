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
  ERROR_LOGGING_OUT: 'ERROR_LOGGING_OUT',
  EMAIL_ALREADY_VERIFIED: 'EMAIL_ALREADY_VERIFIED',
  ERROR_UPDATING_USER: 'ERROR_UPDATING_USER',
  ERROR_GETTING_PARTICIPATIONS_FROM_DB: 'ERROR_GETTING_PARTICIPATIONS_FROM_DB',
  MISSING_OPPORTUNITY_ID: 'MISSING_OPPORTUNITY_ID',
  ERROR_APPROVING_OPPORTUNITY: 'ERROR_APPROVING_OPPORTUNITY',
  ERROR_DENYING_OPPORTUNITY: 'ERROR_DENYING_OPPORTUNITY',
  ERROR_GETTING_OPPORTUNITIES_FROM_DB: 'ERROR_GETTING_OPPORTUNITIES_FROM_DB',
  ERROR_CREATING_OPPORTUNITY: 'ERROR_CREATING_OPPORTUNITY',
  ERROR_GETTING_OPPORTUNITY_FROM_DB: 'ERROR_GETTING_OPPORTUNITY_FROM_DB',
  ERROR_GETTING_NEWS_FROM_DB: 'ERROR_GETTING_NEWS_FROM_DB',
  ERROR_CREATING_NEWS: 'ERROR_CREATING_NEWS',
  ERROR_GETTING_ISSUER: 'ERROR_GETTING_ISSUER',
  MISSING_ISSUER_ID: 'MISSING_ISSUER_ID',
  ERROR_APPROVING_ISSUER: 'ERROR_APPROVING_ISSUER',
  ERROR_DENYING_ISSUER: 'ERROR_DENYING_ISSUER',
  USER_ID_REQUIRED: 'USER_ID_REQUIRED',
  ERROR_REGISTERING_ISSUER: 'ERROR_REGISTERING_ISSUER',
  ERROR_GETTING_ASSERTIONS_FROM_DB: 'ERROR_GETTING_ASSERTIONS_FROM_DB',
  ERROR_RECIPIENT_QUERY_PARAMETER_IS_REQUIRED: 'ERROR_RECIPIENT_QUERY_PARAMETER_IS_REQUIRED',
  ERROR_GETTING_USER: 'ERROR_GETTING_USER'
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
  ERROR_LOGGING_OUT: 'An unexpected error occurred while logging out.',
  EMAIL_ALREADY_VERIFIED: 'This user\'s email address has already been verified',
  ERROR_UPDATING_USER: 'An unexpected error occurred while updating the user.',
  ERROR_GETTING_PARTICIPATIONS_FROM_DB: 'An unexpected error occurred while fetching the participations.',
  MISSING_OPPORTUNITY_ID: 'Opportunity id is required.',
  ERROR_APPROVING_OPPORTUNITY: 'An unexpected error occurred while approving the opportunity.',
  ERROR_DENYING_OPPORTUNITY: 'An unexpected error occurred while denying the opportunity.',
  ERROR_GETTING_OPPORTUNITIES_FROM_DB: 'An unexpected error occurred while fetching opportunities.',
  ERROR_CREATING_OPPORTUNITY: 'An unexpected error occurred while creating the opportunity.',
  ERROR_GETTING_OPPORTUNITY_FROM_DB: 'An unexpected error occurred while fetching the opportunity.',
  ERROR_GETTING_NEWS_FROM_DB: 'ERROR_GETTING_NEWS_FROM_DB',
  ERROR_CREATING_NEWS: 'ERROR_CREATING_NEWS',
  ERROR_GETTING_ISSUER: 'ERROR_GETTING_ISSUER',
  MISSING_ISSUER_ID: 'Issuer id is required.',
  ERROR_APPROVING_ISSUER: 'ERROR_APPROVING_ISSUER',
  ERROR_DENYING_ISSUER: 'ERROR_DENYING_ISSUER',
  USER_ID_REQUIRED: 'User id is required.',
  ERROR_REGISTERING_ISSUER: 'ERROR_REGISTERING_ISSUER',
  ERROR_GETTING_ASSERTIONS_FROM_DB: 'ERROR_GETTING_ASSERTIONS_FROM_DB',
  ERROR_RECIPIENT_QUERY_PARAMETER_IS_REQUIRED: 'Recipient query parameter is required.',
  ERROR_GETTING_USER: 'ERROR_GETTING_USER'
};

export const jwtSecret = process.env.JWT_SECRET;
export const frontendUrl = process.env.HOST_URL;
