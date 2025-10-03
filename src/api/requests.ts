import axios from "axios"
import { useCallback, useContext } from "react"
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query"
import {
  clone,
  findIndex,
  fromPairs,
  isEmpty,
  isNil,
  keyBy,
  padStart,
  property,
  toString
} from "lodash-es"

import { QueryError } from "../axios"
import { AuthContext } from "../AuthContext"
import { getActiveYear, isPresent } from "../utils"
import { Maybe } from "../../types/utils_types"

import { ServiceMessage } from "./ServiceMessage"

import {
  ChallengeDict,
  Leaderboard,
  Like,
  ParentPost,
  Post,
  PostPreview,
  SolvedStatus,
  Subscriptions
} from "."

export const challengeIdParam = (door: number) =>
  `${getActiveYear()}-${padStart(toString(door), 2, "0")}`

// QUERIES ---------------------------------------------------------------------

const getLikes = () => axios.get("/likes").then(({ data }) => data)
export const useLikes = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return useQuery<Like[], QueryError>({
    queryKey: ["users", "likes"],
    queryFn: getLikes,
    staleTime: 600_000,
    enabled: isAuthenticated
  })
}
export const usePrefetchLikes = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useCallback(
    () =>
      isAuthenticated &&
      queryClient.prefetchQuery({ queryKey: ["likes"], queryFn: getLikes, staleTime: 30_000 }),
    [queryClient, isAuthenticated]
  )
}

const getChallenges = () => axios.get("/challenges").then(({ data }) => keyBy(data, "door"))
export const useChallenges = () =>
  useQuery<ChallengeDict, QueryError>({
    queryKey: ["challenges"],
    queryFn: getChallenges,
    staleTime: 600_000
  })
export const useChallenge = (door: Maybe<number>) =>
  useQuery<ChallengeDict, QueryError, ChallengeDict[number]>({
    queryKey: ["challenges"],
    queryFn: getChallenges,
    staleTime: 600_000,
    select: property(door!),
    enabled: isPresent(door)
  })

const getSolvedStatus = (): Promise<SolvedStatus> =>
  axios.get("/users/solved").then(({ data: { solved_status } }) => fromPairs(solved_status))
export const useSolvedStatus = (opts?: UseQueryOptions<SolvedStatus, QueryError>) => {
  const { isAuthenticated } = useContext(AuthContext)
  const enabled = isAuthenticated && opts?.enabled !== false

  return useQuery<SolvedStatus, QueryError>({
    queryKey: ["users", "solved"],
    queryFn: getSolvedStatus,
    staleTime: 600_000,
    ...opts,
    enabled
  })
}

const getPosts = (door: number) =>
  axios.get(`/challenges/${challengeIdParam(door)}/posts`).then(({ data }) => data)
export const usePosts = (door: number) => {
  const { isAuthenticated } = useContext(AuthContext)

  return useQuery<ParentPost[], QueryError>({
    queryKey: ["posts", door],
    queryFn: () => getPosts(door),
    refetchInterval: 300_000,
    enabled: isAuthenticated
  })
}
export const usePrefetchPosts = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useCallback(
    (door: number) =>
      isAuthenticated &&
      queryClient.prefetchQuery({
        queryKey: ["posts", door],
        queryFn: () => getPosts(door),
        staleTime: 30_000
      }),
    [queryClient, isAuthenticated]
  )
}

const getLeaderboard = () => axios.get("/leaderboard").then(({ data }) => data)
export const useLeaderboard = () =>
  useQuery<Leaderboard, QueryError>({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
    staleTime: 300_000,
    refetchInterval: 300_000
  })
export const usePrefetchLeaderboard = () => {
  const queryClient = useQueryClient()
  return useCallback(
    () => queryClient.prefetchQuery({ queryKey: ["leaderboard"], queryFn: getLeaderboard }),
    [queryClient]
  )
}

const getSubscriptions = () => axios.get("/subscriptions").then(({ data }) => data)
export const useSubscriptions = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return useQuery<Subscriptions, QueryError>({
    queryKey: ["users", "subscriptions"],
    queryFn: getSubscriptions,
    staleTime: 600_000,
    enabled: isAuthenticated
  })
}

