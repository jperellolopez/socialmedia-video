import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import useAuthStore from '../store/authStore'
import { client } from '../utils/client'
import { SanityAssetDocument } from '@sanity/client'
import { topics } from '../utils/constants'
import { BASE_URL } from '../utils'

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
  const [wrongFileType, setWrongFileType] = useState(false)
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState(topics[0].name)
  const [savingPost, setSavingPost] = useState(false)
  const router = useRouter()

  // import the profile data from AuthStore
  const {userProfile} : {userProfile: any} = useAuthStore()

  {/*Function to extract the file */ }
  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0]
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

    if (fileTypes.includes(selectedFile.type)) {
      client.assets.upload('file', selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name
      })
        .then((data) => {
          setVideoAsset(data)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
      setWrongFileType(true)
    }
  }

  {/* Function that manages the upload button. If required fields have been filled, stores a new document in the database */}
  const handlePost = async () => {
    if(caption && videoAsset?._id && category) {
      setSavingPost(true)

      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id
          }
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id
        },
        topic: category
      }

      await axios.post(`${BASE_URL}/api/post`, document)

      router.push('/')
      
    }
  }

  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
      <div className='bg-white rounded-lg xl:h-[80vh] flex flex-wrap gap-6 justify-between items-center p-14 pt-6 w-[65%]'>
        {/* Upload area */}
        <div>
          <div>
            <p className='text-2xl font-bold'>Subir vídeo</p>
            <p className='text-md text-gray-400 mt-1'>Postear un vídeo en tu cuenta</p>
          </div>
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {isLoading ? (
              <p>Subiendo...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset?.url}
                      loop
                      controls
                      className='rounded-xl h-[450px] mt-16 bg-black'
                    >
                    </video>
                  </div>
                ) : (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col items-center justify-center'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className='text-grey-300 text-6xl' />
                        </p>
                        <p className='text-xl font-semibold'>Subir vídeo</p>
                      </div>
                      <p className='text-gray-400 text-center mt-10 text-small leading-8'>
                        MP4, WebM u Ogg <br />
                        720x1280 o más <br />
                        Hasta 10 min <br />
                        Menos de 2 Gb
                      </p>
                      <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                        Selecciona un archivo
                      </p>
                    </div>
                    <input
                      type='file'
                      name='upload-video'
                      className='w-0 h-0'
                      onChange={(e) => uploadVideo(e)}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>
                Selecciona un formato válido
              </p>
            )}
          </div>
        </div>

        {/* Upload form */}
        <div className='flex flex-col gap-3 pb-10'>
          <label className='text-md font-medium'>Elige un texto</label>
          <input
            type='text'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className='rounded outline-none text-md border-2 border-gray-200 p-2'
          />
          <label className='text-md font-medium'>Elige una categoría</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          
          {/*Buttons */}
          <div className='flex gap-6 mt-10'>
              <button
                onClick={() => router.push('/')}
                type='button'
                className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
              >
                Cancelar
              </button>
              <button
                onClick={handlePost}
                type='button'
                className='bg-[#F51997] text-white border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
              >
                Publicar
              </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Upload