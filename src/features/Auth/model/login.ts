import { makeRequest } from "@/shared/api/makeRequest";
import { useMutation } from "@tanstack/react-query"

interface LoginBody {
  login: string;
  password: string;
}

const mutationFn = (body: LoginBody) => makeRequest({
  url: 'api/auth/login',
  body,
  method: 'POST',
});

export const login = () => useMutation({
  mutationFn,
});