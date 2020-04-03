define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_Checkout/js/model/quote'
], function ($, wrapper, quote) {
    'use strict';

    return function (setShippingInformationAction) {
        return wrapper.wrap(setShippingInformationAction, function (originalAction) {
            var shippingAddress = quote.shippingAddress();
            if (shippingAddress['extension_attributes'] === undefined) {
                shippingAddress['extension_attributes'] = {};
            }

            if (shippingAddress.customAttributes !== undefined) {
                shippingAddress['extension_attributes']['address_note'] = shippingAddress.customAttributes['address_note'] ?? null;
                // pass execution to original action ('Magento_Checkout/js/action/set-shipping-information')
            }

            return originalAction();
        });
    };
});
