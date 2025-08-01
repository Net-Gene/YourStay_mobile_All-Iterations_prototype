import { Suspense } from "react"
import HostelApp from "./hostel-app"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HostelApp />
    </Suspense>
  )
}