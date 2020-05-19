export const routes = {
  home: '/',

  /*
   * Opportunities
   */

  /* public */
  opportunities: '/opportunities',
  opportunity: '/opportunities/[id]',

  /* user */
  user: {
    opportunities: '/user/opportunities'
  },

  /* issuer */
  issuer: {
    opportunities: '/issuer/opportunities',
    opportunity: '/issuer/opportunities/[id]',
    createOpportunity: '/issuer/opportunities/create',
    editOpportunity: '/issuer/opportunities/[id]/edit'
  },

  /* admin */
  validateOpportunity: '/admin/validate-opportunity'
};
