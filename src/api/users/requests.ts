import axios from "axios"
import { forEach, isBoolean, isNil } from "lodash-es"
import { useQueryClient, useMutation, useQuery } from "react-query"

import { LoggedInWhoami, Whoami } from ".."
import { QueryError } from "../../axios"
import { EmptyObject } from "../../../types/utils_types"
import { debug } from "../../utils"

const getWhoami = () => axios.get("/users/whoami").then(({ data }) => data)
export const useWhoami = () =>
  useQuery<Whoami, QueryError>(["users", "whoami"], getWhoami, { staleTime: Infinity })

const mapFormDataValue = (value: string | boolean | File) => {
  if (isBoolean(value)) return value ? "1" : "0"

  return value
}

type SignUpResponse = LoggedInWhoami
export type SignUpParameters = {
  email: string
  username: string | undefined
  avatar: File | undefined
  password: string
  password_confirmation: string
  opt_in_marketing: boolean
}
export const useSignUp = () => {
  const queryClient = useQueryClient()

  return useMutation<
    SignUpResponse,
    QueryError<{ errors: Record<keyof SignUpParameters, string[]> }>,
    SignUpParameters
  >(
    ["users", "signUp"],
    (payload) => {
      const formData = new FormData()
      forEach(
        payload,
        (value, key) => !isNil(value) && formData.append(`user[${key}]`, mapFormDataValue(value))
      )
      return axios.post("/users", formData).then(({ data }) => data)
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Whoami>(["users", "whoami"], data)
      }
    }
  )
}

type SignInResponse = LoggedInWhoami
export type SignInParameters = {
  email: string
  password: string
}
export const useSignIn = () => {
  const queryClient = useQueryClient()

  return useMutation<SignInResponse, QueryError<{ error: string }>, SignInParameters>(
    ["users", "signIn"],
    (payload) => axios.post("/users/sign_in", { user: payload }).then(({ data }) => data),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Whoami>(["users", "whoami"], data)
      }
    }
  )
}

type InitiateResetPasswordResponse = EmptyObject
export type InitiateResetPasswordParameters = {
  email: string
}
export const useInitiateResetPassword = () =>
  useMutation<
    InitiateResetPasswordResponse,
    QueryError<{ error: string }>,
    InitiateResetPasswordParameters
  >(["users", "initiateResetPassword"], (payload) =>
    axios.post("/users/password", { user: payload }).then(({ data }) => data)
  )

type ResetPasswordResponse = EmptyObject
export type ResetPasswordParameters = {
  reset_password_token: string
  password: string
  password_confirmation: string
}
export const useResetPassword = () =>
  useMutation<
    ResetPasswordResponse,
    QueryError<{ errors: Record<keyof SignUpParameters, string[]> }>,
    ResetPasswordParameters
  >(["users", "resetPassword"], (payload) =>
    axios.put("/users/password", { user: payload }).then(({ data }) => data)
  )

type UpdateUserResponse = LoggedInWhoami
export type UpdateUserParameters = {
  email?: string
  username?: string | null
  avatar?: File
  password?: string
  password_confirmation?: string
  opt_in_marketing?: boolean
}
export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateUserResponse,
    QueryError<{ errors: Record<keyof UpdateUserParameters, string[]> }>,
    UpdateUserParameters
  >(
    ["users", "udate"],
    (payload) => {
      debug("user updating:")
      debug({ payload })

      const formData = new FormData()
      forEach(
        payload,
        (value, key) => !isNil(value) && formData.append(`user[${key}]`, mapFormDataValue(value))
      )
      return axios.patch("/users", formData).then(({ data }) => data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users", "whoami"])
        queryClient.invalidateQueries("posts")
      }
    }
  )
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, QueryError, unknown>(
    ["users", "delete"],
    () => axios.delete("/users").then(({ data }) => data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users")
        queryClient.invalidateQueries("posts")
      }
    }
  )
}

export const useSignOut = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, QueryError, unknown>(
    ["users", "signOut"],
    () => axios.delete("/users/sign_out").then(({ data }) => data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users")
        queryClient.invalidateQueries("posts")
      }
    }
  )
}
