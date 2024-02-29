'use strict';

module.exports = {
    routes: [ //custom routes
        {
            method: 'GET', 
            path: '/public',
            handler: 'farm-post-new.publicGet'
        },
        {
            method: 'POST', 
            path: '/detail',
            handler: 'farm-post-new.publicDetail'
        },
        {
            method: 'GET', 
            path: '/adminget',
            handler: 'farm-post-new.adminGet'
        },
    ]
}
