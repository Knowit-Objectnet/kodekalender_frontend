import { QueryObserverOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosRequestConfig } from "axios"
import { isEmpty, isNumber, keyBy, pick, property } from "lodash-es"

import { QueryError } from "../../axios"
import { ParentPost } from "../Post"
import { ServiceMessage } from "../ServiceMessage"
import { challengeIdParam } from "../requests"

import { AdminChallengeDict, AdminChallengePayload, ChallengePreview } from "./Challenge"
import { AdminServiceMessagePayload } from "./ServiceMessage"

const getChallenges = async () =>
  await axios.get("/admin/challenges").then(({ data }) => keyBy(data, "door"))
type ChallengesOptions<TSelected> = Omit<
  QueryObserverOptions<AdminChallengeDict, QueryError, TSelected>,
  "queryKey" | "queryFn"
>
export const useChallenges = <TSelected = AdminChallengeDict>(
  options?: ChallengesOptions<TSelected>
) =>
  useQuery<AdminChallengeDict, QueryError, TSelected>({
    queryKey: ["admin", "challenges"],
    queryFn: getChallenges,
    staleTime: 600_000,
    ...options
  })
export const useChallenge = (door: number | null | undefined) =>
  useQuery<AdminChallengeDict, QueryError, AdminChallengeDict[number]>({
    queryKey: ["admin", "challenges"],
    queryFn: getChallenges,
    staleTime: 600_000,
    select: door ? property(door) : undefined
  })

const getPosts = (door: number) =>
  axios.get(`/admin/challenges/${challengeIdParam(door)}/posts`).then(({ data }) => data)
export const usePosts = (door: number) =>
  useQuery<ParentPost[], QueryError>({
    queryKey: ["admin", "posts", door],
    queryFn: () => getPosts(door),
    staleTime: 300_000
  })

export const getChallengePreview = async (challenge: AdminChallengePayload | undefined) => {
  challenge = pick(challenge, ["markdown_content", "files"])
  if (isEmpty(challenge)) return

  return await axios.post("/admin/challenge_markdown", { challenge }).then(({ data }) => data)
}
type ChallengePreviewOptions = Omit<
  QueryObserverOptions<ChallengePreview, QueryError>,
  "queryKey" | "queryFn"
>

export const useChallengePreview = (
  challenge: AdminChallengePayload | undefined,
  opts?: ChallengePreviewOptions
) => {
  return useQuery<ChallengePreview, QueryError>({
    queryKey: ["admin", "challenges", "preview", challenge],
    queryFn: () => getChallengePreview(challenge),
    staleTime: Infinity,
    ...opts
  })
}
export type CreateChallengeParameters = { challenge: AdminChallengePayload }
export const useCreateChallenge = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, CreateChallengeParameters>({
    mutationKey: ["admin", "challenges", "create"],
    mutationFn: ({ challenge }) => axios.post("/admin/challenges", { challenge }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] })
      queryClient.invalidateQueries({ queryKey: ["admin", "challenges"] })
    }
  })
}

export type UpdateChallengeParameters = { challenge: AdminChallengePayload }
export const useUpdateChallenge = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, UpdateChallengeParameters>({
    mutationKey: ["admin", "challenges", "update"],
    mutationFn: ({ challenge }) =>
      axios.patch(`/admin/challenges/${challengeIdParam(challenge.door)}`, { challenge }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] })
      queryClient.invalidateQueries({ queryKey: ["admin", "challenges"] })
    }
  })
}

export type DeleteChallengeParameters = { door: number | undefined }
export const useDeleteChallenge = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, QueryError, DeleteChallengeParameters>({
    mutationKey: ["admin", "challenges", "destroy"],
    mutationFn: async ({ door }) =>
      isNumber(door) && axios.delete(`/admin/challenges/${challengeIdParam(door)}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] })
      queryClient.invalidateQueries({ queryKey: ["admin", "challenges"] })
    }
  })
}

export type CreateServiceMessageParameters = { service_message: AdminServiceMessagePayload }
export const useCreateServiceMessage = () => {
  const queryClient = useQueryClient()

  return useMutation<ServiceMessage, QueryError, CreateServiceMessageParameters>({
    mutationKey: ["admin", "serviceMessages", "create"],
    mutationFn: (data) => axios.post("/admin/service_messages", data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceMessages"] })
    }
  })
}

export type UpdateServiceMessageParameters = {
  uuid: string
  service_message: AdminServiceMessagePayload
}
export const useUpdateServiceMessage = () => {
  const queryClient = useQueryClient()

  return useMutation<ServiceMessage, QueryError, UpdateServiceMessageParameters>({
    mutationKey: ["admin", "serviceMessages", "update"],
    mutationFn: ({ uuid, ...data }) => axios.patch(`/admin/service_messages/${uuid}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceMessages"] })
    }
  })
}

export type DeleteServiceMessageParameters = { uuid: string }
export const useDeleteServiceMessage = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, DeleteServiceMessageParameters>({
    mutationKey: ["admin", "serviceMessages", "delete"],
    mutationFn: ({ uuid }) => axios.delete(`/admin/service_messages/${uuid}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceMessages"] })
    }
  })
}

// File upload procedure copied from https://github.com/rails/rails/issues/32208#issuecomment-383737803
type CreateBlobPayload = {
  filename: string
  content_type: string
  byte_size: number
  checksum: string
}

type CreateBlobResponse = {
  // Signed ID of the blob stored in ActiveStorage. We need this to submit with the challenge data.
  signed_id: string

  // URL and headers for direct upload of file
  direct_upload: {
    url: string
    headers: any
  }
}

export const useCreateBlob = () =>
  useMutation<
    CreateBlobResponse,
    unknown,
    { blob: CreateBlobPayload; config?: AxiosRequestConfig }
  >({
    mutationKey: ["admin", "activeStorage", "createBlob"],
    mutationFn: ({ blob, config }) =>
      axios.post("/rails/active_storage/direct_uploads", { blob }, config).then(({ data }) => data)
  })

type UploadFilePayload = {
  file: File
  directUpload: CreateBlobResponse["direct_upload"]
}

export const useUploadFile = () =>
  useMutation<never, unknown, { upload: UploadFilePayload; config?: AxiosRequestConfig }>({
    mutationKey: ["admin", "activeStorage", "uploadFile"],
    mutationFn: ({ upload: { file, directUpload }, config }) =>
      axios.put(directUpload.url, file, { ...config, headers: directUpload.headers })
  })
