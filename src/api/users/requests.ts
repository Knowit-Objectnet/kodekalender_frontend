import axios from "axios"
import { forEach, isBoolean, isNil } from "lodash-es"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"

import { LoggedInWhoami, Whoami } from ".."
import { QueryError } from "../../axios"
import { EmptyObject } from "../../../types/utils_types"
import { debug } from "../../utils"

const getWhoami = () => axios.get("/users/whoami").then(({ data }) => data)
export const useWhoami = () =>
  useQuery<Whoami, QueryError>({
    queryKey: ["users", "whoami"],
    queryFn: getWhoami,
    staleTime: Infinity
  })

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
  >({
    mutationKey: ["users", "signUp"],
    mutationFn: (payload) => {
      const formData = new FormData()
      forEach(
        payload,
        (value, key) => !isNil(value) && formData.append(`user[${key}]`, mapFormDataValue(value))
      )
      return axios.post("/users", formData).then(({ data }) => data)
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Whoami>(["users", "whoami"], data)
    }
  })
}

type SignInResponse = LoggedInWhoami
export type SignInParameters = {
  email: string
  password: string
}
export const useSignIn = () => {
  const queryClient = useQueryClient()

  return useMutation<SignInResponse, QueryError<{ error: string }>, SignInParameters>({
    mutationKey: ["users", "signIn"],
    mutationFn: (payload) =>
      axios.post("/users/sign_in", { user: payload }).then(({ data }) => data),

    onSuccess: (data) => {
      queryClient.setQueryData<Whoami>(["users", "whoami"], data)
    }
  })
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
  >({
    mutationKey: ["users", "initiateResetPassword"],
    mutationFn: (payload) =>
      axios.post("/users/password", { user: payload }).then(({ data }) => data)
  })

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
  >({
    mutationKey: ["users", "resetPassword"],
    mutationFn: (payload) =>
      axios.put("/users/password", { user: payload }).then(({ data }) => data)
  })

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
  >({
    mutationKey: ["users", "udate"],
    mutationFn: (payload) => {
      debug("user updating:")
      debug({ payload })

      const formData = new FormData()
      forEach(
        payload,
        (value, key) => !isNil(value) && formData.append(`user[${key}]`, mapFormDataValue(value))
      )
      return axios.patch("/users", formData).then(({ data }) => data)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "whoami"] })
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, QueryError, unknown>({
    mutationKey: ["users", "delete"],
    mutationFn: () => axios.delete("/users").then(({ data }) => data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }
  })
}

export const useSignOut = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, QueryError, unknown>({
    mutationKey: ["users", "signOut"],
    mutationFn: () => axios.delete("/users/sign_out").then(({ data }) => data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }
  })
}
