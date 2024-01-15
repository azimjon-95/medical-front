import { api } from "./api";

export const reportsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({
      query: () => `reports/getReports`,
    }),
  }),
});

export const { useGetReportsQuery } = reportsApi;
