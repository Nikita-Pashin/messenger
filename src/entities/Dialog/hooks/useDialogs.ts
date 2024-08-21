import { ApiGetChats } from "@/app/api/chats/route";
import { useQuery } from "@tanstack/react-query";

const getData = (): Promise<ApiGetChats> => {
  return fetch('/api/chats/', {
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
    queryKey: ['chats'],
    queryFn: getData,
    enabled: isEnabled,
    refetchInterval: 1000,
  });

  return query;
};
