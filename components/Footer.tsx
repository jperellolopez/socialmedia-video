import React from 'react'
import { footerList1, footerList2, footerList3 } from '../utils/constants'

// Create a functional component to use below. Specify the type of the props we are passing in it (in this case, an array of strings and a boolean)
const List = ({items, mt}: {items: string[], mt: boolean}) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
  {items.map((item) => (
    <p key={item} className='text-gray-400 text-sm hover:underline cursor-pointer'>
      {item}
    </p>
  ))}
</div>
)

const Footer = () => {
  return (
    <div className='mt-6 hidden xl:block'>
      {/* we define mt as a prop so it will not display the margin on the first list, but it will show on the second and third ones */}
      <List items={footerList1} mt={false}/>
      <List items={footerList2} mt/>
      <List items={footerList3} mt/>
      <p className='text-gray-400 text-sm mt-5'>2022 TokTok</p>
    </div>
  )
}

export default Footer