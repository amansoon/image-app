import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';

type Props = {}

function User({}: Props) {
  const router = useRouter();
  const {username, slug} = router.query;

  useEffect(() => {
    const {usename, slug} = router.query;
    // if(slug?.length > 1) {
      
    // }
  }, [router])
  

  console.log(router.query)

  return (
    <div>
      <h1> username :  {username} </h1>
      <h1> slug : {slug} </h1>
    </div>
  )
}

export default User;