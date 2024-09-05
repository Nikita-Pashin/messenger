import { makeRequest } from "@/shared/api/makeRequest";
import { useMutation } from "@tanstack/react-query";

interface Body {
  text: string,
  chatId: number,
}

const postData = (body: Body) => makeRequest({
  url: '/api/messages/',
  body,
  method: 'POST',
});

export const useSendMessages = () => {
  const mutation = useMutation({
    mutationFn: (body: Body) => postData(body),
  });

  return mutation;
}