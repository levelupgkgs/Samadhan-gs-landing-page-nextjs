
import { notFound } from 'next/navigation'

// Mock function to get blog by slug
async function getBlogBySlug(slug: string) {
  // In real implementation, fetch from Sanity
  const mockBlogs: { [key: string]: any } = {
    'upsc-2024-syllabus-changes': {
      title: 'UPSC 2024: Key Changes in Syllabus You Must Know',
      content: `
        <h2>Important Updates in UPSC Syllabus</h2>
        <p>The UPSC has announced several important changes to the 2024 syllabus...</p>
        <h3>Prelims Changes</h3>
        <p>Key modifications in the preliminary examination include...</p>
        <h3>Mains Changes</h3>
        <p>The main examination has seen updates in...</p>
      `,
      publishedAt: '2024-01-15',
      category: 'UPSC',
      readTime: '5 min read'
    },
    'ssc-current-affairs-topics': {
      title: 'Top 10 Current Affairs Topics for SSC Exams',
      content: `
        <h2>Essential Current Affairs for SSC</h2>
        <p>Stay updated with these crucial current affairs topics...</p>
        <ol>
          <li>Economic Survey highlights</li>
          <li>Recent government schemes</li>
          <li>International relations updates</li>
        </ol>
      `,
      publishedAt: '2024-01-10',
      category: 'SSC',
      readTime: '7 min read'
    },
    'effective-study-techniques': {
      title: 'Effective Study Techniques for Government Exams',
      content: `
        <h2>Proven Study Methods</h2>
        <p>These study techniques have helped thousands of aspirants...</p>
        <h3>Active Recall</h3>
        <p>The most effective way to study is...</p>
        <h3>Spaced Repetition</h3>
        <p>Review content at increasing intervals...</p>
      `,
      publishedAt: '2024-01-05',
      category: 'Study Tips',
      readTime: '10 min read'
    }
  }
  
  return mockBlogs[slug] || null
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug)
  
  if (!blog) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
              {blog.category}
            </span>
            <span className="text-gray-400 text-sm">{blog.readTime}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-300">
            Published on {new Date(blog.publishedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="glass-effect rounded-2xl p-8 sm:p-12">
          <div 
            className="prose prose-lg prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Back to blogs */}
        <div className="text-center mt-12">
          <a 
            href="/#blog" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to all articles
          </a>
        </div>
      </div>
    </main>
  )
}
