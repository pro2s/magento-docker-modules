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

        $addressNote = 'address_note';
        $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
        ['shippingAddress']['children']['shipping-address-fieldset']['children']
        [$addressNote] = $this->addNoteFields($addressNote);

        $billingAddress = $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
        ['payment']['children']['afterMethods']['children']['billing-address-form'] ?? null;

        $paymentList = $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
        ['payment']['children']['payments-list'] ?? null;

        if ($paymentList !== null) {
            // move address form to shipping step
            $paymentList['children'] = array_diff_key($paymentList['children'], $initialPaymentList['children']);
            $paymentList['component'] = 'DockerModules_SingleAddressPageCheckout/js/custom-payment-list';

            // remove form from billing step
            $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
                ['payment']['children']['payments-list'] = $initialPaymentList;
        }

        if ($billingAddress !== null) {
            $billingAddress['config']['template'] = 'DockerModules_SingleAddressPageCheckout/billing-address';
            $paymentList['children']['billing-address-form'] = $billingAddress;
            $paymentList['component'] = 'uiComponent';

            // remove form from billing step
            unset($jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
                ['payment']['children']['afterMethods']['children']['billing-address-form']);
        }

        $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
        ['shippingAddress']['children']['shipping-address-fieldset']['children']['payments-list-custom'] = $paymentList;


        return $jsLayout;
    }

    private function addNoteFields($customAttributeCode): array
    {
        return [
            'component' => 'DockerModules_SingleAddressPageCheckout/js/enabled-field',
            'config' => [
                // customScope is used to group elements within a single form (e.g. they can be validated separately)
                'customScope' => 'shippingAddress.custom_attributes',
                'customEntry' => null,
                'template' => 'DockerModules_SingleAddressPageCheckout/enabled-field',
                'elementTmpl' => 'ui/form/element/input',
                'enabledTitle' => 'Add address note',
                'tooltip' => [
                    'description' => 'this is what the field is for',
                ],
            ],
            'dataScope' => 'shippingAddress.custom_attributes' . '.' . $customAttributeCode,
            'label' => 'Address Note',
            'provider' => 'checkoutProvider',
            'sortOrder' => 0,
            'validation' => [
                'required-entry' => true
            ],
            'options' => [],
            'filterBy' => null,
            'customEntry' => null,
            'visible' => true,
            'value' => '' // value field is used to set a default value of the attribute
        ];
    }
}
