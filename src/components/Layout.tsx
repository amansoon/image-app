import React from 'react'
import Header from './Header'

type Props = {
    children: React.ReactNode
}

function Layout({children}: Props) {
  return (
    <div className="">
       <Header />
       {children}
    </div>
  )
}

export default Layout