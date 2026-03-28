import React from 'react'

type Props = {}

const AppLogo = (props: Props) => {
    return (
        <div className='flex items-center'>
            <img src="/logo.svg" alt="Logo" className="w-9 h-9 mr-2" />
            <div className='flex flex-col items-start font-bold text-white'>
                <span className='text-xs'>huyhoaq.tr</span>
                <span className='text-xs'>Software Engineer</span>
            </div>
        </div>
    )
}

export default AppLogo