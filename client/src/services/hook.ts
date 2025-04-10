import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from "@/services/Store"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, generateTest, getAllResults, getResult, isAuth, login, logout, signup, submitResult, updateUser, user } from "./api"

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string, password: string }) => login(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })

    }
  })
}
export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: isAuth,
    staleTime: 1000 * 60 * 5,
    retry: false,

  });
}
export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ username, email, password }: { username: string, email: string, password: string }) => signup(username, email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    }
  });
}
export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["auth"], null)
    },
  });
}
// user hooks
export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: user,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
};
export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ username, email, password }: { username: string; email: string; password: string }) =>
      updateUser(username, email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })

    }
  });
};
export const useDelete = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
}
export const useTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ length }: { length: number }) => generateTest(length),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['test'] })
  });
}
export const useSubmit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ wpm, accuracy, testId, timeTaken }: { wpm: number, accuracy: number, testId: string, timeTaken: number }) => submitResult(wpm, accuracy, testId, timeTaken),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['results'] })
  });
}
export const useResult = (id: string) => {
  return useQuery({
    queryKey: ["results", id],
    queryFn: () => getResult(id),
    staleTime: 10 * 1000,
    enabled: !!id,
  });
}
export const useAllResults = () => {
  return useQuery({
    queryKey: ["results"],
    queryFn: getAllResults,
    staleTime: 10 * 1000,
  });
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()