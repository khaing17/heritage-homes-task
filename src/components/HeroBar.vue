<template>
  <header class="w-full bg-[#f7f7f7] px-4 py-2 flex justify-between items-center">
    <img src="/heritage_homes.svg" alt="" class="w-20 h-20" />
    <div class="flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <span>EN</span>
              <span class="ml-2">
                <IconifyIcon icon="circum:globe" width="24" height="24" />
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="">
                <li v-for="lang in languages" :key="lang.title" class="flex">
                  <NavigationMenuLink as-Child>
                    <button class="w-full p-2 hover:bg-gray-100 flex items-center">
                      <span>{{ lang.flag }}</span>
                      <span class="ml-2">{{ lang.title }}</span>
                    </button>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <span>USD</span>
              <span class="ml-2">
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="">
                <li v-for="curr in currency" :key="curr.title" class="flex">
                  <NavigationMenuLink as-Child>
                    <button class="w-full p-2 hover:bg-gray-100 flex items-center">
                      <span>{{ curr.sign }}</span>
                      <span class="ml-2">{{ curr.title }}</span>
                    </button>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button variant="outline" class="border border-yellow-400 font-thin py-5 text-yellow-600 text-md">
        Login /Register</Button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

const languages: { title: string; flag: string }[] = [
  { title: "English", flag: "🇬🇧" },
  { title: "Spanish", flag: "🇪🇸" },
  { title: "French", flag: "🇫🇷" },
  { title: "German", flag: "🇩🇪" },
  { title: "Japanese", flag: "🇯🇵" },
  { title: "Chinese", flag: "🇨🇳" },
];
const currency: { title: string; sign: string }[] = [
  { title: "USD", sign: "$" },
  { title: "GBP", sign: "£" },
  { title: "EUR", sign: "€" },
];
</script>

<style scoped></style>