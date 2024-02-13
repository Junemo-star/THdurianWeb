'use strict';

/**
 * farm-post-new controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::farm-post-new.farm-post-new', ({ strapi }) => ({
    async create(ctx) {
        //Function called when farmer want to post new product items
        //console.log(ctx.state.user);

        //Check is Farmer
        if (ctx.state.user.role.name != "Farmer") {
            return ctx.body = {response: "Invalid Role"}
        }
        const data = ctx.request["body"].data;
        console.log(data);
        
        const findCatagoryById = await strapi.entityService.findOne("api::category.category",data.category)
        console.log(findCatagoryById);
        const postEntry = await strapi.entityService.create('api::farm-post-new.farm-post-new', {
            data: {
                amount: data.amount,
                location: data.location,
                price: data.price, 
                owner: ctx.state.user,
                category: findCatagoryById,
                note: data.note,
                descriptions: data.descriptions,
                publishedAt: new Date()
            },
        });
        return postEntry
    },
    async publicGet(ctx) {
        //Function called when user want to search by category
        //Should return the list of items that related to pick one
    },

}));

