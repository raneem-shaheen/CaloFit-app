export function RouteGuard({ children, allowed = true }) {
  return allowed ? children : null
}
