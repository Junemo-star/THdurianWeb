'use strict';

/**
 * news-promotion controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::news-promotion.news-promotion',({ strapi }) => ({
    async find(ctx) {
        const currDate = new Date();
        console.log(currDate)
        let entries = await strapi.db.query('api::news-promotion.news-promotion').findMany({
            where: {
                $or: [
                    {
                        activation:'Active',
                    },
                    {
                        $and:[
                            {
                                activation:'Auto',
                            },
                            {
                                startDate: {$lt: currDate}
                            },
                            {
                                endDate: {$gt: currDate}
                            },
                        ]
                    }

                ],
            },
            populate: {
                picture: true,

            },
        });
        //console.log(entries);
        return entries;
    },

    async create(ctx) {
        //Function called when farmer want to post new product items
        //console.log(ctx.state.user);

        //Check is Farmer
        if (ctx.state.user.role.name != "Admin") {
            return ctx.body = { response: "Invalid Role" }
        }
        const data = ctx.request["body"];
        console.log(data);


        const pictureObj = await strapi.entityService.findOne("plugin::upload.file",data.pictureId)
        const postEntry = await strapi.entityService.create('api::news-promotion.news-promotion', {
            data: {
                startDate: data.startDate,
                endDate: data.endDate,
                activation: "Auto",
                publishedAt: new Date(),
                picture: pictureObj,
            },
        });
        return postEntry
    },
    async adminfind(ctx) {
        const currDate = new Date();
        console.log(currDate)
        let entries = await strapi.db.query('api::news-promotion.news-promotion').findMany({

            populate: {
                picture: true,

            },
        });
        //console.log(entries);
        return entries;
    },

}));
