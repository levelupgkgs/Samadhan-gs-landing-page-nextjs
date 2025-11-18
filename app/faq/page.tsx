'use client'

import { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { HelpCircle, ChevronDown, ChevronUp, Mail, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is Samadhan GS?',
        a: 'Samadhan GS is a comprehensive educational platform designed to help aspirants prepare for competitive exams like UPSC, State PSC, SSC, Banking, Railways, and other government examinations. We provide study materials, quizzes, current affairs, and personalized learning paths.'
      },
      {
        q: 'Which exams does Samadhan GS cover?',
        a: 'We cover a wide range of competitive exams including UPSC Civil Services, State PSCs (BPSC, UPPSC, MPPSC, etc.), SSC CGL/CHSL/MTS, Banking (IBPS, SBI), Railways (RRB), Defence (NDA, CDS), and more. Our content is regularly updated to match the latest exam patterns.'
      },
      {
        q: 'Is Samadhan GS available in Hindi?',
        a: 'Yes! Samadhan GS provides content in both Hindi and English to cater to aspirants across India. You can switch between languages in the app settings based on your preference.'
      },
      {
        q: 'Can I use Samadhan GS offline?',
        a: 'Yes, our mobile app allows you to download content for offline use. You can download study materials, quizzes, and previous year papers to study without an internet connection.'
      }
    ]
  },
  {
    category: 'Account & Subscription',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'You can create an account by downloading our app from Google Play Store or App Store and signing up with your email address or phone number. You can also sign up using your Google or Facebook account.'
      },
      {
        q: 'What subscription plans are available?',
        a: 'We offer multiple subscription plans: Free (basic features), Monthly Premium, Quarterly Premium, and Annual Premium. Premium plans unlock all content, ad-free experience, detailed analytics, and personalized study plans. Check our app for current pricing.'
      },
      {
        q: 'How can I cancel my subscription?',
        a: 'You can cancel your subscription anytime through the app settings or through your Google Play/App Store subscription settings. Your access will continue until the end of the current billing period.'
      },
      {
        q: 'Do you offer refunds?',
        a: 'Yes, we offer a 7-day refund policy. If you are not satisfied with our premium services within 7 days of purchase, you can request a full refund by contacting us at samadhangsexam@gmail.com.'
      }
    ]
  },
  {
    category: 'Features & Content',
    questions: [
      {
        q: 'How often is the content updated?',
        a: 'Our content is updated daily. Current affairs are updated every morning, and we regularly add new study materials, quizzes, and practice tests based on the latest exam patterns and syllabus changes.'
      },
      {
        q: 'Are the quiz questions similar to actual exam questions?',
        a: 'Yes, our questions are designed to match the difficulty level and pattern of actual competitive exams. We include previous year questions with detailed explanations to help you understand the exam pattern better.'
      },
      {
        q: 'Can I track my progress?',
        a: 'Absolutely! Our app provides detailed analytics including your quiz performance, time spent studying, weak areas, improvement trends, and comparison with other aspirants. This helps you focus on areas that need more attention.'
      },
      {
        q: 'Do you provide video lectures?',
        a: 'Yes, we offer video lectures from experienced educators covering all major topics. Premium subscribers get access to our complete video library with downloadable options.'
      }
    ]
  },
  {
    category: 'Technical Support',
    questions: [
      {
        q: 'The app is not working properly. What should I do?',
        a: 'First, try closing and reopening the app. If the issue persists, try clearing the app cache from your device settings. Make sure you have the latest version installed. If problems continue, contact us at samadhangsexam@gmail.com with details of the issue.'
      },
      {
        q: 'I forgot my password. How can I reset it?',
        a: 'Click on "Forgot Password" on the login screen and enter your registered email or phone number. You will receive a password reset link or OTP to create a new password.'
      },
      {
        q: 'My data/progress is not syncing across devices.',
        a: 'Ensure you are logged in with the same account on all devices and have a stable internet connection. Try manually syncing from the app settings. If the issue persists, contact our support team.'
      },
      {
        q: 'How do I delete my account and data?',
        a: 'You can request account deletion from the app settings or by visiting our Data Deletion page. We will process your request within 30 days as per our privacy policy. Note that this action is irreversible.'
      }
    ]
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-300 text-lg">
              Find answers to common questions about Samadhan GS
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                  {category.category}
                </h2>

                <div className="space-y-3">
                  {category.questions.map((faq, faqIndex) => {
                    const itemId = `${categoryIndex}-${faqIndex}`
                    const isOpen = openItems.includes(itemId)

                    return (
                      <div
                        key={faqIndex}
                        className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-white font-medium pr-4">{faq.q}</span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-4 text-gray-300 border-t border-white/10 pt-4">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30 text-center">
            <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
            <p className="text-gray-300 mb-6">
              Cannot find the answer you are looking for? Please reach out to our support team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:samadhangsexam@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                <Mail className="w-5 h-5" />
                Email Support
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
