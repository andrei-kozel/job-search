import { render, screen } from "@testing-library/vue";
import axios from "axios";
import { RouterLinkStub } from "@vue/test-utils";

import JobListings from "@/components/JobResults/JobListings.vue";

vi.mock("axios");

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const renderJobListngs = ($route) => {
    render(JobListings, {
      global: {
        mocks: {
          $route,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("fetches jobs", () => {
    axios.get.mockResolvedValue({ data: [] });
    const $route = createRoute();
    renderJobListngs($route);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  it("displays max of 10 jobs", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const $route = createRoute({ page: "1" });
    renderJobListngs($route);
    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exclde page number", () => {
    it("displays page number 1", () => {
      const $route = createRoute({ page: undefined });
      renderJobListngs($route);
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("hen params includes page number", () => {
    it("displays pag number", () => {
      const $route = createRoute({ page: "3" });
      renderJobListngs($route);
      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user on first page", () => {
    it("does not show link to the prev page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const $route = createRoute({ page: "1" });
      renderJobListngs($route);
      await screen.findAllByRole("listitem");
      const prevLink = screen.queryByRole("link", { name: /previous/i });
      expect(prevLink).not.toBeInTheDocument();
    });

    it("shows link to the next page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const $route = createRoute({ page: "1" });
      renderJobListngs($route);
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });
});
