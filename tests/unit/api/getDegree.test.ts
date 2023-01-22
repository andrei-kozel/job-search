import type { Mock } from "vitest";
import axios from "axios";
import getDegree from "@/api/getDegree";

/* Mocking the axios.get method. */
vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("getJobs", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [{ id: 1, degree: "Associate" }],
    });
  });

  /* Checking that the axios.get method is called with the correct url. */
  it("fetches degrees that candidates can apply to", async () => {
    await getDegree();
    expect(axios.get).toHaveBeenCalledWith("http://fakeapi.com/degrees");
  });

  /* Checking that the data returned from the API is the same as the data that is expected. */
  it("ectracts degrees from response", async () => {
    const degrees = await getDegree();
    expect(degrees).toEqual([{ id: 1, degree: "Associate" }]);
  });
});
