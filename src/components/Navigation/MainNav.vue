<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <a class="flex h-full items-center text-xl font-bold" href="/">{{
          company
        }}</a>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="item in menuItems"
              :key="item.title"
              class="ml-9 h-full first:ml-0 hover:text-gray-400"
            >
              <a :href="item.url" class="flex h-full items-center py-2.5">{{
                item.title
              }}</a>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <ProfileImage v-if="isLoggedIn" />
          <ActionButton
            v-else
            text="Sign in"
            type="primary"
            @click="handleLogin"
          />
        </div>
      </div>
      <SubNav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import SubNav from "@/components/Navigation/SubNav.vue";

export default {
  name: "MainNav",
  components: { ActionButton, ProfileImage, SubNav },
  data() {
    return {
      company: "Jobs & Careers",
      menuItems: [
        { title: "Teams", url: "/" },
        { title: "Location", url: "/" },
        { title: "Life at J&C", url: "/" },
        { title: "How we hire", url: "/" },
        { title: "Students", url: "/" },
        { title: "Jobs", url: "/" },
      ],
      isLoggedIn: false,
    };
  },
  computed: {
    headerHeightClass() {
      return { "h-16": !this.isLoggedIn, "h-32": this.isLoggedIn };
    },
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
