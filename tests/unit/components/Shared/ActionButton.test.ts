import { render, screen } from "@testing-library/vue";
import ActionButton from "@/components/Shared/ActionButton.vue";

describe("ActionButton", () => {
  /* Testing that the button is in the document. */
  it("renders text", () => {
    render(ActionButton, {
      props: {
        text: "Click me",
        type: "primary",
      },
    });

    const button = screen.getByRole("button", {
      name: /click me/i,
    });
    expect(button).toBeInTheDocument();
  });

  /* Testing that the button has the class primary. */
  it("applies one of several styles to button", () => {
    render(ActionButton, {
      props: {
        text: "Click me",
        type: "primary",
      },
    });

    const button = screen.getByRole("button", {
      name: /click me/i,
    });
    expect(button).toHaveClass("primary");
  });
});
