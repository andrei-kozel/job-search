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

<script>
import { mapActions, mapState } from "pinia";
import {
  useJobsStore,
  FETCH_JOBS,
  FILTERED_JOBS_BY_ORGANIZATIONS,
} from "@/stores/jobs";

import JobListing from "@/components/JobResults/JobListing.vue";

export default {
  name: "JobListings",
  components: {
    JobListing,
  },
  computed: {
    ...mapState(useJobsStore, {
      FILTERED_JOBS_BY_ORGANIZATIONS,
      nextPage() {
        const nextPage = this.currentPage + 1;
        const maxPage = Math.ceil(
          this.FILTERED_JOBS_BY_ORGANIZATIONS.length / 10
        );
        return nextPage <= maxPage ? nextPage : undefined;
      },
      displayedJobs() {
        const page = this.currentPage;
        const firstjobIndex = (page - 1) * 10;
        const lastJobIndex = page * 10;
        return this.FILTERED_JOBS_BY_ORGANIZATIONS.slice(
          firstjobIndex,
          lastJobIndex
        );
      },
    }),
    currentPage() {
      return Number.parseInt(this.$route.query.page || "1");
    },
    previousPage() {
      const prevPage = this.currentPage - 1;
      return prevPage >= 1 ? prevPage : undefined;
    },
  },
  async mounted() {
    this.FETCH_JOBS();
  },
  methods: {
    ...mapActions(useJobsStore, [FETCH_JOBS]),
  },
};
</script>
