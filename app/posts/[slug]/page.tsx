// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPost, getPosts } from '@/lib/cosmic'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image
  const publishedDate = post.metadata?.published_date
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8 text-gray-600">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/posts" className="hover:text-primary">Posts</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{post.title}</span>
      </nav>

      {/* Category */}
      {category && (
        <Link 
          href={`/categories/${category.slug}`}
          className="inline-block text-primary font-medium text-sm mb-4 hover:underline"
        >
          {category.title || category.metadata?.name}
        </Link>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
        {post.metadata?.title || post.title}
      </h1>

      {/* Metadata */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
        {author && (
          <Link 
            href={`/authors/${author.slug}`}
            className="flex items-center gap-3 hover:opacity-80"
          >
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                className="w-10 h-10 rounded-full object-cover"
                width={40}
                height={40}
              />
            )}
            <div>
              <p className="font-medium text-gray-900">
                {author.metadata?.name || author.title}
              </p>
              {author.metadata?.job_title && (
                <p className="text-sm text-gray-600">{author.metadata.job_title}</p>
              )}
            </div>
          </Link>
        )}
        {publishedDate && (
          <span className="text-gray-600">• {publishedDate}</span>
        )}
      </div>

      {/* Featured Image */}
      {featuredImage && (
        <img
          src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={post.title}
          className="w-full h-auto rounded-lg mb-12"
          width={800}
          height={450}
        />
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.metadata?.content || ''}
        </ReactMarkdown>
      </div>

      {/* Author Bio */}
      {author && author.metadata?.bio && (
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex gap-6">
            {author.metadata.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                width={80}
                height={80}
              />
            )}
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                About {author.metadata?.name || author.title}
              </h3>
              <p className="text-gray-600 mb-4">{author.metadata.bio}</p>
              <div className="flex gap-4">
                {author.metadata.twitter && (
                  <a
                    href={`https://twitter.com/${author.metadata.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Twitter
                  </a>
                )}
                {author.metadata.linkedin && (
                  <a
                    href={author.metadata.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
                {author.metadata.github && (
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
          </div>
        </div>
      )}
    </article>
  )
}