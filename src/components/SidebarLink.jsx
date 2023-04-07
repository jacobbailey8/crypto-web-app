import React from 'react'

function SidebarLink({ name, link }) {
    return (
        <a href={link}>
            <div className='text-black text-4xl font-bold underline uppercase '>
                {name}
            </div>
        </a>
    )
}

export default SidebarLink