export const routes = {
  home: '/',

  /*
   * Opportunities
   */

  /* public */
  opportunities: '/opportunities',
  opportunity: '/opportunities/[id]',

  /* user */
  userOpportunities: '/user/opportunities',

  /* issuer */
  issuerCreateOpportunity: '/issuer/create-opportunity',
  issuerOpportunities: '/issuer/opportunities',
  // issuerOpportunity: '/issuer/opportunities/id',
  // editOpportunity: '/issuer/opportunities/id/edit',

  /* admin */
  validateOpportunity: '/admin/validate-opportunity'
};
