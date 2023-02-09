import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import '../styles/globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true) // set that this app at the start is server side rendering (ssr)

  // sets when the app is being rendered from the client side
  useEffect(() => {
    setIsSSR(false)
  }, []) // set at page load

  //if we are server side rendering, we do not want to show the components
  if (isSSR) {
    return null
  }

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
        <Navbar />
        <div className='flex gap-6 md:gap-20'>
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
            <Component {...pageProps} />
          </div>
        </div>
      </div>

    </GoogleOAuthProvider>
  )
}

export default App