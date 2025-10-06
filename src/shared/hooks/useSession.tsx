import { useRouter } from 'expo-router'
import { createContext, use, type PropsWithChildren, useMemo, useState } from 'react'
import { useStorageState } from './useStorageState'

export type Session = {
  user_id: number,
  username: string
}

export type SessionStatus = "loading" | "authenticated" | "unauthenticated"

export type UpdateSession = ( data?: any ) => Promise<Session | null>

export type SessionContextValue<R extends boolean | undefined = undefined> = {
  update: UpdateSession
} & (
    R extends true
    ? { data: Session; status: "authenticated" }
    | { data: null; status: "loading" }
    : R extends false
    ? { data: Session, status: "unauthenticated" }
    | { data: null; status: "loading" }
    : { data: Session, status: "authenticated" }
    | { data: null, status: "unauthenticated" | "loading" }
  )

export const SessionContext = createContext<SessionContextValue | undefined>( undefined )

export interface UseSessionOptions<R extends boolean | undefined> {
  authenticated: R
  onUnauthenticated?: () => void
  onAuthenticated?: () => void
}

export function useSession<R extends boolean | undefined>(
  options?: UseSessionOptions<R>,
): SessionContextValue<R> {
  const router = useRouter()
  const value = use( SessionContext )

  if ( !value ) {
    throw new Error(
      "[auth]: `useSession` must be wrapped in a <SessionProvider />",
    )
  }

  const { authenticated, onUnauthenticated, onAuthenticated } = options ?? {}

  const notrequiredAndNotLoading =
    authenticated === false && value.status === "authenticated"

  const requiredAndNotLoading =
    authenticated === true && value.status === "unauthenticated"

  if ( requiredAndNotLoading ) {
    if ( onUnauthenticated ) onUnauthenticated()
    else router.replace( "/onboarding" )
  }
  if ( notrequiredAndNotLoading ) {
    if ( onAuthenticated ) onAuthenticated()
    // do nothing if authorized
  }

  return value as SessionContextValue<R>
}

const SessionProvider = ( props: PropsWithChildren ) => {
  const { children } = props

  const [ session, setSession ] = useState<Session | null>( null )

  const [ loading, setLoading ] = useState( true )

  const [ [ isLoading, token ], setToken ] = useStorageState( 'token' )

  useMemo( () => {
    if ( !isLoading ) {
      setLoading( false )
    }
  }, [ isLoading ] )

  /*
  const { mutate } = useSWR( "token", refresh, {
    onSuccess( data ) {
      setToken( data )
      if ( data === null ) {
        setLoading( false )
      }
    },
    refreshInterval: 5 * 60 * 1000,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
  } )

  useSWR( token, get_session, {
    onSuccess( data ) {
      if ( data != session ) {
        setSession( data )
      }
      setLoading( false )
    },
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
  } )
  */

  let value = useMemo( () => ( {
    data: session,
    status: loading
      ? "loading"
      : token
        ? "authenticated"
        : "unauthenticated",
    async update( data: any ) {
      if ( loading ) return
      setLoading( true )
      const newSession: Session = {
        user_id: 1,
        username: "Rakhat"
      }
      setLoading( false )
      if ( newSession ) {
        setSession( newSession )
      }
      return newSession
    }
  } ), [ token, loading ] )

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export default SessionProvider
