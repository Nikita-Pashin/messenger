import type { ApiGetChat } from "@/app/api/chats/[chatId]/route";
import { useQuery } from "@tanstack/react-query";

const getData = (chatId: string): Promise<ApiGetChat> => {
  return fetch(`/api/chats/${chatId}`, {
    headers: {
      token: localStorage.getItem('token') || '',
    },
    credentials: 'include',
  })
    .then((response) => {
      return response.json();
    })
}

type useMessagesParams = {
  chatId: string;
  isEnabled?: boolean,
};

export const useMessages = (args: useMessagesParams) => {
  const {
    chatId,
    isEnabled = true,
  } = args;

  const query = useQuery({
    initialData: null,
    queryKey: ['chat'],
    queryFn: () => getData(chatId),
    enabled: isEnabled,
    refetchInterval: 1000,
  });

  return query;
};
