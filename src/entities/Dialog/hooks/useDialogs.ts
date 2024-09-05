import { ApiGetChats } from "@/app/api/chats/route";
import { makeRequest } from "@/shared/api/makeRequest";
import { useQuery } from "@tanstack/react-query";

type useDialogsParams = {
  isEnabled?: boolean;
};

const getData = (): Promise<ApiGetChats> => makeRequest<ApiGetChats>({
  url: '/api/chats',
  withcCredentials: true,
});

export const useDialogs = (args?: useDialogsParams) => {
  const {
    isEnabled = true,
  } = args || {};

  return useQuery({
    queryKey: ['chats'],
    queryFn: getData,
    enabled: isEnabled,
    refetchInterval: 1000,
  });
};
