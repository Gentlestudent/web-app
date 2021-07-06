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
