import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">All Posts</h1>
      
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No posts found</p>
        </div>
      )}
    </div>
  )
}