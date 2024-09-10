import type { GetUsersApi } from "@/app/api/users/route";
import { makeRequest } from "@/shared/api/makeRequest";
import { useQuery } from "@tanstack/react-query";

const queryFn = () => makeRequest<GetUsersApi>({
  url: 'api/users',
  method: 'GET',
});

export const useUsers = () => useQuery({
  queryKey: ['users'],
  queryFn,
});
