define([
    'DockerModules_SingleAddressPageCheckout/js/billing-address-quote',
],
function (
    quote,
) {
    'use strict';

    const mixin = {
        initialize: function () {
            this._super();
            this.isAddressSameAsShipping(true);
        },
        useShippingAddress: function() {
            this._super();

            quote.billingAddressSame(this.isAddressSameAsShipping());

            return true;
        }
    };

    return function (target) {
        return target.extend(mixin);
    };
});
