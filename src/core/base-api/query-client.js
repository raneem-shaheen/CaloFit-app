// The shared React Query client belongs here when the dependency is installed.
export const queryClientOptions = {
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
}
