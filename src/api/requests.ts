import { useEffect, useCallback, useState } from 'react';
import Axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';

import Comment from './Comment';
import Like from './Like';
import Challenge, { SolvedStatus } from './Challenge';
import { CreateSolutionPayload, CreateSolutionResponse } from './Solution';
import Leaderboard from './Leaderboard';

const apiUrl = 'https://***REMOVED***';
const requestHeaders = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
const getHeaders = (token: Token) => (
  token ? { ...requestHeaders, "Authorization": token } : requestHeaders
)

type Token = string | undefined;

// TODO: Type endpoint with template string type?
const baseFetch = <T>(endpoint: string, token: Token = undefined) => {
  return Axios.get<T>(`${apiUrl}${endpoint}`, { headers: getHeaders(token) })
};

type CreatePayload = CreateSolutionPayload;

const baseCreate = <T>(endpoint: string, payload: CreatePayload, token: Token) => {
  return Axios.post<T>(`${apiUrl}${endpoint}`, payload, { headers: getHeaders(token) })
};

const fetchLikes = (token: Token) => () => (
  baseFetch<Like[]>('/likes', token)
);

const fetchChallenge = (token: Token) => (doorNumber: number | string) => (
  baseFetch<Challenge>(`/challenges/${doorNumber}`, token)
);

const fetchSolvedStatus = (token: Token) => () => (
  baseFetch<SolvedStatus>('/challenges/solved', token)
);

const createSolution = (token: Token) => (challenge_door: number | string, answer: string) => (
  baseCreate<CreateSolutionResponse>(`/challenges/${challenge_door}/solutions`, { "solution": { "answer": answer } }, token)
);

const fetchComments = (token: Token) => (doorNumber: number | string) => (
  baseFetch<Comment[]>(`/challenges/${doorNumber}/posts`, token)
);

const fetchLeaderboard = () => (
  baseFetch<Leaderboard>('/leaderboard')
);

// await getAccessTokenSilently({
//   audience: 'https://knowit-konkurranser.eu.auth0.com/api/v2/',
//   scope: 'read:current_user update:current_user_metadata'
// });
export const useRequests = () => {
  const { isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [token, setToken] = useState<string>();


  useEffect(() => {
    const getToken = async () => {
      if (!isAuthenticated) return;

      await getAccessTokenSilently({ user_audience: '6TmycgoSWgFT8EU6COixHKne9JmLx5F4' });
      // getIdTokenClaims uses access token from surrounding context.
      const claims = await getIdTokenClaims();
      setToken(claims.__raw); // TODO: This is probably not ideal. Consider fixing.
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims]);

  return {
    isAuthenticated: isAuthenticated && token,
    fetchLikes: useCallback(fetchLikes(token), [token]),
    fetchChallenge: useCallback(fetchChallenge(token), [token]),
    fetchSolvedStatus: useCallback(fetchSolvedStatus(token), [token]),
    createSolution: useCallback(createSolution(token), [token]),
    fetchComments: useCallback(fetchComments(token), [token]),
    fetchLeaderboard,
  };
}
