/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'underscore',
    'ko',
    'mageUtils',
    'Magento_Checkout/js/view/payment/list',
], function (_, ko, utils, Component) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'DockerModules_SingleAddressPageCheckout/payment-methods/custom-list',
        },

        /**
         * @returns
         */
        createComponent: function (payment) {
            payment.component = 'DockerModules_SingleAddressPageCheckout/js/empty-method';

            return this._super(payment);
        },
    });
});
