import { render, screen } from "@testing-library/vue";
import SubNav from "@/components/Navigation/SubNav.vue";

describe("SubNav", () => {
  /* This is a test that checks if the job count is displayed when the user is on the jobs page. */
  describe("when user is on Jobs page", () => {
    it("displays job count", () => {
      const $route = {
        name: "JobResults",
      };
      render(SubNav, {
        global: {
          mocks: {
            $route,
          },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const jobCount = screen.getByText("1653");
      expect(jobCount).toBeInTheDocument();
    });
  });

  /* Testing that the job count is not displayed when the user is not on the jobs page. */
  describe("when user is not on Jobs page", () => {
    it("does NOT displays job count", () => {
      const $route = {
        name: "Home",
      };
      render(SubNav, {
        global: {
          mocks: {
            $route,
          },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });
    });

    const jobCount = screen.queryByText("1653");
    expect(jobCount).not.toBeInTheDocument();
  });
});
