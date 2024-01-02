import { api } from "./api";

export const dailyReportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDailyReports: builder.query({
      query: () => `dailiyReports/doctorsMoney`,
    }),
  }),
});

export const { useGetDailyReportsQuery } = dailyReportApi;
