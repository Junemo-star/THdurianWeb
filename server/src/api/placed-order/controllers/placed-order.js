'use strict';

/**
 * placed-order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::placed-order.placed-order',({ strapi }) => ({
    async custoGetDelivery(ctx) {

        if (ctx.state.user.role.name != "Customer") {
            return ctx.body = { response: "Invalid Role" }
        }

        const entries = await strapi.db.query("api::placed-order.placed-order").findMany({
            where: {
                owner: {
                    id: {
                        $eq: ctx.state.user.id,
                    }
                },

            },
            populate:["farmPost.owner","product"]
        });
        //console.log(entries);
        //console.log(entries[0].farmPost.owner);

        const newData = entries.map(post => {
            return {
                id: post.id,
                Farmer: post.farmPost.owner.username,
                FarmerName: post.farmPost.owner.firstname + " " + post.farmPost.owner.surname,
                Amount: post.amount,
                Price: post.price,
                Status: post.status
            }
        })

        //console.log(newData);
        return newData
    },


}));
