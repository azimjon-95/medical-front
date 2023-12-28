import { api } from "./api";

export const clientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `client/all`,
      providesTags: ["GetClients"],
    }),

    getDailyReports: builder.query({
      query: () => `dailiyReports/doctorsMoney`,
    }),

    getSingleUser: builder.query({
      query: (id) => `client/${id}`,
    }),

    // POST
    createClient: builder.mutation({
      query: (body) => ({
        url: "client",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetClients"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetDailyReportsQuery,
  useGetSingleUserQuery,
  useCreateClientMutation,
} = clientApi;
