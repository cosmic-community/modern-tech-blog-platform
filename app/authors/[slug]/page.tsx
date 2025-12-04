// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAuthor, getPostsByAuthor, getAuthors } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const profilePhoto = author.metadata?.profile_photo

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8 text-gray-600">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Author</span>
      </nav>

      {/* Author Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        {profilePhoto && (
          <img
            src={`${profilePhoto.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={author.metadata?.name || author.title}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-6"
            width={160}
            height={160}
          />
        )}
        <h1 className="text-4xl font-bold mb-2 text-gray-900">
          {author.metadata?.name || author.title}
        </h1>
        {author.metadata?.job_title && (
          <p className="text-xl text-gray-600 mb-6">{author.metadata.job_title}</p>
        )}
        {author.metadata?.bio && (
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            {author.metadata.bio}
          </p>
        )}
        <div className="flex justify-center gap-4">
          {author.metadata?.twitter && (
            <a
              href={`https://twitter.com/${author.metadata.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Twitter
            </a>
          )}
          {author.metadata?.linkedin && (
            <a
              href={author.metadata.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>
          )}
          {author.metadata?.github && (
            <a
              href={`https://github.com/${author.metadata.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          Posts by {author.metadata?.name || author.title} ({posts.length})
        </h2>
        
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-8">
            No posts yet from this author
          </p>
        )}
      </div>
    </div>
  )
}