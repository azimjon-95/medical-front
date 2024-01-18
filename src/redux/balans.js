import { api } from "./api";

export const balansApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query({
      query: () => `balans/getBalance`,
    }),
  }),
});

export const { useGetBalanceQuery } = balansApi;
