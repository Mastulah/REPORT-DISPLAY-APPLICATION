import data from "../mock-data.json";

export const fetchReports = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
};
