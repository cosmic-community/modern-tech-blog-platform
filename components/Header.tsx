import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
            Modern Tech Blog
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/posts" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Posts
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}