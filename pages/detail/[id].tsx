// Controls what is shown when clicking on a video (video details). [] in the title means that the url route end would be dynamic and change for every video (see videocard component), but it will always refer to this page
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'
import { BASE_URL } from '../../utils'
import { Video } from '../../types'
import useAuthStore from '../../store/authStore'
import Comments from '../../components/Comments'
import LikeButton from '../../components/LikeButton'

// interface which specifies what postDetails type is
interface IProps {
  postDetails: Video
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const router = useRouter()
  const {userProfile}: any = useAuthStore()
  const [comment, setComment] = useState('')
  const [isPostingComment, setIsPostingComment] = useState(false)

  // function to play or stop the video on click
  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  // function to mute the video 
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [post, isVideoMuted])

  // handle likes
  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const {data} = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })

      setPost({...post, likes: data.likes})
    }
  }

  // add comments
  const addComment = async (e) => {
    e.preventDefault()

    if(userProfile && comment) {
      setIsPostingComment(true)
      const {data} = await axios.put(`${BASE_URL}/api/post/${post._id}`, {userId: userProfile._id, comment} )

      setPost({...post, comments: data.comments})
      setComment('')
      setIsPostingComment(false)
    }
  }

  if (!post) return null

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>

      {/* Left side of the screen container: video and buttons */}
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black bg-no-repeat bg-cover bg-center'>

        {/* Close button. Router.back returns to the prev page */}
        <div className='absolute top-6 left-2 gap-6 z-50 lg:left-6'>
          <p
            className='cursor-pointer'
            onClick={() => router.back()}
          >
            <MdOutlineCancel className='text-white text-[35px]' />
          </p>
        </div>

        {/* Video */}
        <div className='relative'>

          <div className='lg:h-[100vh] h-[60vh]'>
            <video
              ref={videoRef}
              loop
              src={post.video.asset.url}
              className='h-full cursor-pointer'
              onClick={onVideoClick}
            >
            </video>
          </div>

          {/* Play button */}
          <div className='absolute top-[45%] left-[45%] cursor-pointer'>
            {!isPlaying && (
              <button onClick={onVideoClick} >
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
              </button>
            )}
          </div>
        </div>

        {/* Mute button */}
        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
            </button>
          )}
        </div>
      </div>

      {/* Right side of the screen container: user, title, likes, comments */}
      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='lg:mt-20 mt-10 '>

          {/* Profile pic & name */}
          <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='ml-4 md:w-20 md:h-20 w-16 h-16'>
              <Link href={`/profile/${post.postedBy._id}`}>
                <>
                  <Image
                    width={62}
                    height={62}
                    className='rounded-full'
                    src={post.postedBy.image}
                    alt='profile picture'
                    layout='responsive'
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className='flex flex-col mt-3 gap-2'>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                    {post.postedBy.userName} {`
                            `}
                    <GoVerified className='text-blue-400 text-md' />
                  </p>
                  <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Image title */}
          <p className='px-10 text-gray-600 text-lg'>
            {post.caption}
          </p>

          {/* Like button. Only render  if user is logged in */}
          <div className='mt-10 px-10'>
            {userProfile && (
              <LikeButton
                likes = {post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>

          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />

        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id } }: { params: { id: string } }
) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: data }
  }
}

export default Detail