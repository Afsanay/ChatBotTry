import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"

export default function Navbar(){
    const user = useUser();
    // const user = true;
    return (
    <nav className="shadow px-4 py-2 flex flex-row justify-between items-center">
        <div className="text-xl font-bold">ChatVision</div>
        <div className="text-md font bold">
            {user? <Link href="/logout">LogOut</Link> : <Link  href="/login">LogIn</Link>}
        </div>
      </nav>
    )
}