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
    OPPORTUNITY: '/issuer/opportunities/[id]',
    CREATE_OPPORTUNITY: '/opportunities/create',
    EDIT_OPPORTUNITY: '/opportunities/[id]/edit',
    REGISTER: '/issuer/register',
    DASHBOARD: '/issuer/dashboard'
  },

  /* admin */
  admin: {
    ISSUERS: '/admin/issuers',
    OPPORTUNITIES: '/admin/opportunities',
    DASHBOARD: '/admin/dashboard'
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

export const errorCodes = {
  UNEXPECTED_ERROR: 'UNEXPECTED_ERROR',
  PARTICIPANT_ALREADY_EXISTS: 'PARTICIPANT_ALREADY_EXISTS',
  EMAIL_VERIFICATION_TOKEN_EXPIRED: 'EMAIL_VERIFICATION_TOKEN_EXPIRED',
  LOGIN_INCORRECT_CREDENTIALS: 'LOGIN_INCORRECT_CREDENTIALS',
  EMAIL_ALREADY_VERIFIED: 'EMAIL_ALREADY_VERIFIED',
  MISSING_OPPORTUNITY_ID: 'MISSING_OPPORTUNITY_ID',
  NO_UNAPPROVED_OPPORTUNITY: 'NO_UNAPPROVED_OPPORTUNITY',
  MISSING_ISSUER_ID: 'MISSING_ISSUER_ID',
  NO_UNAPPROVED_ISSUER: 'NO_UNAPPROVED_ISSUER',
  USER_ID_REQUIRED: 'USER_ID_REQUIRED',
  NO_AVAILABLE_PARTICIPATION: 'NO_AVAILABLE_PARTICIPATION',
  INVALID_PARTICIPATION_STATUS: 'INVALID_PARTICIPATION_STATUS',
  ERROR_OPPORTUNITY_ID_QUERY_PARAMETER_IS_REQUIRED: 'ERROR_OPPORTUNITY_ID_QUERY_PARAMETER_IS_REQUIRED',
  ERROR_PARTICIPANT_ID_QUERY_PARAMETER_IS_REQUIRED: 'ERROR_PARTICIPANT_ID_QUERY_PARAMETER_IS_REQUIRED',
  ASSERTION_ALREADY_EXISTS: 'ASSERTION_ALREADY_EXISTS'
};

export const errorMessages = {
  UNEXPECTED_ERROR: 'An unexpected error occurred.',
  PARTICIPANT_ALREADY_EXISTS: 'A participant with this email address already exists.',
  EMAIL_VERIFICATION_TOKEN_EXPIRED: 'This token has expired, please request a new one.',
  LOGIN_INCORRECT_CREDENTIALS: 'The login credentials do not match any known records.',
  EMAIL_ALREADY_VERIFIED: 'This user\'s email address has already been verified',
  MISSING_OPPORTUNITY_ID: 'Opportunity id is required.',
  NO_UNAPPROVED_OPPORTUNITY: 'There is no opportunity with that id awaiting approval.',
  MISSING_ISSUER_ID: 'Issuer id is required.',
  NO_UNAPPROVED_ISSUER: 'There is no issuer with that id awaiting approval.',
  USER_ID_REQUIRED: 'User id is required.',
  NO_AVAILABLE_PARTICIPATION: 'There is no participation with that id that can be set to this status.',
  INVALID_PARTICIPATION_STATUS: 'This is not a valid participation status.',
  ERROR_OPPORTUNITY_ID_QUERY_PARAMETER_IS_REQUIRED: 'Opportunity id query parameter is required.',
  ERROR_PARTICIPANT_ID_QUERY_PARAMETER_IS_REQUIRED: 'Participant id query parameter is required.',
  ASSERTION_ALREADY_EXISTS: 'This assertion already exists.'
};

export const categoryValues = {
  DIGITAL_LITERACY: 0,
  SUSTAINABILITY: 1,
  ENTREPRENEURAL_SPIRIT: 2,
  RESEARCH: 3,
  GLOBAL_CITIZENSHIP: 4
};

export const categoryLabels = {
  DIGITAL_LITERACY: 'Digitale geletterdheid',
  SUSTAINABILITY: 'Duurzaamheid',
  ENTREPRENEURAL_SPIRIT: 'Ondernemingszin',
  RESEARCH: 'Onderzoek',
  GLOBAL_CITIZENSHIP: 'Wereldburgerschap'
};

export const difficultyValues = {
  BEGINNER: 0,
  INTERMEDIATE: 1,
  EXPERT: 2
};

export const difficultyLabels = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Gevorderd',
  EXPERT: 'Expert'
};

export const authority = {
  BLOCKED: 0,
  APPROVED: 1,
  DELETED: 2
};

export const authorityLabels = {
  0: 'nieuw',
  1: 'goedgekeurd',
  2: 'afgekeurd'
};

export const regions = {
  ghent: 'Gent',
  antwerp: 'Antwerpen'
}
