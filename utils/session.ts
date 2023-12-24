//funcao que retorna o valor do session

import { getSession } from 'next-auth/react'

export const useSession = () => {
  const session = getSession()
  return session
}
