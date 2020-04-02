define([
    'Magento_Ui/js/form/element/abstract'
], function (Component) {
    'use strict';

    return Component.extend({
        /**
         * @return {exports.initObservable}
         */
        initObservable: function () {
            this._super()
                .observe({
                    isEnabled: false,
                });

            return this;
        },

        enableField: function () {
            this.isEnabled(!this.isEnabled());

            return true;
        },

        validate: function () {
            if (!this.isEnabled()) {
                return {
                    valid: true,
                    target: this
                };
            }

            return this._super();
        },

        getEnabledTitle: function() {
            return this.enabledTitle;
        },
    });
});
