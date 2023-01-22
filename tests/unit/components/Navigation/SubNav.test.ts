import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";
import { useRoute } from "vue-router";

vi.mock("vue-router");

import SubNav from "@/components/Navigation/SubNav.vue";
import { vi } from "vitest";

const useRouteMock = useRoute as Mock;

describe("SubNav", () => {
  const renderSubNav = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    render(SubNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore };
  };

  /* This is a test that checks if the job count is displayed when the user is on the jobs page. */
  describe("when user is on Jobs page", () => {
    it("displays job count", async () => {
      useRouteMock.mockReturnValue({ name: "JobResults" });
      const { jobsStore } = renderSubNav();
      const numberOfJobs = 16;
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  /* Testing that the job count is not displayed when the user is not on the jobs page. */
  describe("when user is not on Jobs page", () => {
    it("does NOT displays job count", () => {
      useRouteMock.mockReturnValue({ name: "Home" });
      const { jobsStore } = renderSubNav();
      const numberOfJobs = 16;
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
