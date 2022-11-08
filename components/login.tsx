import React, { FC } from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';

const Login: FC = () => {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <>
      <div className='block'>
        <p
          className={`${
            !session && loading ? '' : 'relative top-0 opacity-100 overflow-hidden rounded p-3 m-0 bg-gray-100 transition-all duration-700 ease-in'
          }`}
        >
          {!session && (
            <>
              <span className='absolute z-10 pt-3 left-4 right-24 whitespace-nowrap text-ellipsis overflow-hidden leading-5'>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className='float-right -mr-2 font-medium rounded cursor-pointer text-base leading-6 relative z-10 bg-transparent bg-blue-600 border-blue-600 text-white no-underline p-3'
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              <a
                href={`/api/auth/signout`}
                className='float-right -mr-2 font-medium rounded cursor-pointer text-base leading-6 relative z-10 bg-transparent bg-blue-600 border-blue-600 text-white no-underline p-3'
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
              <span className='float-right mr-2'>
                <small>Signed in</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
            </>
          )}
        </p>
      </div>
    </>
  )
}

export default Login;