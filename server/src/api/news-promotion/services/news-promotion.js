'use strict';

/**
 * news-promotion service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-promotion.news-promotion');
