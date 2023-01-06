import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";
import userEvent from "@testing-library/user-event";

describe("MainNav", () => {
  it("displays company name", () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
    const companyName = screen.getByText("Jobs & Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items", () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
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
      render(MainNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

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
