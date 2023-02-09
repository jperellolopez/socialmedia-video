import React, { useState, useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '../store/authStore'

// void implies that the datatype is a function
interface Iprops {
  handleLike: () => void
  handleDislike: () => void
  likes: any[]
}

const LikeButton = ({likes, handleLike, handleDislike}: Iprops) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false)
  const { userProfile }: any = useAuthStore()
  // finds if the user id is in the likes array and filters it, so the length can be 0 (no liked) or 1 (already liked)
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

  // controls the likes/unlikes. Button clicked once = like. Clicked twice = unlike.
  useEffect(() => {
   if (filterLikes?.length > 0) {
    setAlreadyLiked(true)
   } else {
    setAlreadyLiked(false)
   }
  }, [filterLikes, likes])
  
  return (
    <div className='flex gap-6'>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {alreadyLiked ? (
          <div 
            className='bg-primary rounded-full p-2 md:p-4 text-[#F51997]'
            onClick={handleDislike}
          >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ) : (
          <div 
            className='bg-primary rounded-full p-2 md:p-4'
            onClick={handleLike}
          >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        )}
        <p className='text-md font-semibold'>{likes?.length || 0}</p>
      </div>
    </div>
  )
}

export default LikeButton