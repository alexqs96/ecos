import Profile from "./Profile";
import { Toaster } from 'react-hot-toast';

export default function ProfilePage({params}) {
  return (
    <>
    <Toaster />
    <Profile username={params?.profile}/>
    </>
  )
}