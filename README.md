# Modern Tech Blog Platform

![App Preview](https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=300&fit=crop&auto=format)

A modern, high-performance tech blog built with Next.js 16 and powered by Cosmic CMS. Features a beautiful design, author profiles, category organization, and markdown content rendering.

## ✨ Features

- 📝 **Dynamic Blog Posts** - Markdown content with full formatting support
- 👤 **Author Profiles** - Rich author pages with bios and social links
- 🏷️ **Category Organization** - Browse posts by category
- 🎨 **Modern Design** - Clean, professional UI with Inter font
- 📱 **Fully Responsive** - Optimized for all screen sizes
- 🖼️ **Image Optimization** - Automatic resizing via imgix
- ⚡ **High Performance** - Built with Next.js 16 Server Components
- 🔍 **SEO Friendly** - Optimized metadata and structured data

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6932005e3584465d0a2f7cbf&clone_repository=693201bb3584465d0a2f7d0f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a modern tech blog with posts, authors with bios, and categories"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic SDK** - Content management
- **React Markdown** - Markdown rendering
- **Bun** - Fast package manager and runtime

## 📋 Prerequisites

- [Bun](https://bun.sh) installed on your machine
- A Cosmic account and bucket with the content model described above

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd modern-tech-blog
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

You can find these values in your Cosmic dashboard under Bucket Settings > API Access.

### 4. Run the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

## 📚 Cosmic SDK Examples

### Fetching All Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post

```typescript
const { object: post } = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: 'my-post-slug'
  })
  .depth(1)
```

### Fetching Posts by Category

```typescript
const { objects: posts } = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.category': categoryId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This blog integrates with three Cosmic object types:

### Posts
- **Title** (text, required) - Post title
- **Content** (markdown, required) - Main post content
- **Featured Image** (file, optional) - Hero image
- **Author** (object relationship, required) - Connected to Authors
- **Category** (object relationship, required) - Connected to Categories
- **Published Date** (date, required) - Publication date

### Authors
- **Name** (text, required) - Author's full name
- **Title** (text, optional) - Job title
- **Bio** (textarea, optional) - Author biography
- **Profile Photo** (file, optional) - Author headshot
- **Twitter** (text, optional) - Twitter handle
- **LinkedIn** (text, optional) - LinkedIn URL
- **GitHub** (text, optional) - GitHub username

### Categories
- **Name** (text, required) - Category name
- **Description** (textarea, optional) - Category description

## 🚀 Deployment

### Deploy to Vercel

The easiest way to deploy is using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above
2. Connect your GitHub repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Environment Variables in Production

Make sure to set these environment variables in your Vercel dashboard:
- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key

## 📝 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with global styles
│   ├── page.tsx            # Homepage with latest posts
│   ├── posts/
│   │   ├── page.tsx        # All posts listing
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post page
│   ├── authors/
│   │   └── [slug]/
│   │       └── page.tsx    # Author profile page
│   └── categories/
│       └── [slug]/
│           └── page.tsx    # Category posts listing
├── components/
│   ├── PostCard.tsx        # Post preview card
│   ├── Header.tsx          # Site navigation
│   ├── Footer.tsx          # Site footer
│   └── CosmicBadge.tsx     # Attribution badge
├── lib/
│   └── cosmic.ts           # Cosmic SDK configuration
└── types.ts                # TypeScript type definitions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

<!-- README_END -->