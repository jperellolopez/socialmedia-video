import React, { useState } from 'react'
import axios from 'axios'
import { GoVerified } from 'react-icons/go'
import { BASE_URL } from '../../utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useAuthStore from '../../store/authStore'
import { IUser, Video } from '../../types'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import Image from 'next/image'

const Search = ({ videos }: { videos: Video[] }) => {
    const [isAccounts, setIsAccounts] = useState(false)
    const router = useRouter()
    const { searchTerm }: any = router.query
    const { allUsers } = useAuthStore()
    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
    const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className='w-full'>
            <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                <p
                    className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
                    onClick={() => setIsAccounts(true)}
                >
                    Usuarios
                </p>
                <p
                    className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
                    onClick={() => setIsAccounts(false)}
                >
                    Vídeos
                </p>
            </div>
            {isAccounts ? (
                <div>
                    {searchedAccounts.length > 0 ? (
                        searchedAccounts.map((user: IUser, idx: number) => (
                            <Link href={`/profile/${user._id}`} key={idx}>
                                <div className="flex gap-6  mb-2 bg-white w-full">
                                    <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
                                        <div>
                                            <Image src={user.image} width={50} height={50} className='rounded-full' alt='user Profile' />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className='gap-1 flex items-center text-md font-bold text-primary'>
                                                {user.userName}
                                                <GoVerified className='text-blue-400' />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <NoResults text={`No se encontraron usuarios con el término "${searchTerm}"`} />
                    )}
                </div>
            ) : (
                <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                    {videos.length ? (
                        videos.map((video: Video, idx: number) => (
                            <VideoCard post={video} key={idx} />
                        ))
                    ) : (
                        <NoResults text={`No se encontraron vídeos con el término "${searchTerm}"`} />
                    )}
                </div>
            )}
        </div>
    )
}

// function to fetch the data
export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string } }) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

    return {
        props: { videos: res.data }
    }
}

export default Search