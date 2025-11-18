'use client'

import { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { Trash2, AlertTriangle, Mail, CheckCircle, Info } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DataDeletionPage() {
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!confirmed) return

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    // In production, you would send this to your backend
    console.log('Deletion request:', { email, reason })

    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl mb-6">
              <Trash2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Data Deletion Request</h1>
            <p className="text-gray-300 text-lg">
              Request deletion of your personal data from Samadhan GS
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Request Submitted</h2>
              <p className="text-gray-300 mb-6">
                Your data deletion request has been received. We will process your request within 30 days as per our privacy policy. You will receive a confirmation email once the deletion is complete.
              </p>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-left">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-300">
                    <p className="mb-2">If you do not receive a confirmation email within 48 hours, please contact us at:</p>
                    <a href="mailto:samadhangsexam@gmail.com" className="text-blue-400 hover:underline">
                      samadhangsexam@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Warning */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Important Information</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• This action is <strong className="text-red-400">irreversible</strong> - all your data will be permanently deleted</li>
                      <li>• Your account will be deactivated and you will lose access to all premium features</li>
                      <li>• Your learning progress, quiz history, and achievements will be deleted</li>
                      <li>• Any active subscription will be cancelled (no refund for remaining period)</li>
                      <li>• Processing may take up to 30 days to complete</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* What Gets Deleted */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Data that will be deleted:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Account information (name, email, phone)',
                    'Profile data and preferences',
                    'Quiz and test scores',
                    'Learning progress and analytics',
                    'Saved bookmarks and notes',
                    'Subscription and payment history',
                    'App usage data',
                    'Device information'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Deletion Form */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Submit Deletion Request</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Registered Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Enter your registered email"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Enter the email address associated with your Samadhan GS account
                    </p>
                  </div>

                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                      Reason for deletion (optional)
                    </label>
                    <textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                      placeholder="Help us improve by sharing why you want to delete your account"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="confirm"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-gray-500 bg-white/10 text-red-500 focus:ring-red-500"
                    />
                    <label htmlFor="confirm" className="text-sm text-gray-300">
                      I understand that this action is irreversible and all my data will be permanently deleted from Samadhan GS servers. I confirm that I want to proceed with the deletion.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!confirmed || isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5" />
                        Submit Deletion Request
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Alternative Options */}
              <div className="bg-blue-500/10 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30">
                <h3 className="text-lg font-semibold text-white mb-4">Before you go...</h3>
                <p className="text-gray-300 text-sm mb-4">
                  If you are facing issues with our app or have concerns, we would love to help resolve them. Consider these alternatives:
                </p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Pause your subscription</strong> instead of deleting your account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Contact support</strong> if you are having technical issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Adjust notifications</strong> if you are receiving too many emails</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <a
                    href="mailto:samadhangsexam@gmail.com"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Contact us at samadhangsexam@gmail.com
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
