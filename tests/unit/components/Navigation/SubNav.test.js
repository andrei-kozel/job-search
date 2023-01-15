import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";

import SubNav from "@/components/Navigation/SubNav.vue";

describe("SubNav", () => {
  const renderSubNav = (path) => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    const $route = {
      name: path,
    };
    render(SubNav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route,
        },
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
      const { jobsStore } = renderSubNav("JobResults");
      const numberOfJobs = 16;
      jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS = Array(numberOfJobs).fill({});
      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  /* Testing that the job count is not displayed when the user is not on the jobs page. */
  describe("when user is not on Jobs page", () => {
    it("does NOT displays job count", () => {
      const { jobsStore } = renderSubNav("Home");
      const numberOfJobs = 16;
      jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS = Array(numberOfJobs).fill({});
      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
