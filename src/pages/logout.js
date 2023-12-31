import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LogOut(){
    const supabase = useSupabaseClient();
    const router = useRouter();

    useEffect(() => {
        supabase.auth.signOut().then(() => {
            router.push("/login");
        });
    },[supabase,router]);
    return <div></div>
}