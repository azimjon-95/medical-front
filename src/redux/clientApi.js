import { api } from "./api";

export const clientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `client/all`,
      providesTags: ["GetClients"],
    }),

    getSingleUser: builder.query({
      query: (id) => `client/${id}`,
    }),

    // POST || CREATE CLIENT
    createClient: builder.mutation({
      query: (body) => ({
        url: "client",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetClients"],
    }),

    // DELETE CLIENT
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `client/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GetClients"],
    }),

    // PUT || UPDATE CLIENT
    updateClient: builder.mutation({
      query: ({ id, body }) => ({
        url: `/client/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["GetClients"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useCreateClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
} = clientApi;
