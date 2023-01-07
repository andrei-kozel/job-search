<template>
  <main>
    <section class="flex h-screen flex-col pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-span-1 col-start-1"></div>
        <div class="col-span-5 col-start-2">
          <TheHeadline />
          <JobSearchForm />
        </div>
        <div
          class="col-span-5 col-start-7 self-center justify-self-center p-10"
        >
          <img
            class="h-90 w-90 rounded-3xl object-contain"
            src="hero_image.jpeg"
          />
        </div>
        <div class="col-span-1 col-start-12"></div>
      </div>
    </section>
  </main>
</template>

<script>
import TheHeadline from "@/components/JobSearch/TheHeadline.vue";
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";

export default {
  name: "TheHero",
  components: { TheHeadline, JobSearchForm },
};
</script>
