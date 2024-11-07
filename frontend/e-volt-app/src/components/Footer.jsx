import React from 'react'
import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-[#FAFAFA] w-screen py-8 px-20 mt-20'>
        <div className='flex items-center justify-start border-b-2 pb-4'>
            <Link href="/"><img src="/assets/Logo.png" alt="logo" /></Link>
            <p>Make your vote count!</p>
        </div>
        <div className='pt-4'>
            <p>&copy; copyright @e-vot 2024. All Rights Reserved.</p>
            <div className='flex items-center justify-end gap-4'>
                <img src="/assets/vot-x.svg" alt="" className='cursor-pointer' />
                <img src="/assets/vot-facebook.svg" alt="" className='cursor-pointer' />
            </div>
        </div>
    </footer>
  )
}
