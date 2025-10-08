import React from 'react'
import { Link } from 'react-router'
import {PlusIcon} from 'lucide-react'

const Navbar = () => {
  return (

    <header className='bg-base-300 border-b border-base-content/10'>
        <div className='mx-auto max-w-6xl px-4 py-4 '>
            <div className="flex items-center justify-between">
                <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>Perfume Notes</h1>
                <div className='flex items-center gap-4 '>
                    <Link className='btn btn-primary' to={"/create"}><PlusIcon className='size-5'/> <span>New Notes</span></Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar