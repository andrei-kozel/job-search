import type { Mock } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { describe } from "vitest";
import type { Job } from "@/api/types";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores jobs listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes API request and stores received jobs", async () => {
      axiosGetMock.mockResolvedValue({ data: ["Job 1", "Job 2"] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["Job 1", "Job 2"]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Google" },
        { organization: "Google" },
        { organization: "Amazon" },
      ] as Job[];
      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { jobType: "Full-time" },
        { jobType: "Part-time" },
        { jobType: "Full-time" },
      ] as Job[];

      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(["Full-time", "Part-time"]));
    });
  });

  describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
    it("identifies jobs that are associated with the given organizations", () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Microsoft" },
      ] as Job[];
      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Microsoft"];

      const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;
      expect(result).toEqual([
        { organization: "Google" },
        { organization: "Microsoft" },
      ]);
    });

    describe("when the user has not selectaed any organization", () => {
      it("returns all jobs", () => {
        const jobsStore = useJobsStore();
        jobsStore.jobs = [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ] as Job[];
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];

        const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;
        expect(result).toEqual([
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ]);
      });
    });
  });

  describe("FILTERED_JOBS_BY_JOB_TYPES", () => {
    it("identifies jobs that are assiciated with given job types", () => {
      const jobStore = useJobsStore();
      jobStore.jobs = [
        { jobType: "Full-time" },
        { jobType: "Part-time" },
        { jobType: "Temporary" },
      ] as Job[];

      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Full-time", "Part-time"];

      const result = jobStore.FILTERED_JOBS_BY_JOB_TYPES;
      expect(result).toEqual([
        { jobType: "Full-time" },
        { jobType: "Part-time" },
      ]);
    });

    describe("when user has not selected any job types", () => {
      it("returns all jobs", () => {
        const jobStore = useJobsStore();
        jobStore.jobs = [
          { jobType: "Full-time" },
          { jobType: "Part-time" },
          { jobType: "Temporary" },
        ] as Job[];

        const userStore = useUserStore();
        userStore.selectedJobTypes = [];

        const result = jobStore.FILTERED_JOBS_BY_JOB_TYPES;
        expect(result).toEqual([
          { jobType: "Full-time" },
          { jobType: "Part-time" },
          { jobType: "Temporary" },
        ]);
      });
    });
  });
});
