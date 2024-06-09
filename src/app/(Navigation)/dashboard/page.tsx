import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

import { DashboardContent } from "./DashboardContent"

interface pageProps {}

const page = async ({}: pageProps) => {
  const session = await auth()
  if (!session) redirect("/")

  return (
    <div className="flex flex-col">
      <DashboardContent />
    </div>
  )
}
export default page
