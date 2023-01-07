import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  it("locates element in list and returns the next element in list", () => {
    const list = ["a", "b", "c", "d", "e"];
    let value = "c";
    let result = nextElementInList(list, value);
    expect(result).toBe("d");
  });

  it("when element is at the end of a list", () => {
    const list = ["a", "b", "c", "d", "e"];
    let value = "e";
    let result = nextElementInList(list, value);
    expect(result).toBe("a");
  });
});
