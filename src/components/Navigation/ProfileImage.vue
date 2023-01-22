<template>
  <img
    :src="image"
    class="h-8 w-8 rounded-full object-contain"
    alt="User profile image"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

const image = ref("https://i.pravatar.cc/300");
</script>
