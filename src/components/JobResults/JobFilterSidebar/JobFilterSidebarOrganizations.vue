<template>
  <collapsible-accordion class="mt-5" header="Organizations">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li class="h-8 w-1/2">
          <input id="VueTube" type="checkbox" class="mr-3" />
          <label>Placeholder 1</label>
        </li>
        <li class="h-8 w-1/2">
          <input id="VueTube" type="checkbox" class="mr-3" />
          <label>Placeholder 2</label>
        </li>
        <li class="h-8 w-1/2">
          <input id="VueTube" type="checkbox" class="mr-3" />
          <label>Placeholder 3</label>
        </li>
        <li class="h-8 w-1/2">
          <input id="VueTube" type="checkbox" class="mr-3" />
          <label>Placeholder 4</label>
        </li>
      </ul>
    </fieldset>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "JoBFilterSdebarOrganization",
  components: {
    CollapsibleAccordion,
  },
};
</script>
