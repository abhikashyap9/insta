import React from 'react'

function SearchIcon(props) {
  const {search}=props

  return (
    <div className='py-2'>
     <div className='sm:py-1 md:py-1 lg:py-2 rounded-md border border-gray-200 bg-gray-100'>
      <input 
      type="text" 
      placeholder='Search' 
      className='outline-none border-none w-full bg-transparent text-sm pl-2'
      onChange={search}
      />
      </div>
    </div>
  )

}

export default SearchIcon