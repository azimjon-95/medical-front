import { api } from "./api";

export const doctorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoctors: builder.query({
      query: () => `admin/getAllDoctors`,
      providesTags: ["GetDoctors"],
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

    createDoctor: builder.mutation({
      query: (body) => ({
        url: "admin/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetDoctors"],
    }),

    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `admin/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GetDoctors"],
    }),
  }),
});

export const {
  useGetAllDoctorsQuery,
  useGetDoctorInfoQuery,
  useCreateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorApi;
