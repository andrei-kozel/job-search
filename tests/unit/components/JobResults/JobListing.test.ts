import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/JobResults/JobListing.vue";
import { createJob } from "tests/utils/createJobs";
import type { Job } from "@/api/types";

describe("JobListing", () => {
  const renderJobListing = (job: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...job,
        },
      },
    });
  };

  it("renders job title", () => {
    const props = createJob({ title: "Vue Developer" });
    renderJobListing(props);
    expect(screen.getByText("Vue Developer")).toBeInTheDocument();
  });

  it("renders job organization", () => {
    const props = createJob({ organization: "Org" });
    renderJobListing(props);
    expect(screen.getByText("Org")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const props = createJob({ locations: ["Sweden", "Spain"] });
    renderJobListing(props);
    expect(screen.getByText("Sweden")).toBeInTheDocument();
    expect(screen.getByText("Spain")).toBeInTheDocument();
  });

  it("renders job qualifications", () => {
    const props = createJob({ minimumQualifications: ["Q1", "Q2"] });
    renderJobListing(props);
    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.getByText("Q2")).toBeInTheDocument();
  });
});
