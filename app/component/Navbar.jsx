import React from 'react'
import Image from 'next/image'
import git from '../../public/git.png'
import Link from 'next/link'
import { AlertDialogDemo } from './AlertDialogue'

export default function Navbar() {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <div className='font-bold text-2xl'>Contri.io</div>
      </div>
      <div className='flex items-center gap-5'>
        <Link href={'https://github.com/Conqxeror/contri-io'}>
            <Image src={git} width={20} height={20}/>
        </Link>
        <AlertDialogDemo />
      </div>
    </div>
  )
}
