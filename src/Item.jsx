import React from 'react'

const Item = ({item}) => {
    const {id,note} = item;
    const deleteItem =async ()=> {
        await fetch(`https://firenode-d1bd1-default-rtdb.firebaseio.com/notes/${id}.json`,{
            method : "DELETE"
        })
    }
  return (
    <div>
      {note} 
      <button onClick={deleteItem} style={{width:"20px"}}>-</button>
    </div>
  )
}

export default Item
