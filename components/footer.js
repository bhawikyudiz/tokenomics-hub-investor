import Container from './generic/container'
import { TWITTER, DISCORD, LINKTREE } from '../lib/constants'
// import Feedback from './feedback'
import Link from 'next/link';
import dynamic from 'next/dynamic'

export default function Footer() {

  const Feedback = dynamic(() => import('./feedback'), { loading: () => <p>Loading</p> })

  return (
    <footer className="border-t border-accent-2 bg-accent-1">
      <Container>

        <footer className="p-4 sm:p-6">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <span className="self-center text-2xl font-bold whitespace-nowrap">Tokenomics DAO</span>
              </a>
            </div>
            <Feedback />
          </div>
          <div className='flex gap-6'>
          <div className='flex flex-col'>
            <Link href="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link href="/thub" className="hover:underline">
              Tokenomics Design Framework
            </Link>
            <Link href="/glossary" className="hover:underline">
              Glossary
            </Link>
          </div>
          <div className='flex flex-col'>
            <Link href="/about-us" className="hover:underline">
              About Us
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/newPost" className="hover:underline">
              List a token
            </Link>
          </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 hover:underline">© 2023 <a href="https://tokenomicsdao.xyz/">Tokenomics DAO</a>. All Rights Reserved.
            </span>
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 hover:underline">Tokenomics Hub is still in Beta!
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              <a href={DISCORD} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-7 h-7 fill-dao-red hover:fill-gray-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                </svg>
                <span className="sr-only">Website</span>
              </a>
              <a href={TWITTER} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-7 h-7 fill-dao-red hover:fill-gray-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a href={LINKTREE} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-8 h-8 fill-dao-red hover:fill-gray-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                  <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                </svg>
                <span className="sr-only">Website</span>
              </a>
            </div>
          </div>
        </footer>
      </Container>
    </footer>
  )
}