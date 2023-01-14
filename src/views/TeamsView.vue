<template>
  <header-component>
    <template #title>
      <h1 class="w-full text-4xl font-normal">Teams</h1>
    </template>
    <template #subtitle>
      <h2 class="my-4 w-full text-base font-light">
        It's awesome working here. Why don't you come and join us?
      </h2>
    </template>
  </header-component>
</template>

<script>
import HeaderComponent from "@/components/Shared/HeaderContainer.vue";

export default {
  name: "TeamsView",
  components: {
    HeaderComponent,
  },
};
</script>
