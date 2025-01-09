<template>
  <nav class="w-full bg-[#fafc9e] font-cinzel py-2 px-4 select-none">
    <div class="w-4/5 mx-auto flex items-center">
      <span class="hidden">
        <img src="/logo.svg" alt="" class="w-20 h-20 -mt-9" />
      </span>
      <ul class="flex justify-center text-[#123E55] items-center mx-auto">
        <li>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger class="">
                  <span class="text-lg">Our Properties</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#fafc9e] text-[#123E55]"
                  >
                    <li v-for="(propertie, index) in properties" :key="index">
                      <NavigationMenuLink href="">
                        <button class="font-gothic-a1 hover:underline">
                          {{ propertie.title }}
                        </button></NavigationMenuLink
                      >
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </li>
        <li>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger class="">
                  <span class="text-lg">For Homeowners</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#fafc9e] text-[#123E55]"
                  >
                    <li v-for="(owner, index) in homeOwners" :key="index">
                      <NavigationMenuLink href="">
                        <button class="font-gothic-a1 hover:underline">
                          {{ owner.title }}
                        </button></NavigationMenuLink
                      >
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </li>
        <li>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="">
                  <span class="text-lg"> Tavel Inspiration & News </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </li>
        <li>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger class="">
                  <span class="text-lg">About Us</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#fafc9e] text-[#123E55]"
                  >
                    <li v-for="(abt, index) in about" :key="index">
                      <NavigationMenuLink href="">
                        <button class="font-gothic-a1 hover:underline">
                          {{ abt.title }}
                        </button></NavigationMenuLink
                      >
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const properties: { title: string; link: string }[] = [
  {
    title: "Stay(Short Term)",
    link: "#",
  },
  {
    title: "Rent(Mid /Long Term)",
    link: "#",
  },
  {
    title: "Buy",
    link: "#",
  },
  {
    title: "Finance",
    link: "#",
  },
];

const homeOwners: { title: string; link: string }[] = [
  {
    title: "Why become a member?",
    link: "#",
  },
  {
    title: "Eligiblity",
    link: "#",
  },
  {
    title: "Membership & Pricing",
    link: "#",
  },
  {
    title: "Services & Pricing",
    link: "#",
  },
];

const about: { title: string; link: string }[] = [
  {
    title: "About Our Heritage Homes",
    link: "#",
  },
  {
    title: "Heritage & Our Citeria",
    link: "#",
  },
  {
    title: "Our Impact",
    link: "#",
  },
  {
    title: "Our Team",
    link: "#",
  },
  {
    title: "Patnerships",
    link: "#",
  },
  {
    title: "Careers & Voluntering",
    link: "#",
  },
];
</script>

<style scoped></style>
