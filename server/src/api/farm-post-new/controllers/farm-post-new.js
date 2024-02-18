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

        let entries = await strapi.entityService.findMany("api::farm-post-new.farm-post-new", {
            populate: "*"

        });
        //console.log(entries);
        //console.log("Farm" + " : " + "category" + " : " + "amount" + " : " + "price");
        for (let post of entries) {
            const totalStock = post.orders.reduce((acc, curr) => acc + curr.amount, 0);
            console.log(totalStock);
            post["Sale"] = totalStock
        }
        //console.log(entries);
        const newData = entries.map(post => {
            return {
                id: post.id,
                Farmer: post.owner.username,
                Category: post.category["durianType"],
                Amount: post.amount,
                Price: post.price,
                TotalSale: post["Sale"],
                Picture: post.picture
            }
        })
        //console.log(newData);
        // Function to combine rows

        const combinedData = [];

        // Group rows by Name, Type, and Cost
        const groupedData = newData.reduce((acc, row) => {
            const key = `${row.Farmer}${row.Category}${row.Price}`;
            acc[key] = acc[key] || { Farmer: row.Farmer, Category: row.Category, Amount: 0, Price: row.Price, TotalSale: 0, Picture: row.Picture };
            acc[key].Amount += row.Amount;
            acc[key].TotalSale += row.TotalSale;
            return acc;
        }, {});

        // Create new array with combined objects
        for (const key in groupedData) {
            combinedData.push(groupedData[key]);
        }

        //console.log(combinedData);

        return combinedData;
        return ctx.body = { response: "Public Get" }
        //Function called when user want to search by category
        //Should return the list of items that related to pick one
    },

}));

