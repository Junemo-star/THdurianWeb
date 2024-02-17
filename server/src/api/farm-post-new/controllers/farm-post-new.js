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
            return ctx.body = { response: "Invalid Role" }
        }
        const data = ctx.request["body"].data;
        console.log(data);

        const findCatagoryById = await strapi.entityService.findOne("api::category.category", data.category)
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
    async find(ctx) {
        if (ctx.state.user.role.name != "Farmer") {
            return ctx.body = { response: "Invalid Role" }
        }

        const entries = await strapi.db.query('api::farm-post-new.farm-post-new').findMany({
            where: {

                owner: {
                    id: {
                        $eq: ctx.state.user.id,
                    }
                },

            },
        });
        console.log(entries);
        //Function called when user want to search by category
        //Should return the list of items that related to pick one
        return entries
    },

    async publicGet(ctx) {
        console.log("PublicGet")

        const entries = await strapi.entityService.findMany("api::farm-post-new.farm-post-new",{
            populate: ["owner","category","orders"],

        });
        console.log(entries);
        console.log("Farm" + " : " + "category" + " : " + "amount" + " : " + "price");
        for (let post of entries){
            console.log(post.owner.username + " : " + post.category["durianType"] + " : " + post.amount + " : " + post.price + " : " + post.createdAt);

        }





        return ctx.body = { response: "Public Get" }
        //Function called when user want to search by category
        //Should return the list of items that related to pick one
    },

}));

