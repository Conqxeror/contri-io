import React from 'react'
import Image from 'next/image'
import git from '../../public/git.png'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='flex justify-between items-center'>
        <div className='font-bold text-2xl'>Contri.io</div>
        <Link href={''}>
            <Image src={git} width={20} height={20}/>
        </Link>
    </div>
  )
}
