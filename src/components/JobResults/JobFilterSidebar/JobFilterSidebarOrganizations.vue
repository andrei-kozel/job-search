<template>
  <collapsible-accordion class="mt-5" header="Organizations">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="org in UNIQUE_ORGANIZATIONS" :key="org" class="h-8 w-1/2">
          <input
            :id="org"
            v-model="selectedOrganizations"
            :value="org"
            type="checkbox"
            class="mr-3"
            @change="selectOrganizations"
          />
          <label :for="org">{{ org }}</label>
        </li>
      </ul>
    </fieldset>
  </collapsible-accordion>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

const selectedOrganizations = ref([]);

const jobsStore = useJobsStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);

const userStore = useUserStore();
const router = useRouter();
const selectOrganizations = () => {
  userStore.ADD_SELECTED_ORGANIZATIONS(selectedOrganizations.value);
  router.push({ name: "JobResults" });
};
</script>
