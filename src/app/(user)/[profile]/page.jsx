import Profile from "./Profile";

export default function ProfilePage({params}) {
  return (
    <>
    <Profile username={params?.profile}/>
    </>
  )
}