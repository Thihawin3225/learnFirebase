import React, { useEffect, useState } from 'react'
import Item from './Item'

const App = () => {
  const [value,setValue] = useState("");
  const [valuearray,setvalueArray] = useState([])
 
  const [loading,setLoading] = useState(false);
  const [err,setErr] = useState(null)
  useEffect(()=> {
    getData()
  },[])

  const postData = async (e)=> {
    e.preventDefault();
    try{
      await fetch("https://firenode-d1bd1-default-rtdb.firebaseio.com/notes.json",{
      method : "POST",
      body : JSON.stringify(value),
      headers : {
        "Content-Type": "application/json"
      } 
    }
    );
    }catch(err){
      setErr(err.message)
    }
    
  }

  const getData = async ()=> {
    setLoading(true)
    try{
      const response = await fetch("https://firenode-d1bd1-default-rtdb.firebaseio.com/notes.json");
      if(!response.ok){
        alert("Valid DAta")
      }
      const data =await response.json();
      const arrayData = [];
    for(const key in data){
      arrayData.push({
        id : key,
        note : data[key]
      });
    }
    setvalueArray(arrayData)
    getData()
    setLoading(false)
    }catch(err){
      console.log(err)
    }
  }
 
  return (
    <div>
     <h1>Fire Node</h1>
     <p>Your note cout is <span>{valuearray.length}</span></p>
     {loading && <h1>Loading</h1>}
     {err && <h1>Error</h1>}
     <form onSubmit={postData}>
        <input placeholder='Enter your node' value={value} onChange={(e)=> setValue(e.target.value)}/>
        <button>Submit</button>
     </form>
     {valuearray.map((item,index)=> {
      return(
        <Item key={index} item={item}/>
      )
     })}
    </div>
  )
}

export default App




