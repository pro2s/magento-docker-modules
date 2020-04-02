define([
    'Magento_Checkout/js/action/set-billing-address',
    'Magento_Ui/js/model/messageList',
],
function (
    setBillingAddressAction,
    globalMessageList,
) {
    'use strict';

   const mixin = {
        setShippingInformation: function () {
            this.source.set('params.invalid', false);
            this.source.trigger('billingAddressshared.data.validate');

            if (!this.source.get('params.invalid') &&
                (window.checkoutConfig.reloadOnBillingAddress ||
                !window.checkoutConfig.displayBillingOnPaymentMethod)
            ) {
                setBillingAddressAction(globalMessageList);
            }

            this._super();
        }
    };

    return function (target) {
        return target.extend(mixin);
    };
});
