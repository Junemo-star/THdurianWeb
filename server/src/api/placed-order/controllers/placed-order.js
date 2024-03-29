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
        console.log(entries);
        //console.log(entries[0].farmPost.owner);

        const newData = entries.map(post => {
            return {
                id: post.id,
                Farmer: post.farmPost.owner.username,
                Category:post.product.durianType,
                FarmerName: post.farmPost.owner.firstname + " " + post.farmPost.owner.surname,
                FarmPostID: post.farmPost.id,
                OrderDate: post.createdAt,
                Amount: post.amount,
                Price: post.price,
                Status: post.status,
                UserLocation: post.location,
                FarmLocation: post.farmPost.location,
            }
        })

        //console.log(newData);
        return newData
    },
    async create(ctx){
        
        const data = ctx.request["body"];
        //console.log(data);
        const findCatagoryById = await strapi.entityService.findOne("api::category.category", data.CategoryID)
        const findPostById = await strapi.entityService.findOne("api::farm-post-new.farm-post-new", data.FarmPostNewID)
        const pictureObj = await strapi.entityService.findOne("plugin::upload.file",data.PaymentPictureID)

        const newOrder = await strapi.entityService.create("api::placed-order.placed-order", {
            data: {
                amount: data.Amount,
                location: data.Location,
                date: data.Date,
                price: data.Price,
                owner: ctx.state.user,
                product: findCatagoryById,
                farmPost: findPostById,
                status: "Verifying",
                payment: pictureObj,
                publishedAt: new Date(),
            },
        });

        return newOrder
    },
    async adminFind(ctx){
        if (ctx.state.user.role.name != "Admin") {
            return ctx.body = { response: "Invalid Role" }
        }
        const data = ctx.request["body"];

        //console.log(data);
        const entries = await strapi.db.query("api::placed-order.placed-order").findMany({
            populate:["farmPost.owner","product","owner", "payment"]
        });

        const newData = entries.map(post => {
            return {
                id: post.id,
                Farmer: post.farmPost.owner.username,
                Category:post.product.durianType,
                FarmerName: post.farmPost.owner.firstname + " " + post.farmPost.owner.surname,
                FarmPostID: post.farmPost.id,
                OrderDate: post.createdAt,
                Amount: post.amount,
                Price: post.price,
                Status: post.status,
                UserLocation: post.location,
                FarmLocation: post.farmPost.location,
                Customer: post.owner.username,
                picture: post.payment,
            }
        })

        //console.log(newData);
        return newData
    }


}));
