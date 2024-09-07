import Link from "next/link"
export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="p-4 text-xl">Order cancelled.</p>
      <Link href="/"> Go back home? </Link>
    </div>
  )
}
