import { Avatar } from '@material-ui/core'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './Firebase'
import './post.css'
function Post({key,desc,imageUrl,timeStamp,by,name}) {
  const [user] = useAuthState(auth)
  return (
    <div className='post'>
          <img src={imageUrl} alt="" />
        <div className="post_info">
          <div className="post_info_header">
            <Avatar src={user.photoURL}/>
            <h3>
              <span>{name[0]}</span>{name.slice(1,name.length)} - 
              </h3>
          </div>
            <p>{desc}</p>
            <p>{new Date(timeStamp?.seconds * 1000).toUTCString()}</p>
            <h4><span>By - </span>{by}</h4>
        </div>
    </div>
  )
}

export default Post