import Search from "./Search"
import UserProfile from "./UserProfile"

const Header = () => {
  return (
    <div className="w-full flex justify-between p-3 bg-slate-200">
        <Search />
        <h1 className="font-mono font-bold text-3xl">CHAT MANIA</h1>
        <UserProfile />
    </div>
  )
}

export default Header