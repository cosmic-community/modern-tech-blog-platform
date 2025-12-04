// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategory, getPostsByCategory, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8 text-gray-600">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Category</span>
      </nav>

      {/* Category Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          {category.metadata?.name || category.title}
        </h1>
        {category.metadata?.description && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {category.metadata.description}
          </p>
        )}
        <p className="text-gray-500 mt-4">{posts.length} posts</p>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 py-8">
          No posts in this category yet
        </p>
      )}
    </div>
  )
}