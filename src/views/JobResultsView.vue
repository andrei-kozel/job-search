<template>
  <div class="flex w-full flex-row flex-nowrap">
    <JobFilterSidebar />
    <JobListings />
  </div>
</template>

<script setup lang="ts">
import JobFilterSidebar from "@/components/JobResults/JobFilterSidebar/JobFilterSidebar.vue";
import JobListings from "@/components/JobResults/JobListings.vue";
</script>
