import React from 'react'

function Stories(props) {

  const {addStories}=props
  

  return (
    <div className="flex px-4 border-2 border-white-800 rounded-lg my-4 bg-white ">
      <div className="border-4 border-rose-800 rounded-full ... m-2 cursor-pointer" onClick={addStories}>
      <img className="inline-block h-16 w-16 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="stores"/>
      </div>
      <div className="border-4 border-rose-800 rounded-full ... m-2">
      <img className="inline-block h-16 w-16 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="stores"/>
      </div>
      <div className="border-4 border-rose-800 rounded-full ... m-2">
      <img className="inline-block h-16 w-16 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="stores"/>
      </div>
    </div>
  )
}

export default Stories;