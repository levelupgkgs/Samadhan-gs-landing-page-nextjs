
'use client'
import { motion } from 'framer-motion'

const reviews = [
  {
    name: 'Priya Sharma',
    avatar: '👩‍🎓',
    rating: 5,
    text: 'Samadhan GS helped me crack the SSC CGL exam! The bilingual content made complex topics easy to understand.',
    exam: 'SSC CGL Qualified'
  },
  {
    name: 'Rohit Kumar',
    avatar: '👨‍💼',
    rating: 5,
    text: 'The offline download feature was a game-changer. I could study anywhere without worrying about internet connectivity.',
    exam: 'UPSC Mains Cleared'
  },
  {
    name: 'Anjali Verma',
    avatar: '👩‍💻',
    rating: 5,
    text: 'Expert-curated notes saved me months of preparation time. Highly recommend for serious aspirants.',
    exam: 'State PSC Selected'
  },
  {
    name: 'Vikash Singh',
    avatar: '👨‍🏫',
    rating: 5,
    text: 'Regular content updates keep me ahead of current affairs. The exam analysis feature is brilliant!',
    exam: 'Railway Exam Qualified'
  },
  {
    name: 'Neha Gupta',
    avatar: '👩‍🔬',
    rating: 5,
    text: 'The exam-wise preparation strategy helped me focus on what matters most. Got selected in my first attempt!',
    exam: 'Bank PO Selected'
  },
  {
    name: 'Arjun Patel',
    avatar: '👨‍⚖️',
    rating: 5,
    text: 'Best app for competitive exam preparation. The UI is intuitive and content quality is top-notch.',
    exam: 'UPSC Prelims Cleared'
  }
]

export default function ReviewsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Success <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of successful aspirants who chose Samadhan GS
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bento-card group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{review.avatar}</div>
                <div>
                  <h3 className="font-semibold text-white">{review.name}</h3>
                  <p className="text-sm text-green-400">{review.exam}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
              
              <p className="text-gray-300 italic">"{review.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
