import { api } from "./api";

export const roomApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => `rooms/getAllRoom`,
      providesTags: ["GetRooms"],
    }),

    addRoom: builder.mutation({
      query: (body) => ({
        url: "/rooms/addRoom",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetClients", "GetRooms"],
    }),

    updateRoom: builder.mutation({
      query: ({ id, body }) => ({
        url: `/rooms/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["GetClients", "GetRooms"],
    }),

    // Delete user from Room
    deleteUserFromRoom: builder.mutation({
      query: ({ clientID, roomID, body }) => ({
        url: `/rooms/deletefromroom/?clientID=${clientID}&roomID=${roomID}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["GetClients", "GetRooms"],
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteUserFromRoomMutation,
} = roomApi;
