import { useQuery } from '@tanstack/react-query';
import { BranchInfo } from '../Kanban';

const toJson = (response: Response) => {
  if (!response.ok) {
    console.error('Network Error encountered', response);
    throw new Error('Network Error, fetch response failed.');
  }

  return response.json();
}

const isValidRepoApiUrl = (url: string) =>
  url.startsWith('https://api.github.com/repos');

export const useRepoInfo = (url: string) => {
  let apiUrl = url;
  if (!isValidRepoApiUrl(url) && url.includes('github.com/')) {
    apiUrl = url.replace('github.com/', 'api.github.com/repos/');
  }

  return useQuery({
    queryKey: ['repoData', apiUrl],
    queryFn: () => {
      if (!isValidRepoApiUrl(apiUrl)) {
        throw new Error('Invaild URL given');
      }

      return fetch(apiUrl).then(toJson);
    },
    retry: false,
    enabled: !!url
  });
}

export const useBranchInfo = (baseRepoApiUrl: string) => {
  const branchApiUrl = baseRepoApiUrl.length === 0
    ? ''
    : baseRepoApiUrl + "/branches?per_page=100";

  return useQuery({
    queryKey: ['branches', branchApiUrl],
    queryFn: () => fetch(branchApiUrl).then<BranchInfo[]>(toJson),
    enabled: !!branchApiUrl
  });
}

