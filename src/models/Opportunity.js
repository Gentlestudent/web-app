export default class Opportunity {
  constructor(opportunity) {
    this.addressId = opportunity.addressId;
    this.authority = opportunity.authority;
    this.badgeId = opportunity.badgeId;
    this.beginDate = opportunity.beginDate;
    this.category = opportunity.category;
    this.contact = opportunity.contact;
    this.difficulty = opportunity.difficulty;
    this.endDate = opportunity.endDate;
    this.international = opportunity.international;
    this.issuerId = opportunity.issuerId;
    this.longDescription = opportunity.longDescription;
    this.moreInfo = opportunity.moreInfo;
    this.oppImageUrl = opportunity.oppImageUrl;
    this.participations = opportunity.participations;
    this.pinImageUrl = opportunity.pinImageUrl;
    this.shortDescription = opportunity.shortDescription;
    this.title = opportunity.title;
    this.website = opportunity.website;
    this.id = opportunity.id;
  }
}

export const opportunityConverter = {
  /**
   *
   * @param {Opportunity} opportunity
   * @returns
   */
  toFirestore(opportunity) {
    return {
      addressId: opportunity.addressId,
      authority: opportunity.authority,
      badgeId: opportunity.badgeId,
      beginDate: opportunity.beginDate,
      category: opportunity.category,
      contact: opportunity.contact,
      difficulty: opportunity.difficulty,
      endDate: opportunity.endDate,
      international: opportunity.international,
      issuerId: opportunity.issuerId,
      longDescription: opportunity.longDescription,
      shortDescription: opportunity.shortDescription,
      moreInfo: opportunity.moreInfo,
      oppImageUrl: opportunity.oppImageUrl,
      participations: opportunity.participations,
      pinImageUrl: opportunity.pinImageUrl,
      title: opportunity.title,
      website: opportunity.website,
      id: opportunity.id
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Opportunity({ ...data, id: snapshot.id });
  }
};

/**
 * TODO: Translate to english
 */
export const Category = {
  DIGITALEGELETTERDHEID: 0,
  DUURZAAMHEID: 1,
  ONDERNEMINGSZIN: 2,
  ONDERZOEK: 3,
  WERELDBURGERSCHAP: 4
};

export const Difficulty = {
  BEGINNER: 0,
  INTERMEDIATE: 1,
  EXPERT: 2
};

export const Authority = {
  BLOCKED: 0,
  APPROVED: 1,
  DELETED: 2
};
