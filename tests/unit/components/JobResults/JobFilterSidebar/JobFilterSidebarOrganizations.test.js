import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useRouter } from "vue-router";

import JobFilterdSidebarOrganizations from "@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { vi } from "vitest";

vi.mock("vue-router");

describe("JobFilterdSidebarOrganizations", () => {
  const rendersJobFilterdSidebarOrganizations = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();
    const jobsStore = useJobsStore();

    render(JobFilterdSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore, userStore };
  };

  it("renders unique list of organizations from jobs", async () => {
    const { jobsStore } = rendersJobFilterdSidebarOrganizations();
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);
    const organizationListItems = screen.getAllByRole("listitem");
    const organizations = organizationListItems.map((node) => node.textContent);
    expect(organizations).toEqual(["Google", "Amazon"]);
  });

  it("communicates that user has selected checkbox for organizations", async () => {
    useRouter.mockReturnValue({ push: vi.fn() });

    const { jobsStore, userStore } = rendersJobFilterdSidebarOrganizations();
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const googleCheckbox = screen.getByRole("checkbox", { name: /google/i });
    await userEvent.click(googleCheckbox);

    expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
      "Google",
    ]);
  });
});
