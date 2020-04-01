/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'underscore',
    'ko',
    'mageUtils',
    'Magento_Checkout/js/view/payment/list',
    'mage/translate',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/action/set-shipping-information',
    'Magento_Checkout/js/model/checkout-data-resolver',
], function (_, ko, utils, Component, $t, quote, setShippingInformationAction, checkoutDataResolver) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'DockerModules_SingleAddressPageCheckout/payment-methods/custom-list',
        },

        /**
         * @return {exports.initObservable}
         */
        initObservable: function () {
            this._super()
                .observe({
                    isAddressSameAsShipping: true,
                });

            return this;
        },

        /**
         * Returns payment group title
         *
         * @param {Object} group
         * @returns {String}
         */
        getGroupTitle: function (group) {
            return $t('Billing Address');
        },

        useShippingAddress: function () {
            if (this.isAddressSameAsShipping()) {
                if (this.isPaymentMethodsAvailable()) {
                    this.isAddressSameAsShipping(false);

                    return true;
                }
            } else {
                this.isAddressSameAsShipping(true);
                return true;
            }

            quote.billingAddress(null);
            checkoutDataResolver.resolveBillingAddress();
            setShippingInformationAction().done(
                this.isAddressSameAsShipping(false)
            );

            return true;
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