const getServiceMessages = () => axios.get("/service_messages").then(({ data }) => data)
export const useServiceMessages = <TSelected = ServiceMessage[]>(
  options?: UseQueryOptions<ServiceMessage[], QueryError, TSelected>
) =>
  useQuery<ServiceMessage[], QueryError, TSelected>({
    queryKey: ["serviceMessages"],
    queryFn: getServiceMessages,
    ...options,
    staleTime: 60_000,
    refetchInterval: 60_000
  })

const getPostMarkdown = (post_uuid: string) =>
  axios.get("/markdown", { params: { post_uuid } }).then(({ data: { markdown } }) => markdown)
export const usePostMarkdown = (post_uuid: string, options?: UseQueryOptions<string, QueryError>) =>
  useQuery<string, QueryError>({
    queryKey: ["posts", "markdown", post_uuid],
    queryFn: () => getPostMarkdown(post_uuid),
    ...options,
    staleTime: 600_000
  })
export const usePrefetchPostMarkdown = () => {
  const queryClient = useQueryClient()
  return useCallback(
    (post_uuid: string) =>
      queryClient.prefetchQuery({
        queryKey: ["posts", "markdown", post_uuid],
        queryFn: () => getPostMarkdown(post_uuid)
      }),
    [queryClient]
  )
}

export const getPostPreview = async (markdownContent: string | undefined | null) => {
  if (isEmpty(markdownContent)) return

  return await axios
    .post("/markdown", { markdown_content: markdownContent })
    .then(({ data }) => data)
}
export const usePostPreview = (markdownContent: string | null | undefined) =>
  useQuery<PostPreview, QueryError>({
    queryKey: ["postPreview", markdownContent],
    queryFn: () => getPostPreview(markdownContent),
    staleTime: 600_000
  })

// MUTATIONS -------------------------------------------------------------------

export type CreateSolutionResponse = { solved: boolean }
export type CreateSolutionParameters = { door: number; answer: string }
export const useCreateSolution = () => {
  const queryClient = useQueryClient()

  return useMutation<CreateSolutionResponse, QueryError, CreateSolutionParameters>({
    mutationKey: ["solutions", "createSolution"],
    mutationFn: ({ door, answer }) =>
      axios
        .post(`/challenges/${challengeIdParam(door)}/solutions`, { solution: { answer } })
        .then(({ data }) => data),

    onSuccess: async ({ solved }, { door }) => {
      if (solved) {
        queryClient.setQueryData(["users", "solved"], (solvedStatus: SolvedStatus | undefined) => ({
          ...solvedStatus,
          [door]: true
        }))
        queryClient.invalidateQueries({ queryKey: ["users", "solved"] })
      }
    }
  })
}

export type CreateLikeParameters = { postUuid: string }
export const useCreateLike = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, CreateLikeParameters>({
    mutationKey: ["likes", "createLike"],
    mutationFn: ({ postUuid }) => axios.post(`/posts/${postUuid}/likes`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "likes"] })
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }
  })
}

