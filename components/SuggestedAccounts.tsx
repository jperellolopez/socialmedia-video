import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'
import { IUser } from '../types'


const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore()

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])

  // maps the first 6 users
  return (
    <div className='xl:border-b-2 pb-4 border-gray-200'>
      <p className='text-gray-500 mt-4 m-3 font-semibold hidden xl:block'>Cuentas sugeridas</p>
      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              <div className='w-8 h-8'>
                <Image src={user.image} width={34} height={34} className='rounded-full' alt='user Profile' layout='responsive'/>
              </div>
              <div className='hidden xl:block'>
                <p className='gap-1 flex items-center text-mc font-bold text-primary'>
                  {user.userName}
                  <GoVerified className='text-blue-400'/>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts