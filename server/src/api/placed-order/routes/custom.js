'use strict';

module.exports = {
    routes: [ //custom routes
        {
            method: 'GET', 
            path: '/delivery',
            handler: 'placed-order.custoGetDelivery'
        },
        {
            method: 'GET', 
            path: '/placed-orders/adminget',
            handler: 'placed-order.adminFind'
        },
    ]
}
