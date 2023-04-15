import React from 'react'
import Layout from './Layout'

type Props = {
    children: ReactNode,
}

function UserLayout({children}: Props) {
  return (
    <Layout>
       {children}
    </Layout>
  )
}

export default UserLayout