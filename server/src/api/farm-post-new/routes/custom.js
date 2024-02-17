'use strict';

module.exports = {
    routes: [ //custom routes
        {
            method: 'GET', 
            path: '/public',
            handler: 'farm-post-new.publicGet'
        },

    ]
}
