import axios from "axios"
import { parseCookies } from "nookies"
import qs from "qs"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: (params) => {
    return qs.stringify(params)
  },
})

api.interceptors.request.use(async (config) => {
  console.log({ config })
  if (typeof window !== "undefined" && config.headers) {
    const cookies = parseCookies()
    const {
      '@StoreOne:token': tokenStorage,
    } = cookies

    console.log({ tokenStorage })
    if (tokenStorage) {
      config.headers["Authorization"] = `Bearer ${tokenStorage}`
    }
  }

  return config
})

// api.interceptors.response.use(
//   (response) => {
//     return response.data
//   },
//   async (err) => {
//     if (
//       typeof window !== "undefined" &&
//       401 === err?.response?.status &&
//       !(window as any).widget
//     ) {
//       window.location.href = "/signin"
//     }

//     return Promise.reject(err)
//   }
// )
