'use strict';

module.exports = {
    routes: [ //custom routes
        {
            method: 'GET', 
            path: '/delivery',
            handler: 'placed-order.custoGetDelivery'
        },
    ]
}
