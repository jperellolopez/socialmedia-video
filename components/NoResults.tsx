import React from 'react'
import { BiCommentX } from 'react-icons/bi'
import { MdOutlineVideocamOff } from 'react-icons/md'

// define the type of the props we are gonna pass
interface IProps {
  text: string
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className='h-full w-full'>
      {text === "Todavía no hay comentarios. ¡Sé el primero en añadir uno!" ?
        <div className='flex flex-col justify-center items-center h-full w-full'>
          <p className='text-8xl'>
            <BiCommentX />
          </p>
          <p className='text-2xl text-center'>
            {text}
          </p>
        </div>
        :
        <div className='flex flex-col justify-center items-center h-full w-full'>
          <p className='text-8xl'>
            <MdOutlineVideocamOff />
          </p>
          <p className='text-2xl text-center'>
            {text}
          </p>
        </div>
      }
    </div>
  )
}

export default NoResults