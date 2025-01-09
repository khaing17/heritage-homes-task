<template>
  <div class="max-w-[1200px] w-ful h-[100%] mx-auto">
    <Breadcrumb class="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/"> Home </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#"> Components </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <Separator class="w-full mb-4" />
    <div class="mb-10">
      <div class="flex space-x-2 items-center">
        <span class="text-sm font-semibold">View As</span>
        <div class="flex space-x-1">
          <span
            @click="setColumns(1)"
            :class="getViewClass(1)"
            class="p-px border cursor-pointer"
          >
            <Rows3 />
          </span>
          <span
            @click="setColumns(2)"
            :class="getViewClass(2)"
            class="p-px border cursor-pointer"
          >
            <Columns2 />
          </span>
          <span
            @click="setColumns(3)"
            :class="getViewClass(3)"
            class="p-px border cursor-pointer"
          >
            <Columns3 />
          </span>
        </div>
      </div>
      <div></div>
    </div>
    <div>
      <h2 class="text-xl font-bold mb-4">Heritage Homes</h2>
      <div :class="`grid gap-4 ${gridColumns}`">
        <div v-for="home in homes" :key="home.id" class="border p-4 rounded">
          <div v-if="gridColumns === 'grid-cols-1'" class="flex space-x-4">
            <img
              :src="home.image"
              alt="Home Image"
              class="mb-4 rounded w-56 h-full object-cover"
            />
            <div class="flex flex-col justify-between my-4">
              <h3 class="text-lg font-semibold">{{ home.title }}</h3>
              <p class="text-gray-600 line-clamp-2">{{ home.description }}</p>
              <p class="text-sm mt-2">
                <strong>Location:</strong> {{ home.location.city }},
                {{ home.location.country }}
              </p>
              <p class="text-sm mt-2">
                <strong>Price:</strong> ${{ home.price_per_month }}/month
              </p>
            </div>
          </div>
          <div v-else>
            <img
              :src="home.image"
              alt="Home Image"
              class="mb-4 rounded w-full h-48 object-cover hover:scale-110 transition-all duration-1000"
            />
            <h3 class="text-lg font-semibold">{{ home.title }}</h3>
            <p class="text-gray-600 line-clamp-2">{{ home.description }}</p>
            <p class="text-sm mt-2">
              <strong>Location:</strong> {{ home.location.city }},
              {{ home.location.country }}
            </p>
            <p class="text-sm mt-2">
              <strong>Price:</strong> ${{ home.price_per_month }}/month
            </p>
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
import { Rows3, Columns2, Columns3, Columns4 } from "lucide-vue-next";
import { computed, onMounted, ref, type Ref } from "vue";
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
}
const homes: Ref<Home[]> = ref([]);
const selectedColumns = ref<number>(3);
const gridColumns = computed(() => {
  switch (selectedColumns.value) {
    case 1:
      return "grid-cols-1";
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

onMounted(async () => {
  try {
    const response = await fetch("/heritage_homes.json");
    const data = await response.json();
    homes.value = data;
  } catch (error) {
    console.log(error);
  }
});
</script>
