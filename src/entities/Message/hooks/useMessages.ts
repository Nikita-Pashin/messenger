import { ApiGetChat } from "@/app/api/chats/[chatId]/route";
import { ApiGetChats } from "@/app/api/chats/route";
import { useQuery } from "@tanstack/react-query";

const getData = (chatId: string): Promise<ApiGetChat> => {
  return fetch(`/api/chats/${chatId}`, {
    headers: {
      token: localStorage.getItem('token') || '',
    },
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
    queryKey: ['chat'],
    queryFn: () => getData(chatId),
    enabled: isEnabled,
    refetchInterval: 1000,
  });

  return query;
};
