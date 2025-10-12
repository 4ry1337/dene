import { useRouter } from 'expo-router'
import { createContext, use, type PropsWithChildren, useMemo, useState, useEffect } from 'react'
import { users } from '@/entities/user/user.schema'
import { drizzle_db } from '@/shared/lib'

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

  // Use useEffect to handle navigation after render
  useEffect( () => {
    if ( requiredAndNotLoading ) {
      if ( onUnauthenticated ) onUnauthenticated()
      else router.replace( "/onboarding" )
    }
    if ( notrequiredAndNotLoading ) {
      if ( onAuthenticated ) onAuthenticated()
      else router.replace( "/(tabs)" )
      // do nothing if authorized
    }
  }, [ notrequiredAndNotLoading, onAuthenticated, onUnauthenticated, requiredAndNotLoading, router ] )
  return value as SessionContextValue<R>
}

const get_session = async (): Promise<Session | null> => {
  const users_db = await drizzle_db
    .select( { id: users.id, username: users.username } )
    .from( users )
    .limit( 1 )

  if ( users_db.length === 0 ) return null

  return {
    user_id: users_db[ 0 ].id,
    username: users_db[ 0 ].username
  }
}

export const SessionProvider = ( props: PropsWithChildren ) => {
  const { children } = props

  const [ session, setSession ] = useState<Session | null>( null )
  const [ loading, setLoading ] = useState( true )

  useEffect( () => {
    const checkLocalUser = async () => {
      try {
        const session = await get_session()
        setSession( session )
      } catch ( error ) {
        console.error( 'Error checking local user:', error )
        setSession( null )
      } finally {
        setLoading( false )
      }
    }
    checkLocalUser()
  }, [] )

  const value = useMemo( () => ( {
    data: session,
    status: loading
      ? "loading"
      : session
        ? "authenticated"
        : "unauthenticated",
    async update( _data: any ) {
      if ( loading ) return
      setLoading( true )
      const newSession = await get_session()
      setLoading( false )
      if ( newSession ) {
        setSession( newSession )
      }
      return newSession
    }
  } ), [ session, loading ] )

  return (
    <SessionContext.Provider value={value as any}>{children}</SessionContext.Provider>
  )
}
