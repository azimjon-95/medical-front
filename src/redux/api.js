// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   reducerPath: "allInfoApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5500/" }),
//   tagTypes: ["GetDoctors", "GetClients", "GetRooms"],
//   endpoints: (builder) => ({}),
// });

import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5500/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authentication", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["GetDoctors", "GetClients", "GetRooms"],
  endpoints: () => ({}),
});
