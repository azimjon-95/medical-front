import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const allInfoApi = createApi({
  reducerPath: "allInfoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5500/" }),
  endpoints: (builder) => ({
    getAllDoctors: builder.query({
      query: () => `admin/getAllDoctors`,
    }),
    getAllRooms: builder.query({
      query: () => `rooms/getAllRoom`,
    }),
    getAllUsers: builder.query({
      query: () => `client/all`,
    }),
    getDailyReports: builder.query({
      query: () => `dailiyReports/doctorsMoney`,
    }),

    getSingleUser: builder.query({
      query: (id) => `client/${id}`,
    }),

    getDoctorInfo: builder.query({
      query: (id) => ({
        url: `doctor/getDoctorInfo`,
        method: "GET",
        body: { userId: id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    // POST
    createClient: builder.mutation({
      query: (body) => ({
        url: "client",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetAllDoctorsQuery,
  useGetAllRoomsQuery,
  useGetAllUsersQuery,
  useGetDailyReportsQuery,
  useGetSingleUserQuery,
  useGetDoctorInfoQuery,
  useCreateClientMutation,
} = allInfoApi;
