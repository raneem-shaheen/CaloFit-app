/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'

const ApiContext = createContext({ baseUrl: '' })

export function ApiProvider({ children, baseUrl = '' }) {
  return <ApiContext.Provider value={{ baseUrl }}>{children}</ApiContext.Provider>
}

export const useApi = () => useContext(ApiContext)
