import { theme } from './theme'

export function ThemeProvider({ children }) {
  return <div data-theme={theme.direction}>{children}</div>
}
