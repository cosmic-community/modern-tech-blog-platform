import Link from 'next/link'

interface PostCardProps {
  post: any;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image
  const publishedDate = post.metadata?.published_date
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : null

  return (
    <article className={`flex flex-col h-full bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow ${featured ? 'md:col-span-1' : ''}`}>
      {featuredImage && (
        <Link href={`/posts/${post.slug}`} className="block">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-48 object-cover"
            width={400}
            height={225}
          />
        </Link>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        {category && (
          <Link 
            href={`/categories/${category.slug}`}
            className="text-primary text-sm font-medium mb-2 hover:underline inline-block"
          >
            {category.title || category.metadata?.name}
          </Link>
        )}
        
        <Link href={`/posts/${post.slug}`} className="group">
          <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">
            {post.metadata?.title || post.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-3 mt-auto pt-4">
          {author && (
            <>
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  className="w-8 h-8 rounded-full object-cover"
                  width={32}
                  height={32}
                />
              )}
              <div className="text-sm">
                <Link 
                  href={`/authors/${author.slug}`}
                  className="text-gray-900 font-medium hover:text-primary"
                >
                  {author.metadata?.name || author.title}
                </Link>
                {publishedDate && (
                  <p className="text-gray-500 text-xs">{publishedDate}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  )
}