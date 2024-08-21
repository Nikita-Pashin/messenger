import { useMutation } from "@tanstack/react-query";

interface Body {
  text: string,
  chatId: number,
}

const postData = (body: Body) => {
  return fetch(`/api/messages/`, {
    headers: {
      token: localStorage.getItem('token') || '',
    },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
}

export const useSendMessages = () => {
  const mutation = useMutation({
    mutationFn: (body: Body) => postData(body),
  });

  return mutation;
}