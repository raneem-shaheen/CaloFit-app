import { useSearchParams } from 'react-router-dom'

export function useTableState(namespace = 'table') {
  const [params, setParams] = useSearchParams()
  const key = (name) => `${namespace}.${name}`
  const state = { page: Number(params.get(key('page')) || 1), pageSize: Number(params.get(key('pageSize')) || 10), search: params.get(key('search')) || '', sort: params.get(key('sort')) || '' }
  const update = (next) => setParams((current) => { Object.entries(next).forEach(([name, value]) => current.set(key(name), String(value))); return current })
  return [state, update]
}
