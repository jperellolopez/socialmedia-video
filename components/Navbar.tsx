import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'

const Navbar = () => {

  const user = false
  // destructure the functions from useAuthStore 
  const { userProfile, addUser, removeUser } = useAuthStore()
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[75px] h-[30px]'>
          <p className='cursor-pointer text-xl font-bold text-sky-800'>TokTok</p>
        </div>
      </Link>

      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 bg-white -left-20'
        >
          <input
            type='text'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder=' Buscar vídeos y usuarios'
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-300px md:w-[350px] rounded-full md:top-0'
          />
          <button className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400' onClick={handleSearch}>
            <BiSearch />
          </button>
        </form>
      </div>

      {/* check if we have a user logged in. If not, renders the sign in button */}
      <div>
        {userProfile ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href='/upload'>
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' /> {` `}
                <span className='hidden md:block'>Subir</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href={`/profile/${userProfile._id}`}>
                <button>
                  <Image
                    width={40}
                    height={40}
                    className='rounded-full cursor-pointer'
                    src={userProfile.image}
                    alt='profile picture'
                  />
                </button>
              </Link>
            )}
            <button
              type='button'
              className='px-2'
              onClick={() => {
                googleLogout()
                removeUser()
              }}
            >
              <AiOutlineLogout color='red' fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Error')}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar