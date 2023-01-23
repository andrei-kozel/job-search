import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "@/stores/user";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track if user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("stores organizations that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });

  it("stores job types that the user whould like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });

  it("stores degrees that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedDegrees).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("loginUser", () => {
    it("logs the user in", () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations the user chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(["Org1", "Org2"]);
      expect(store.selectedOrganizations).toEqual(["Org1", "Org2"]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types the user chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(["Type 1", "Type 2"]);
      expect(store.selectedJobTypes).toEqual(["Type 1", "Type 2"]);
    });
  });

  describe("ADD_SELECTED_DEGREES", () => {
    it("updates degrees the user chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_DEGREES(["Deg 1", "Deg 2"]);
      expect(store.selectedDegrees).toEqual(["Deg 1", "Deg 2"]);
    });
  });

  describe("CLEAR_FILTER", () => {
    it("removes all job filters that user has chosen", () => {
      const store = useUserStore();
      store.ADD_SELECTED_DEGREES(["Deg 1", "Deg 2"]);
      store.ADD_SELECTED_JOB_TYPES(["Type 1", "Type 2"]);
      store.ADD_SELECTED_ORGANIZATIONS(["Org1", "Org2"]);
      expect(store.selectedDegrees).toEqual(["Deg 1", "Deg 2"]);
      expect(store.selectedJobTypes).toEqual(["Type 1", "Type 2"]);
      expect(store.selectedOrganizations).toEqual(["Org1", "Org2"]);

      store.CLEAR_FILTER();
      expect(store.selectedDegrees).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
      expect(store.selectedOrganizations).toEqual([]);
    });
  });
});
