define([
    'ko',
    'underscore'
], function (ko, _) {
    'use strict';

    var billingAddressSame = ko.observable(true);


    return {
        billingAddressSame: billingAddressSame,
    };
});
