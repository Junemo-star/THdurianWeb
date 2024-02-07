'use strict';

/**
 * placed-order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::placed-order.placed-order');