export type DeleteLikeParameters = { uuid: string }
export const useDeleteLike = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, DeleteLikeParameters>({
    mutationKey: ["likes", "deleteLike"],
    mutationFn: ({ uuid }) => axios.delete(`/likes/${uuid}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "likes"] })
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }
  })
}

// Replace top-level or child post in its respective index in the given posts.
// Returns a new array with elements replaced.
const replacePost = (posts: ParentPost[] = [], post: Post) => {
  const newPosts = clone(posts)
  let replacementIdx: number
  let replacementPost: ParentPost

  if (post.parent_uuid === null) {
    // Parent post; replace at top level
    const idx = findIndex(posts, { uuid: post.uuid })

    replacementIdx = idx
    replacementPost = post
  } else {
    // Child post; replace in parent children then replace parent
    const parentIdx = findIndex(posts, { uuid: post.parent_uuid })
    if (parentIdx === -1) return posts
    const parent = posts[parentIdx]

    const childIdx = findIndex(parent.children, { uuid: post.uuid })

    const newChildren = clone(parent.children)
    if (childIdx === -1) newChildren.push(post)
    else newChildren.splice(childIdx, 1, post)

    replacementIdx = parentIdx
    replacementPost = { ...parent, children: newChildren }
  }

  // Mutation
  if (replacementIdx === -1) newPosts.push(replacementPost)
  else newPosts.splice(replacementIdx, 1, replacementPost)

  return newPosts
}

export type CreatePostParameters = { door: number; content: string; parent?: ParentPost }
export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation<Post, QueryError, CreatePostParameters>({
    mutationKey: ["posts", "createPost"],
    mutationFn: ({ door, content, parent }) =>
      axios
        .post(`/challenges/${challengeIdParam(door)}/posts`, {
          post: { content, parent_uuid: parent?.uuid }
        })
        .then(({ data }) => data),
    onSuccess: (post) => {
      // Insert created post back into posts list, then refetch to ensure up-to-date data
      queryClient.setQueryData<ParentPost[]>(["posts", post.door], (posts) =>
        replacePost(posts, post)
      )
      queryClient.invalidateQueries({ queryKey: ["posts", post.door] })
    }
  })
}

export type DeletePostParameters = { post: Post }
export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, DeletePostParameters>({
    mutationKey: ["posts", "deletePost"],
    mutationFn: ({ post }) => axios.delete(`/posts/${post.uuid}`),

    onSettled: (_data, _err, { post }) =>
      queryClient.invalidateQueries({ queryKey: ["posts", post.door] })
  })
}

export type UpdatePostParameters = { post: Post; content: string; html?: string }
export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation<Post, QueryError, UpdatePostParameters>({
    mutationKey: ["posts", "updatePost"],
    mutationFn: ({ post, content }) => axios.put(`/posts/${post.uuid}`, { post: { content } }),

    onMutate: async ({ post, html }) => {
      await queryClient.cancelQueries({ queryKey: ["posts", post.door] })
      const posts = queryClient.getQueryData<ParentPost[]>(["posts", post.door])

      if (!posts || isNil(html)) return posts

      queryClient.setQueryData<ParentPost[]>(
        ["posts", post.door],
        replacePost(posts, { ...post, content: html })
      )

      return posts
    },
    onError: (_err, { post }, posts) => {
      if (posts) queryClient.setQueryData(["posts", post.door], posts)
    },
    onSuccess: (post) => {
      queryClient.setQueryData<ParentPost[]>(["posts", post.door], (posts) =>
        replacePost(posts, post)
      )
    },
    onSettled: (_data, _err, { post }) => {
      queryClient.invalidateQueries({ queryKey: ["posts", post.door] })
      queryClient.invalidateQueries({ queryKey: ["posts", "markdown", post.uuid] })
    }
  })
}

export type CreateSubscriptionParameters = { door: number } | { postUuid: string }
export const useCreateSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, CreateSubscriptionParameters, Subscriptions>({
    mutationKey: ["subscriptions", "createSubscription"],
    mutationFn: (data) => axios.post("/subscriptions", data),

    onMutate: async (subscription) => {
      await queryClient.cancelQueries({ queryKey: ["users", "subscriptions"] })
      const subscriptions = queryClient.getQueryData<Subscriptions>(["users", "subscriptions"])

      queryClient.setQueryData<Subscriptions>(["users", "subscriptions"], () => [
        ...(subscriptions ?? []),
        { ...subscription, uuid: "" }
      ])

      return subscriptions ?? []
    },
    onError: (_err, _vars, subscriptions) => {
      if (subscriptions) queryClient.setQueryData(["users", "subscriptions"], subscriptions)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "subscriptions"] })
    }
  })
}

export type DeleteSubscriptionParameters = { uuid: string }
export const useDeleteSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, DeleteSubscriptionParameters, Subscriptions>({
    mutationKey: ["subscriptions", "deleteSubscription"],
    mutationFn: ({ uuid }) => axios.delete(`/subscriptions/${uuid}`),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "subscriptions"] })
    }
  })
}
