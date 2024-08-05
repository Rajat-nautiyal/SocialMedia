import React from 'react'

export const Search = () => {
  return (
    <div>
      <input type='text' className="w-[200px] border-[1.5px] border-gray-400 
                hover:w-[250px] hover:border-blue-400 cursor-pointer
                transition:ease-out duration-300 focus:outline-blue-400 
                focus:border-[1px] rounded-full py-[3px] pl-[3px]" 
                placeholder='&#x1F50D; Search friends'/>
    </div>
  )
}
