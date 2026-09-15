/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'

const ExamplePage = lazy(() => import('../../features/example/ExamplePage'))

export const routes = [{ path: '/', element: <ExamplePage /> }]

export function LazyPage({ children }) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
}
