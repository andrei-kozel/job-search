import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useRouter } from "vue-router";

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarCheckboxGroup.vue";

vi.mock("vue-router");
const useRouterMock = useRouter as Mock;
describe("JobFiltersSidebarCheckboxGroup", () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    header: string;
    uniqueValues: Set<string>;
    action: Mock;
  }

  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}
  ): JobFiltersSidebarCheckboxGroupProps => ({
    header: "Some header",
    uniqueValues: new Set(["A", "B"]),
    action: vi.fn(),
    ...props,
  });

  const rendersJobFilterSidebarCheckboxGroup = (
    props: JobFiltersSidebarCheckboxGroupProps
  ) => {
    const pinia = createTestingPinia();

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  it("renders unique list of values", async () => {
    const props = createProps({
      header: "Job Types",
      uniqueValues: new Set(["Full-time", "Part-time"]),
    });
    rendersJobFilterSidebarCheckboxGroup(props);

    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  it("communicates that user has selected uniqueValues", async () => {
    useRouterMock.mockReturnValue({ push: vi.fn() });
    const action = vi.fn();
    const props = createProps({
      header: "Job Types",
      uniqueValues: new Set(["Full-time", "Part-time"]),
      action,
    });
    rendersJobFilterSidebarCheckboxGroup(props);

    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const checkbox = screen.getByRole("checkbox", { name: /full-time/i });
    await userEvent.click(checkbox);

    expect(action).toHaveBeenCalledWith(["Full-time"]);
  });
});
