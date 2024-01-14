import { useEffect, useState } from 'react'
import './App.css'
import Cookies from 'js-cookie';
import Room from './componets/Room';
import RegisterUser from './componets/RegisterUser';
function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
  useEffect(()=>{
    const token = Cookies.get("user");
    if(token)
    setIsUserAuthenticated(true);
  },[Cookies])
  return (
    <>
    {isUserAuthenticated?<Room/>:<RegisterUser/>}
    </>
  )
}

export default App
