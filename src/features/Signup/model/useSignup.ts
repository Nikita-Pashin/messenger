import { makeRequest } from "@/shared/api/makeRequest";
import { useMutation } from "@tanstack/react-query"

interface SignupBody {
  login: string;
  password: string;
  fullname: string;
}

const mutationFn = (body: SignupBody) => makeRequest({
  url: '/api/auth/signup',
  body,
  method: 'POST',
});

export const useSignup = () => useMutation({
  mutationFn,
});