import React,{useState,useEffect} from 'react'
import { FaUsers } from "react-icons/fa6";
export const Users = () => {

  const [users, setUsers] = useState([]);
  const [isClicked, setIsClicked] = useState(true);

  const getUsers = async()=>{
    try{
      const res = await fetch('http://localhost:6001/users',{
        method: 'GET',
        headers:{
          'content-type':'application/json'
        },
      })
      const data = await res.json() //await is must
      setUsers(data)
      console.log(data)
    } catch(e){
        console.log(e.message)
    }
  }
  const handleClick =()=>{
    setIsClicked((prev)=>!prev)
  }
  useEffect(()=>{
    getUsers()
  },[])
  return (
    <>
    {isClicked?
    (<FaUsers onClick={handleClick}/>)
    :(    
      <div>
        <FaUsers onClick={handleClick}/>
        People you may know
        {users.map(({_id, firstname, lastname, userPic, location})=>(
          <div key = {_id}>
            <div className='h-[150px] '><img className='h-[150px]'src={`http://localhost:6001/streamId/${userPic}`} /></div>
            <div>{firstname} {lastname}</div>
            <div>{location}</div>
          </div>
        )
        )}
      </div>
    )
    }
  </>
  )
}
