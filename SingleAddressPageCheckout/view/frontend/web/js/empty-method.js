define([
    'Magento_Checkout/js/view/payment/default'
], function (Component) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'DockerModules_SingleAddressPageCheckout/payment-methods/empty-method'
        },

        /**
         * Returns send check to info.
         *
         * @return {*}
         */
        getMailingAddress: function () {
            return window.checkoutConfig.payment.checkmo.mailingAddress;
        },

        /**
         * Returns payable to info.
         *
         * @return {*}
         */
        getPayableTo: function () {
            return window.checkoutConfig.payment.checkmo.payableTo;
        },

        /**
         * @return {String}
         */
        getBillingAddressFormName: function () {
            return 'billing-address-form-' + this.item.method;
        },
    });
});
