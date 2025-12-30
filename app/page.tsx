import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()
  if (!session) redirect("/login")
  
  if ((session.user as any).role === 'ADMIN') redirect("/admin")
  if ((session.user as any).role === 'INTERN') redirect("/intern")
  
  return <div>Unknown role</div>
}
