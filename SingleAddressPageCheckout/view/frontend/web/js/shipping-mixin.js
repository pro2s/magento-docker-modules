define([
    'Magento_Checkout/js/action/set-billing-address',
    'Magento_Ui/js/model/messageList',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/checkout-data-resolver',
],
function (
    setBillingAddressAction,
    globalMessageList,
    quote,
    checkoutDataResolver,
) {
    'use strict';

   const mixin = {
        paymentMethodForBillingAddress: 'shared',
        /**
        * Init component
        */
        initialize: function () {
            this._super();

            checkoutDataResolver.resolveBillingAddress();

            quote.paymentMethod.subscribe(function (paymentMethod) {
                this.paymentMethodForBillingAddress = paymentMethod;
            }, this);
        },

        validateShippingInformation: function() {
            const valid = this._super();

            if (valid && quote.shippingAddress().canUseForBilling()) {
                return valid;
            }

            this.source.set('params.invalid', false);

            if (window.checkoutConfig.displayBillingOnPaymentMethod) {
                this.source.trigger('billingAddress' + this.paymentMethodForBillingAddress.method + '.data.validate');
            } else {
                this.source.trigger('billingAddressshared.data.validate');
            }

            return valid && !this.source.get('params.invalid');
        },

        setShippingInformation: function () {
            this._super();

            if (this.validateShippingInformation()) {
                setBillingAddressAction(globalMessageList);
            }
        }
    };

    return function (target) {
        return target.extend(mixin);
    };
});
