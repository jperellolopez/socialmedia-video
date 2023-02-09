import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { Video } from '../types'
import type { NextPage } from 'next'
import VideoCard from '../components/VideoCard'
import NoResults from '../components/NoResults'
import { BASE_URL } from '../utils'


// create an IProps object which contains the type definition of what the Home component will accept:  an array of files of type 'video' (Video type itself is defined on the /types.d.ts file)
interface IProps {
  videos: Video[]
}

// showcases the videos in the main section, fetching them from the DB
const Home = ({ videos }: IProps) => {
  console.log(videos)
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {/* if video exists (has a length) map through all the videos returning each Video component, if not return a NoResults component*/}
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={'No se han encontrado videos'} />
      )
      }
    </div>
  )
}

// when exporting a function with this name, Next.js will prerendeer the page on each request using the data (props) returned by this function. Use the function when rendering a page whose data (in this case, videos) must be fetched at every load of the page.
export const getServerSideProps = async ({ query: { topic } }: { query: { topic: string } }) => {
  
  let response = null

  // get a response from our own backend (located in pages/api/discover OR pages/api/post folders) depending if we searched using a topic (tag) or not
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  } else {
    response = await axios.get(`${BASE_URL}/api/post`)
  }

  // return the props in data
  return {
    props: {
      videos: response.data
    }
  }
}

export default Home