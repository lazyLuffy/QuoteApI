import { useDispatch, useSelector } from "react-redux";
import firebase from 'firebase'
import "./create.css";
import Post from './Post';
import { useForm } from "react-hook-form";
import {dataIn} from './features/counter/dataSlice';
import {db} from './Firebase'
import { selectData } from "./features/counter/dataSlice";
import { useEffect, useState } from "react";
import { selectStatus, statusOn } from "./features/counter/toogleSlice";
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from './Firebase'

function Create() {
  const [user,loading] = useAuthState(auth) 
  const [data,setData]  = useState([])
 const status = useSelector(selectStatus)
 console.log('toggle status = ', status)
 const dispatch = useDispatch()
 const toggleAction = (e)=>{
   e.preventDefault()
  dispatch(statusOn())
 }
  useEffect(()=>{
    db.collection("postData").orderBy("timeStamp","desc").onSnapshot((snapshot)=>
      setData(
        snapshot.docs.map((doc)=>({
          id:doc.id,
          name:user.displayName,
          data:doc.data()
        }))
        )
    )
  },[])

  const postdata = useSelector(selectData)
  console.log(postdata)
  const { register , handleSubmit,reset} = useForm()
  const onSubmit = (data,e) => 
  {
    e.preventDefault();
    db.collection("postData").add({
      name:user.displayName,
      imageUrl:data.image || "My Quotes",
      desc:data.desc,
      by:data.by,
      timeStamp:firebase.firestore.FieldValue.serverTimestamp()
    }).then(()=>console.log("data Sended")).catch((e)=>console.log(e.message))
    dispatch(dataIn({
      name:user.displayName,
      imageUrl : data.image,
      desc:data.desc,
      by:data.by
    }))
    reset({ image:" ",desc:"",by:"" })

  }
  return (
    <div className={!status ? 'createPost':'createPost_full'}>
        <div className="form_Header">
        <h2>Write Your Thought..</h2>
        </div>
        <div className="form_Body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input  type="text" name="image" placeholder='Image Url' { ...register("image")} />
            <textarea  name="desc" id="thoughts" rows="4" cols="50" placeholder='Enter Your Quotes' { ...register("desc",{required:true})}></textarea>
            <input type="text" name="by" placeholder='Who Said It?' { ...register("by",{required:true})}/>
            <button type="submit" variant='contained' color="primary" size="large">Submit</button>
          </form>
        </div>
        <p>Need some inspiration? <span onClick={toggleAction}>
            Try a random quote.
          </span></p>
          <div className="posts">
            {data.map(({id,data:{by,desc,imageUrl,timeStamp,name}})=>(
              <Post 
              key={id}
              name={name}
              desc={desc}
              imageUrl={imageUrl}
              timeStamp={timeStamp}
              by={by}
              />
            ))
            }
          </div>
      </div>
  )
}
export default Create