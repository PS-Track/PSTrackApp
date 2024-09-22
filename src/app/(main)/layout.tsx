import React from 'react'
import Aside from '@/components/layout/Aside'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid h-screen grid-cols-[70px_1fr] overflow-hidden bg-[#09090b]">
      <Aside />

      <div className="overflow-scroll py-3 pr-3">{children}</div>
    </main>
  )
}
