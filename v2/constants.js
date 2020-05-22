export const routes = {
  home: '/',

  /*
   * Opportunities
   */

  /* public */
  OPPORTUNITIES: '/opportunities',
  OPPORTUNITY: '/opportunities/[id]',

  /* user */
  user: {
    OPPORTUNITIES: '/user/opportunities'
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

const DOMAINS = [
  'Digitale geletterdheid',
  'Duurzaamheid',
  'Ondernemingszin',
  'Onderzoek',
  'Wereldburgerschap'
];

const LEVELS = ['Beginner', 'Gevorderd', 'Expert'];

export const dropdownOptions = {
  DOMAINS,
  LEVELS
};
