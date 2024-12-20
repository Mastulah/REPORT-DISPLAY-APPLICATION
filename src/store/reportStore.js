import { defineStore } from "pinia";

export const useReportStore = defineStore("reportStore", {
  state: () => ({
    reports: []
  }),
  actions: {
    async fetchReports() {
      const data = await fetchReports();
      this.reports = data;
    }
  }
});
