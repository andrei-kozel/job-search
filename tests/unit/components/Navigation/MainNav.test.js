import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/Navigation/MainNav.vue";
import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";

describe("MainNav", () => {
  const renderMainNav = () => {
    const $route = {
      name: "Home",
    };
    render(MainNav, {
      global: {
        mocks: {
          $route,
        },
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("displays company name", () => {
    renderMainNav();
    const companyName = screen.getByText("Jobs & Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items", () => {
    renderMainNav();
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navigationMenuTexts = navigationMenuItems.map(
      (item) => item.textContent
    );
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Location",
      "Life at J&C",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when the user logs in", () => {
    it("displays user profile picture", async () => {
      renderMainNav();

      /* Checking if the user profile image is not in the document. */
      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i, //regex
      });
      expect(profileImage).not.toBeInTheDocument();

      /* Clicking the login button and then checking if the profile image is in the document. */
      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });
      await userEvent.click(loginButton);
      profileImage = screen.queryByRole("img", {
        name: /user profile image/i, //regex
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
