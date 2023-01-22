import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";

import JobListings from "@/components/JobResults/JobListings.vue";
import { useJobsStore } from "@/stores/jobs";

vi.mock("vue-router");
const useRouteMock = useRoute as Mock;
describe("JobListings", () => {
  const pinia = createTestingPinia({ stubActions: false });

  const renderJobListngs = () => {
    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("fetches jobs", () => {
    useRouteMock.mockReturnValue({ query: {} });
    renderJobListngs();
    const jobsStore = useJobsStore();
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalledWith();
  });

  it("displays max of 10 jobs", async () => {
    useRouteMock.mockReturnValue({ query: { page: "1" } });
    renderJobListngs();
    const jobsStore = useJobsStore();
    jobsStore.jobs = Array(15).fill({});
    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exclde page number", () => {
    it("displays page number 1", () => {
      useRouteMock.mockReturnValue({ query: {} });
      renderJobListngs();
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("hen params includes page number", () => {
    it("displays pag number", () => {
      useRouteMock.mockReturnValue({ query: { page: "3" } });
      renderJobListngs();
      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user on first page", () => {
    it("does not show link to the prev page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });
      renderJobListngs();
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const prevLink = screen.queryByRole("link", { name: /previous/i });
      expect(prevLink).not.toBeInTheDocument();
    });

    it("shows link to the next page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });
      renderJobListngs();
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user on last page", () => {
    it("does not show link to the next page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "2" } });
      renderJobListngs();
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("shows link to the previous page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "2" } });
      renderJobListngs();
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const prevLink = screen.queryByRole("link", { name: /previous/i });
      expect(prevLink).toBeInTheDocument();
    });
  });
});
