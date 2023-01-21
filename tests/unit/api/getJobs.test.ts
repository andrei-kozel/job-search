import type { Mock } from "vitest";
import axios from "axios";
import getJobs from "@/api/getJobs";

/* Mocking the axios.get method. */
vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("getJobs", () => {
  /* Setting up the mock for the axios.get method. */
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [{ id: 1, title: "Job title" }],
    });
  });

  /* Checking that the axios.get method is called with the correct url. */
  it("fetches jobs that candidates can apply to", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith("http://fakeapi.com/jobs");
  });

  /* Checking that the jobs are extracted from the response. */
  it("ectracts jobs from response", async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([{ id: 1, title: "Job title" }]);
  });
});
