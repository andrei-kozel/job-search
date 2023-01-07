<template>
  <main>
    <section class="flex h-screen flex-col bg-yellow-200 pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-span-1 col-start-1">1 col</div>
        <div class="col-span-5 col-start-2">
          <TheHeadline />
          <JobSearchForm />
        </div>
        <div class="col-span-5 col-start-7">5 cols</div>
        <div class="col-span-1 col-start-12">1 col</div>
      </div>
    </section>
  </main>
</template>

<script>
import TheHeadline from "@/components/TheHeadline.vue";
import JobSearchForm from "@/components/JobSearchForm.vue";

export default {
  name: "TheHero",
  components: { TheHeadline, JobSearchForm },
};
</script>
