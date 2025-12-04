export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Modern Tech Blog. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://www.cosmicjs.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary text-sm transition-colors"
            >
              Cosmic Docs
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}