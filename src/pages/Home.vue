<template>
  <div class="max-w-[1200px] w-ful h-[100%] mx-auto">
    <Breadcrumb class="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/"> Home </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Availability</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <Separator class="w-full mb-4" />
    <div class="mb-10 flex space-x-8 items-center">
      <div class="flex space-x-2 items-center">
        <span class="text-sm font-semibold">View As</span>
        <div class="flex space-x-1">
          <span @click="setColumns(1)" :class="getViewClass(1)" class="p-px border cursor-pointer">
            <Rows3 />
          </span>
          <span @click="setColumns(2)" :class="getViewClass(2)" class="p-px border cursor-pointer">
            <Columns2 />
          </span>
          <span @click="setColumns(3)" :class="getViewClass(3)" class="p-px border cursor-pointer md:block hidden">
            <Columns3 />
          </span>
        </div>
      </div>
      <div>
        <ScrollArea>
          <Sheet>
            <SheetTrigger>
              <FilterIcon class="cursor-pointer mt-1" />
            </SheetTrigger>
            <PropertyFilter @filters-changed="handleFiltersChanged" />
          </Sheet>
          <ScrollBar />
        </ScrollArea>
      </div>
      <div>
        <span class="text-sm font-bold">Result : {{ filteredHomes.length }} </span>
      </div>
    </div>
    <div v-if="filteredHomes.length === 0" class="flex justify-center items-center h-40">
      <p class="text-gray-500 font-bold text-md">
        No Results Found! Please adjust your filter criteria.
      </p>
    </div>
    <div v-else>
      <div :class="`grid gap-4 ${gridColumns}`">
        <div v-for="home in filteredHomes" :key="home.id" class="border rounded overflow-hidden cursor-pointer p-4">
          <div v-if="gridColumns === 'grid-cols-1 list'" class="flex space-x-4">
            <img :src="home.image" alt="Home Image" class="rounded lg:w-56 md:w-44 w-40 h-full object-cover" />
            <div class="flex flex-col justify-between -mt-3">
              <h3 class="text-lg font-semibold">{{ home.title }}</h3>
              <p class="text-gray-600 line-clamp-2 md:text-md text-sm hidden md:block">{{ home.description }}</p>
              <p class="text-sm md:text-md flex items-center whitespace-nowrap mb-2 md:mb-0">
                <MapPin class="w-4 h-4 mr-2" /> {{ home.location.city }},
                {{ home.location.country }}
              </p>
              <div class="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
                <p class="flex items-center text-sm md:text-md">
                  <Tag class="w-4 h-4 mr-2" /> : ${{ home.price_per_month }}/month
                </p>
                <p v-if="home.bedrooms" class="flex items-center text-sm md:text-md">
                  <Bed class="w-4 h-4 mr-2" /> : {{ home.bedrooms }} beds
                </p>
                <p v-if="home.bathrooms" class="flex items-center text-sm md:text-md">
                  <Bath class="w-4 h-4 mr-2" /> : {{ home.bathrooms }} bathrooms
                </p>
                <p v-if="home.area" class="flex items-center text-sm md:text-md">
                  <Scan class="w-4 h-4 mr-2" /> : {{ home.area }}
                </p>
              </div>
            </div>
          </div>
          <div v-else>
            <img :src="home.image" alt="Home Image"
              class="mb-4 rounded w-full h-48 object-cover  hover:scale-105 transition-all duration-1000" />
            <h3 class="text-lg font-semibold">{{ home.title }}</h3>
            <p class="text-gray-600 line-clamp-2 md:block hidden">{{ home.description }}</p>
            <p class="text-sm mt-2 flex items-center">
              <MapPin class="w-4 h-4 mr-2" /> {{ home.location.city }},
              {{ home.location.country }}
            </p>
            <div class="grid md:grid-cols-2 grid-cols-1 gap-4 mt-2">
              <p class="flex items-center md:text-md text-sm">
                <Tag class="w-4 h-4 mr-2" /> : ${{ home.price_per_month }}/month
              </p>
              <p v-if="home.bedrooms" class="flex items-center md:text-md text-sm">
                <Bed class="w-4 h-4 mr-2" /> : {{ home.bedrooms }} beds
              </p>
              <p v-if="home.bathrooms" class="flex items-center md:text-md text-sm">
                <Bath class="w-4 h-4 mr-2" /> : {{ home.bathrooms }} bathrooms
              </p>
              <p v-if="home.area" class="flex items-center md:text-md text-sm">
                <Scan class="w-4 h-4 mr-2" /> : {{ home.area }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { Rows3, Columns2, Columns3, FilterIcon, Bed, MapPin, Bath, Scan, Tag } from "lucide-vue-next";
import { computed, onMounted, ref, type Ref } from "vue";
import PropertyFilter from '@/components/PropertyFilter.vue';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';


interface Home {
  id: number;
  title: string;
  description: string;
  image: string;
  price_per_month: number;
  location: {
    city: string;
    country: string;
  };
  features: string[],
  housing_type: string,
  bathrooms?: number;
  bedrooms?: number;
  area?: string;
}

const homes: Ref<Home[]> = ref([]);
const selectedColumns = ref<number>(3);
const gridColumns = computed(() => {
  switch (selectedColumns.value) {
    case 1:
      return "grid-cols-1 list";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-3";
    default:
      return "grid-cols-3";
  }
});

function setColumns(columns: number) {
  selectedColumns.value = columns;
}

function getViewClass(columns: number) {
  return selectedColumns.value === columns
    ? "border-black text-black"
    : "border-slate-500 text-slate-500";
}

const filters = ref({
  housingType: 'default',
  country: 'default',
  priceRange: [0, 8000],
  features: [],
});

const handleFiltersChanged = (newFilters: any) => {
  filters.value = newFilters;
};

const filteredHomes = computed(() => {
  return homes.value.filter(home => {
    const matchesHousing = filters.value.housingType === 'default' || home.housing_type === filters.value.housingType;
    const matchesCountry = filters.value.country === 'default' || home.location.country.toLowerCase() === filters.value.country;
    const matchesPrice = home.price_per_month >= filters.value.priceRange[0] && home.price_per_month <= filters.value.priceRange[1];
    const matchesFeatures = filters.value.features.every(feature =>
      home.features && home.features.includes(feature)
    );
    return matchesHousing && matchesCountry && matchesPrice && matchesFeatures;
  });
});

onMounted(async () => {
  try {
    const response = await fetch("/heritage_homes.json");
    const data = await response.json();
    homes.value = data.map(home => ({
      ...home,
      housing_type: home.housing_type?.toLowerCase().replace(/ /g, '_'),
      features: home.features || [],
    }));
  } catch (error) {
    console.log(error);
  }
});
</script>