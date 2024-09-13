import React from 'react'
import Aside from '@/components/Aside'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid h-screen grid-cols-[70px_1fr] gap-4 bg-[#09090B] p-2">
      <Aside />
      {children}
    </main>
  )
}
