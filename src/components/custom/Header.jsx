import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { useNavigate, useNavigation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dialog, setdialog] = useState(false)
  // const navigate=useNavigation();
  useEffect(() => {
    console.log(user)
  }, [])
  const login = useGoogleLogin({
    onSuccess: (resp) => getuserprofile(resp),
    onError: (e) => console.log(e)
  })
  const getuserprofile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data))
      setdialog(false);
      window.location.reload();
      // console.log(resp)
    })
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src="/logo.svg" />
      <div>
        {user ?
          <div className='flex gap-1 items-center'>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">+ Create trip</Button>
            </a>
            <a href="/mytrips">
              <Button variant="outline" className="rounded-full">Trip History</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} alt="" className='w-[35px] h-[35px] rounded-full my-1' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }} className='cursor-pointer'>Log Out</h2>
              </PopoverContent>
            </Popover>


          </div> :
          <Button onClick={() => {
            setdialog(true);
          }}>Sign in</Button>
        }

      </div>
      <Dialog open={dialog} onOpenChange={(open) => setdialog(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <img src="/logo.svg" alt="" />
            <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
            <p>Sign in to the App with Google Authentication</p>
            <Button onClick={login} className="w-full mt-5">
              Sign in with Google
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Header
