import { getAlltheaters } from '../api/getALLtheaters';
import { useEffect } from "react";
function Theater() {
  
  useEffect(()=>{
    getAlltheaters()
    .then((data)=>console.log(data))
    .catch((e)=>console.log(e));
   },[]);
  return (
    <div>Theater</div>
  )
}

export default Theater