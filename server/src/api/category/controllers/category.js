'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category', ({ strapi }) => ({
    async filter(ctx) {
        //Function called when user want to search by category
        //Should return the list of items that related to pick one
    },

}));
