import { useQuery } from "@tanstack/react-query";
import { MessagesGetRouteReturnType } from "@/app/api/messages/route";

const getData = (): Promise<MessagesGetRouteReturnType> => {
  return fetch('/api/chats', {
    headers: {
      token: localStorage.getItem('token') || '',
    },
  })
    .then((response) => {
      return response.json();
    })
}

type useDialogsParams = {
  isEnabled?: boolean;
};

export const useDialogs = (args?: useDialogsParams) => {
  const {
    isEnabled = true,
  } = args || {};

  const query = useQuery({
    initialData: [],
    queryKey: ['dialog'],
    queryFn: getData,
    enabled: isEnabled,
  });

  return query;
};
