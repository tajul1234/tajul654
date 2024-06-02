import { useEffect, useState } from 'react'

import './App.css'

const Appq = () =>{
  const[inital,setValue]=useState("Tajul");
  const Change = () =>{
    setValue ("Welcome to my webpage");
}
const Chan = () =>{
  setValue ("Welcome to my webpage 2");
}
const[Toggle,settoggle]=useState();
const Changetoggle = () =>{
      settoggle(!Toggle);
}
 const[count,setcount]=useState(0)
 useEffect(() =>{
  document.title=`Chat ${count}`
    setTimeout(() =>{
      setcount(count+1)
    },1000)
 })
  return(
   <div>
         <h1>Hello {inital}</h1>
         <button onClick={Change}>Click me 1</button>
         <button onClick={Chan}>Click me 2</button>
         <button onClick={Changetoggle}>
          {Toggle? "show" : "hide"}</button>
          {
            Toggle &&
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, sed!</p>
          }
          <p>This is time: {count} </p>
          
          
   </div>
  )
}

 
export default Appq
