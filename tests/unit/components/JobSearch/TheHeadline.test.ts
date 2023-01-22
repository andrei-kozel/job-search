import { render, screen } from "@testing-library/vue";
import TheHeadline from "@/components/JobSearch/TheHeadline.vue";
import { nextTick } from "vue";

describe("TheHeadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /* This is testing that the first action verb is displayed. */
  it("displays introductory action verb", () => {
    render(TheHeadline);
    const actionPhrase = screen.getByRole("heading", {
      name: /build for everyone/i,
    });
    expect(actionPhrase).toBeInTheDocument();
  });

  /* Checking that the setInterval function is called. */
  it("changes action verb at a consistent interval", () => {
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);

    render(TheHeadline);

    expect(mock).toHaveBeenCalled();
  });

  /* Using fake timers to test the action verb swap. */
  it("swaps action verb after interval", async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();
    await nextTick();
    const actionPhrase = screen.getByRole("heading", {
      name: /design for everyone/i,
    });
    expect(actionPhrase).toBeInTheDocument();
  });

  /* This is testing that the interval is removed when the component is unmounted. */
  it("removes interval when component desappears", () => {
    const clearIntertval = vi.fn();
    vi.stubGlobal("clearInterval", clearIntertval);

    const { unmount } = render(TheHeadline);
    unmount();
    expect(clearIntertval).toHaveBeenCalled();
  });
});
