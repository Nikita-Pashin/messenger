import { makeRequest } from "@/shared/api/makeRequest";
import { useMutation } from "@tanstack/react-query";

const mutationFn = (body: { id: number }) => makeRequest({
  url: '/api/messageRead',
  body,
  method: 'POST',
});

export const useReadMessage = () => useMutation({
  mutationFn,
})