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
            method: 'POST', 
            path: '/picpost',
            handler: 'farm-post-new.customPostPic'
        },

    ]
}
