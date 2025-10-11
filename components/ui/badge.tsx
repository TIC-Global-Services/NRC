import React from 'react'

const Badge = ({ className, label }: any) => {
  return (
    <div>
      <div
        className={`
          text-xs
          inline-block rounded-full 
          bg-gradient-to-b from-[#E9EAEC] to-[#F6F9FC]  
          py-2 px-4 md:text-sm font-medium text-black
          border border-t-0 border-[#B4B3BC]/70
          [box-shadow:inset_0px_4px_4px_0px_#E3E5E8]
          ${className}
        `}
      >
        {label}
      </div>
    </div>
  )
}

export default Badge
