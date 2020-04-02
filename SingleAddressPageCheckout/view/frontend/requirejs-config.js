var config = {
    map: {
        '*': {
            'custom-payment-list': 'DockerModules_SingleAddressPageCheckout/js/custom-payment-list',
            'empty-method': 'DockerModules_SingleAddressPageCheckout/js/empty-method',
            'enabled-field': 'DockerModules_SingleAddressPageCheckout/js/enabled-field',
        }
    },
    config: {
        mixins: {
            'Magento_Checkout/js/view/shipping': {
                'DockerModules_SingleAddressPageCheckout/js/shipping-mixin': true
            },
            'Magento_Checkout/js/action/set-shipping-information': {
                'DockerModules_SingleAddressPageCheckout/js/set-address-note-mixin': true
            }
        }
    }
};
