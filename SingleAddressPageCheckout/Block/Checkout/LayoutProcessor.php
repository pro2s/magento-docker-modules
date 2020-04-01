<?php

namespace DockerModules\SingleAddressPageCheckout\Block\Checkout;

class LayoutProcessor
{
    /**
     * @param \Magento\Checkout\Block\Checkout\LayoutProcessor $subject
     * @param array $jsLayout
     * @return array
     */
    public function aroundProcess(
        \Magento\Checkout\Block\Checkout\LayoutProcessor $subject,
        \Closure $proceed,
        array $jsLayout
    ) {
        $initialPaymentList = [];

        if(isset($jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['payments-list'])) {
            $initialPaymentList = $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['payments-list'];
        }

        $jsLayout = $proceed($jsLayout);

        if(isset($jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['payments-list'])) {

            $paymentList = $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['payments-list'];

            // move address form to shipping step
            $paymentList['children'] = array_diff_key($paymentList['children'], $initialPaymentList['children']);
            $paymentList['component'] = 'DockerModules_SingleAddressPageCheckout/js/custom-payment-list';

            $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
            ['shippingAddress']['children']['shipping-address-fieldset']['children']['payments-list-custom'] = $paymentList;

            // remove form from billing step
            $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
                ['payment']['children']['payments-list'] = $initialPaymentList;
        }

        return $jsLayout;
    }
}
