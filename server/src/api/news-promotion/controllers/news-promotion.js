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
