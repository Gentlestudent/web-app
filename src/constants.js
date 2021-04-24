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
    CREATE_OPPORTUNITY: '/issuer/opportunities/create',
    EDIT_OPPORTUNITY: '/issuer/opportunities/[id]/edit'
  },

  /* admin */
  admin: {
    VALIDATE_OPPORTUNITY: '/admin/opportunities/[id]/validate'
  }
};

export const inputTypes = {
  TEXT: 'text',
  DROPDOWN: 'dropdown',
  TEXTAREA: 'textarea',
  EMAIL: 'email',
  URL: 'url'
};
