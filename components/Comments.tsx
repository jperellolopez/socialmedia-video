import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'
import NoResults from './NoResults'
import { IUser } from '../types'

interface IProps {
  isPostingComment: Boolean,
  comment: string,
  setComment: Dispatch<SetStateAction<string>>,
  addComment: (e: React.FormEvent) => void,
  comments: IComment[]
}

interface IComment {
  comment: string
  length?: number,
  _key: string,
  postedBy: { _ref: string, _id: string }


}

const Comments = ({ comment, setComment, addComment, comments, isPostingComment }: IProps) => {
  const { userProfile, allUsers } = useAuthStore()

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[475px]'>
        {comments?.length ? (
          <div>
            {comments.map((comment, idx) => (
              <>
                {/* maps comments and users. For every user check if theres a comment with a matching id, if it is, render the user info and comment content */}
                {allUsers.map((user: IUser) => (
                  user._id === (comment.postedBy._id || comment.postedBy._ref) && (
                    <div className='p-2 items-center' key={idx}>

                      {/* profile  info */}
                      <Link href={`/profile/${user._id}`}>
                        <div className='flex gap-3 items-start cursor-pointer'>
                          <div className='w-8 h-8'>
                            <Image src={user.image} width={34} height={34} className='rounded-full' alt='user Profile' layout='responsive' />
                          </div>
                          <div className='hidden xl:block'>
                            <p className='gap-1 flex items-center text-md font-bold text-primary'>
                              {user.userName}
                              <GoVerified className='text-blue-400' />
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* comment */}
                      <div className='pt-1 pb-3'>
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  )
                ))}
              </>
            ))}
          </div>
        ) : (
          <NoResults text="Todavía no hay comentarios. ¡Sé el primero en añadir uno!" />
        )}
      </div>

      {/* Comment form, only shown to registered users */}
      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
          <form
            onSubmit={addComment}
            className='flex gap-4'
          >
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Añadir comentario..."
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg '
            />
            <button
              className='text-md text-gray-400'
              onClick={addComment}
            >
              {isPostingComment ? 'Enviando comentario...' : 'Comentar'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments