import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFilterSidebarJobTypes from "@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobTypes.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

describe("JobFilterSidebarJobTypes", () => {
  const rendersJobFilteredSidebarJobTypes = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();
    const jobsStore = useJobsStore();

    render(JobFilterSidebarJobTypes, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore, userStore };
  };

  it("renders unique list of job types from jobs", async () => {
    const { jobsStore } = rendersJobFilteredSidebarJobTypes();
    jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  it("communicates that user has selected checkbox for job type", async () => {
    const { jobsStore, userStore } = rendersJobFilteredSidebarJobTypes();
    jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const checkbox = screen.getByRole("checkbox", { name: /full-time/i });
    await userEvent.click(checkbox);

    expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
      "Full-time",
    ]);
  });
});
