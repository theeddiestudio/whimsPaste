import { useEffect, useState } from 'react'
import AddNoteBtn from './AddNoteBtn'
import LoginBtn from './LoginBtn'
import {user} from '../lib/axios.js'

const Navbar = () => {

  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const checkLogins = async () => {
      try {
        const res = await user.get("/check");
        setLogged(res.data.isLogged);
      } catch (error) {
        console.log("Error while checking logins", error);
        setLogged(false);
      }
    }
    checkLogins();
  },[])

  return (
    <div className="bg-base-300 border-b border-base-content/20">
        <div className='mx-auto p-4 max-w-6xl'>
            <div className='flex justify-between'>
                <a className="text-2xl text-amber-900 font-mono tracking-tighter font-medium cursor-pointer">WhimsPaste</a>
                <div>
                  <AddNoteBtn />
                  {logged ? <LoginBtn type={"out"} /> : <LoginBtn />}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
