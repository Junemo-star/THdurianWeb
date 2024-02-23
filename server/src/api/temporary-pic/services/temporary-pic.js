'use strict';

/**
 * temporary-pic service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::temporary-pic.temporary-pic');
