<template>
  <div>Job Page {{ currentJobId }}</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentJobId = computed(() => route.params.id);
</script>
