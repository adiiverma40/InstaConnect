import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { AppwriteLogout } from '../appwrite/appwrite'
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
export default function PopupOver({children}) {
  let dispatch = useDispatch()
  let navigate = useNavigate()
 async function Logout(){
    let logoutuser = await AppwriteLogout()
    dispatch(logout())
    console.log(logoutuser , "logout");
    navigate('/')
  }
  return (
    <div className=" flex  w-full ">
      <div className="flex gap-8">
        <Popover>
          <PopoverButton className="block text-sm/6 font-semibold text-black focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-white">
           {children}
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <div className="p-3 bg-gray-400">
              <span className="block rounded-lg py-2 px-3 transition hover:bg-white/5 hover:cursor-pointer" >
                <p className="font-semibold text-white" onClick={Logout}>Log out</p>
              </span>
             
            </div>
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  )
}
