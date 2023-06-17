import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { useRouter } from 'next/router'

export default function Navbar(){
    const user = useUser();

    const router = useRouter()
    async function reload(){
        if(router.pathname !== '/')
            return;
        router.reload('/');
        router.replace('/');
    }
    // const user = true;
    return (
    <nav className="shadow px-4 py-2 flex flex-row justify-between items-center">
        <div className="text-xl font-bold"><Link onClick={reload} href='/' >ChatVision</Link></div>
        <div className="text-md font bold">
            {user? <Link href="/logout">LogOut</Link> : <Link  href="/login">LogIn</Link>}
        </div>
      </nav>
    )
}