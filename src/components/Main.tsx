import React from 'react'

export default function Main({ children }: { children: React.ReactNode }) {
  return <main className="rounded-lg bg-[#0e0e10]">{children}</main>
}
