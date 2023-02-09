import React, { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import { GoVerified } from "react-icons/go"
import VideoCard from "../../components/VideoCard"
import NoResults from "../../components/NoResults"
import { IUser, Video } from "../../types"
import { BASE_URL } from "../../utils"

interface IProps {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[]
    }
}

const Profile = ({ data }: IProps) => {
    const { user, userLikedVideos, userVideos } = data
    const [showUserVideos, setShowUserVideos] = useState(true)
    const [videosList, setVideosList] = useState<Video[]>([])
    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

    useEffect(() => {
     if(showUserVideos) {
        setVideosList(userVideos)
     } else {
        setVideosList(userLikedVideos)
     }
    }, [showUserVideos, userLikedVideos, userVideos])
    

    return (
        <div className="w-full">

            {/* Profile pic and name */}
            <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
                <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
                    <div className='w-16 h-16 md:w-32 md:h-32'>
                        <Image src={user.image} width={120} height={120} className='rounded-full' alt='user Profile' layout='responsive' />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className='md:text-2xl tracking-wider gap-1 flex items-center justify-center text-mc font-bold text-primary'>
                            {user.userName}
                            <GoVerified className='text-blue-400' />
                        </p>
                    </div>
                </div>
            </div>

            <div>
                {/* Switch between videos and fav sections */}
                <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                    <p
                        className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
                        onClick={() => setShowUserVideos(true)}
                    >
                        Videos
                    </p>
                    <p
                        className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
                        onClick={() => setShowUserVideos(false)}
                    >
                        Favoritos
                    </p>
                </div>

                {/* Video list/liked section */}
                <div className="flex gap-6 flex-wrap md:justify-start">
                    {videosList.length > 0 ? (
                        videosList.map((post: Video, idx: number) => (
                            <VideoCard post={post} key={idx}/>
                        ))
                    ) : (
                        <NoResults text={`Este perfil no tiene  ${showUserVideos ? 'videos' : 'favoritos'}`}/>
                    )}
                </div>
            </div>

        </div>
    )
}

// function to fetch the data
export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

    return {
        props: { data: res.data }
    }
}

export default Profile