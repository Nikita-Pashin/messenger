import { makeRequest } from "@/shared/api/makeRequest";
import { useMutation } from "@tanstack/react-query";

type Body = {
  text: string;
  chatId: number;
} | {
  text: string;
  toUserId: number;
}

const postData = (body: Body) => makeRequest({
  url: '/api/messages/',
  body,
  method: 'POST',
});

export const useSendMessages = () => {
  const mutation = useMutation({
    mutationFn: postData,
  });

  return mutation;
}