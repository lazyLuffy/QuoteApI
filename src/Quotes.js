import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectStatus, statusOff } from './features/counter/toogleSlice'
import './quotes.css'
import axios from 'axios'
import { Close } from '@material-ui/icons'

function Quotes() {
  const status = useSelector(selectStatus)
  const [apipost,setApiPost] = useState([])
  useEffect(()=>{
    axios.get("https://type.fit/api/quotes").then((response)=>{

    let arr= response.data.filter((data,index) =>  {
        // console.log(data,"map-data")
        if(index<=50)
        {
          // console.log(data)
            return (
              {
                  "desc":data.text,
                  "by":data.author
              }
            )
        }
      }
    )
    console.log("Arr",arr)
  
    setApiPost(arr)
     
    
    }).catch((e)=>console.log(e.message,"Catch Error"))
  },[])
  console.log(apipost,"apipost Data")
  const dispatch = useDispatch()
  const quotesOff = (e)=>{
    e.preventDefault()
    console.log("QUote oFF click")
    dispatch(statusOff())
    console.log("status after clicked",status)
  }
  return (
    <div className={status ? 'createQuotes' : 'createQuotes_null'}>
      <div className="quotes_header">
        <p>
        <Close onClick={quotesOff}/>
        </p>
        <h2>Some Random Quotes</h2>
      </div>
      {apipost.map(({text,author})=>(
      <div className="quotePost">
        <img src="https://static.parade.com/wp-content/uploads/2020/01/Buddha-Quotes-02.jpg" alt="" />
        <p>{text}</p>
        <h3><span>By - </span>{author}</h3>
      </div>
      ))}
    </div>
  )
}

export default Quotes