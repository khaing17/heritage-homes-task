<template>
    <SheetContent side="left" class=" overflow-y-auto">
        <SheetHeader>
            <SheetTitle class="text-xl">Filter</SheetTitle>
            <Separator />
            <div class="mb-4">
                <h6 class="font-bold text-sm mb-4">Housing Type</h6>
                <RadioGroup v-model="selectedHousingType">
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="housing-any" value="default" />
                        <Label for="housing-any">Any Housing Type</Label>
                    </div>
                    <div v-for="(house, index) in housingType" :key="index" class="flex items-center space-x-2">
                        <RadioGroupItem :id="`housing-${house.value}`" :value="house.value" />
                        <Label :for="`housing-${house.value}`">{{ house.title }}</Label>
                    </div>
                </RadioGroup>
            </div>
            <div class="mb-4">
                <h6 class="font-bold text-sm mb-4">Country</h6>
                <RadioGroup v-model="selectedCountry">
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="country-any" value="default" />
                        <Label for="country-any">Any</Label>
                    </div>
                    <div v-for="(country, index) in countries" :key="index" class="flex items-center space-x-2">
                        <RadioGroupItem :id="`country-${country.value}`" :value="country.value" />
                        <Label :for="`country-${country.value}`">{{ country.name }}</Label>
                    </div>
                </RadioGroup>
            </div>
            <div class="mb-4">
                <h6 class="font-bold text-sm mb-4">Price</h6>
                <Slider class="" v-model="selectedPriceRange" :min="priceRange[0]" :max="priceRange[1]" :step="1"
                    :class="cn('w-full', $attrs.class ?? '')" />
                <div class="flex justify-between mt-2">
                    <span class="font-bold text-sm">${{ selectedPriceRange[0] }}</span>
                    <span class="font-bold text-sm">${{ selectedPriceRange[1] }}</span>
                </div>
            </div>
            <div class="mb-4">
                <h6 class="font-bold text-sm mb-4">Property Features</h6>
                <div v-for="(feature, index) in propertyFeatures" :key="index" class="flex items-center space-x-2 mb-2">
                    <Checkbox :id="`feature-${index}`" :checked="selectedFeatures.includes(feature.name)"
                        @update:checked="toggleFeature(feature.name)" />
                    <label :for="`feature-${index}`" class="text-sm font-semibold">{{ feature.name }}</label>
                </div>
            </div>
        </SheetHeader>
    </SheetContent>
</template>

<script lang="ts" setup>
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ref, watch } from "vue";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator';

const emit = defineEmits(['filters-changed']);

const selectedHousingType = ref('default');
const selectedCountry = ref('default');

const priceRange = ref([0, 8000]);
const selectedFeatures = ref<string[]>([]);
const selectedPriceRange = ref([...priceRange.value]);

const housingType = ref([
    { title: "Apartment", value: "apartment" },
    { title: "B&B & Small Hotels", value: "b&b_and_small_hotels" },
    { title: "Room in Home Stay", value: "room_in_home_stay" },
    { title: "House /Villa", value: "house_villa" }
]);
const countries = ref([
    { name: "Thailand", value: "thailand" },
    { name: "Malaysia", value: "malaysia" },
    { name: "Taiwan", value: "taiwan" },
    { name: "Myanmar", value: "myanmar" },
    { name: "USA", value: "usa" }
]);

const propertyFeatures = ref([
    { name: "Located In Heritage Zone" },
    { name: "2 km away from Heritage Site" },
    { name: "Renovated in the past 6 months" },
    { name: "Pre-war period in 1939" },
    { name: "Post-war period in 1940" }
]);

const toggleFeature = (featureName: string) => {
    if (selectedFeatures.value.includes(featureName)) {
        selectedFeatures.value = selectedFeatures.value.filter(name => name !== featureName);
    } else {
        selectedFeatures.value.push(featureName);
    }
};

watch(
    [selectedHousingType, selectedCountry, selectedPriceRange, selectedFeatures],
    () => {
        emit('filters-changed', {
            housingType: selectedHousingType.value,
            country: selectedCountry.value,
            priceRange: selectedPriceRange.value,
            features: selectedFeatures.value,
        });
    },
    { deep: true }
);
</script>