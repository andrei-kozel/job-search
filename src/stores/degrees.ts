import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { Degree } from "@/api/types";
import getDegrees from "@/api/getDegree";

export const useDegreesStore = defineStore("degrees", () => {
  const degrees = ref<Degree[]>([]);

  const FETCH_DEGREES = async () => {
    const resDegrees = await getDegrees();
    degrees.value = resDegrees;
  };

  const UNIQUE_DEGREES = computed(() =>
    degrees.value.map((degree) => degree.degree)
  );

  return { degrees, FETCH_DEGREES, UNIQUE_DEGREES };
});
