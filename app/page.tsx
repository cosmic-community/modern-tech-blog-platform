import Link from 'next/link'
import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export default async function HomePage() {
  const posts = await getPosts()
  const featuredPosts = posts.slice(0, 3)
  const recentPosts = posts.slice(3, 9)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Modern Tech Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest trends, insights, and innovations in technology
        </p>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
            {posts.length > 9 && (
              <Link 
                href="/posts" 
                className="text-primary hover:underline font-medium"
              >
                View all posts →
              </Link>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            No posts yet
          </h3>
          <p className="text-gray-600 mb-8">
            Get started by adding your first post in Cosmic CMS
          </p>
          <a
            href={`https://app.cosmicjs.com/${process.env.COSMIC_BUCKET_SLUG}/objects`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Post
          </a>
        </div>
      )}
    </div>
  )
}