<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ action }}</span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job</h2>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import nextElementInList from "@/utils/nextElementInList";

const action = ref("Build");
const interval = ref<ReturnType<typeof setInterval>>();

const actionClasses = computed(() => ({ [action.value.toLowerCase()]: true }));

const changeTitle = () => {
  interval.value = setInterval(() => {
    const actions = ["Build", "Design", "Create", "Code"];
    action.value = nextElementInList(actions, action.value);
  }, 3000);
};

onMounted(changeTitle);
onBeforeUnmount(() => clearInterval(interval.value));
</script>

<style scoped>
.build {
  color: #1a63eb;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>
