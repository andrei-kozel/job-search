<template>
  <collapsible-accordion class="mt-5" :header="header">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="value in uniqueValues" :key="value" class="h-8 w-1/2">
          <input
            :id="value"
            v-model="selectedValues"
            :value="value"
            type="checkbox"
            class="mr-3"
            @change="selectValue"
          />
          <label :for="value">{{ value }}</label>
        </li>
      </ul>
    </fieldset>
  </collapsible-accordion>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore, CLEAR_FILTER } from "@/stores/user";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  uniqueValues: {
    type: [Set<string>, Array<string>],
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});

const selectedValues = ref<string[]>([]);

const router = useRouter();
const selectValue = () => {
  props.action(selectedValues.value);
  router.push({ name: "JobResults" });
};

const userStore = useUserStore();
userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === CLEAR_FILTER) {
      selectedValues.value = [];
    }
  });
});
</script>
