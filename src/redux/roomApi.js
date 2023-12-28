import { api } from "./api";

export const roomApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => `rooms/getAllRoom`,
    }),
  }),
});

export const { useGetAllRoomsQuery } = roomApi;
