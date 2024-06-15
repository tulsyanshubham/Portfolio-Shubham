import { Contact } from '@/components/Contact'
import { Home } from '@/components/Home'
import Projects from '@/components/Projects'
import Timeline from '@/components/Timeline'
import React from 'react'

export default function page() {
  return (
    <div className=" w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
      <Home />
      <Projects />
      <Timeline />
      <Contact />
    </div>
  )
}
