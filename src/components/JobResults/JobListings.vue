<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="max-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useJobsStore } from "@/stores/jobs";

import JobListing from "@/components/JobResults/JobListing.vue";
import { useDegreesStore } from "@/stores/degrees";

const jobsStore = useJobsStore();
onMounted(jobsStore.FETCH_JOBS);

const degreesStore = useDegreesStore();
onMounted(degreesStore.FETCH_DEGREES);

const route = useRoute();

const currentPage = computed(() =>
  Number.parseInt((route.query.page as string) || "1")
);

const previousPage = computed(() => {
  const prevPage = currentPage.value - 1;
  return prevPage >= 1 ? prevPage : undefined;
});

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);

const nextPage = computed(() => {
  const nextPage = currentPage.value + 1;
  const maxPage = Math.ceil(FILTERED_JOBS.value.length / 10);
  return nextPage <= maxPage ? nextPage : undefined;
});

const displayedJobs = computed(() => {
  const page = currentPage.value;
  const firstjobIndex = (page - 1) * 10;
  const lastJobIndex = page * 10;
  return FILTERED_JOBS.value.slice(firstjobIndex, lastJobIndex);
});
</script>
