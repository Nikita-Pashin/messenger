import { makeRequest } from "@/shared/api/makeRequest";
import { useQuery } from "@tanstack/react-query";

type useProfileParams = {
  isEnabled?: boolean;
};

interface Response {
  id: number;
  fullname: string;
  avatarEmoji: string;
  login: string;
}

const getData = () => makeRequest<Response>({
  url: '/api/profile',
  withcCredentials: true,
});

export const useProfile = (args?: useProfileParams) => {
  const {
    isEnabled = true,
  } = args || {};

  return useQuery({
    queryKey: ['profile'],
    queryFn: getData,
    enabled: isEnabled,
  });
};
