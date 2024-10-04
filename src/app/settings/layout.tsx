import React from 'react'

import Aside from '@/components/layout/Aside'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-dark grid h-screen grid-cols-[70px_1fr] overflow-hidden">
      <Aside />

      <div className="overflow-scroll py-3 pr-3">{children}</div>
    </main>
  )
}
