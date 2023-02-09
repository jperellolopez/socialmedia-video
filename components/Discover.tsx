import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { topics } from '../utils/constants'

const Discover = () => {
    // to know if an item is clicked and we have to apply one of the 2 styles below, we use the Next router, which provides info on what is currently on the address bar, destructuring in a "topic" variable:
    const router = useRouter()
    const { topic } = router.query

    const activeTopicStyle = 'xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]'

    const topicStyle = 'xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black'

    return (
        <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
            <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block '>
                Temas populares
            </p>
            <div className='flex gap-3 flex-wrap'>
                {topics.map((item) => (
                    <Link href={`/?topic=${item.name}`} key={item.name}>
                        {/* applies one or another style depending if the topic is on the address bar currently  */}
                        <div className={topic === item.name ? activeTopicStyle : topicStyle}>
                            <span className='font-bold text-2xl xl:text-md'>
                                {item.icon}
                            </span>
                            <span className='font-medium text-md hidden xl:block capitalize'>
                                {item.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Discover