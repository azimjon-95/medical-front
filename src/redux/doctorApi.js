import { api } from "./api";

export const doctorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoctors: builder.query({
      query: () => `admin/getAllDoctors`,
      providesTags: "GetDoctors",
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
  }),
});

export const { useGetAllDoctorsQuery, useGetDoctorInfoQuery } = doctorApi;
