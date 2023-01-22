import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import TextInput from "@/components/Shared/TextInput.vue";

describe("TextInput", () => {
  /* Testing that the user has entered a character. */
  it("communicates that user has entered character", async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: "",
      },
    });
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Text");
    const messages = emitted()["update:modelValue"];
    expect(messages).toEqual([["T"], ["Te"], ["Tex"], ["Text"]]);
  });
});
