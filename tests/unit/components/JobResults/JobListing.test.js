import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/JobResults/JobListing.vue";

describe("JobListing", () => {
  const createJobProps = (props) => ({
    title: "Vue Developer",
    organization: "Org",
    locations: ["Sweden", "Spain"],
    minimumQualifications: ["Q1", "Q2"],
    ...props,
  });

  const renderJobListing = (props) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...props,
        },
      },
    });
  };

  it("renders job title", () => {
    const props = createJobProps({ title: "Vue Developer" });
    renderJobListing(props);
    expect(screen.getByText("Vue Developer")).toBeInTheDocument();
  });

  it("renders job organization", () => {
    const props = createJobProps({ organization: "Org" });
    renderJobListing(props);
    expect(screen.getByText("Org")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const props = createJobProps({ locations: ["Sweden", "Spain"] });
    renderJobListing(props);
    expect(screen.getByText("Sweden")).toBeInTheDocument();
    expect(screen.getByText("Spain")).toBeInTheDocument();
  });

  it("renders job qualifications", () => {
    const props = createJobProps({ minimumQualifications: ["Q1", "Q2"] });
    renderJobListing(props);
    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.getByText("Q2")).toBeInTheDocument();
  });
});
