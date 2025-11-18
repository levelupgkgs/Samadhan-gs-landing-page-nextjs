import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { FileText, AlertTriangle, CheckCircle, XCircle, Scale, Mail, Calendar } from 'lucide-react'

export const metadata = {
  title: 'Terms and Conditions | Samadhan GS',
  description: 'Terms and Conditions for using Samadhan GS app and services.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms and Conditions</h1>
            <p className="text-gray-300 text-lg">
              Please read these terms carefully before using our services.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Last updated: November 2024</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Agreement */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing or using the Samadhan GS mobile application and website (collectively, the "Service"), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service in India and worldwide.
              </p>
            </section>

            {/* Eligibility */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">2. Eligibility</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                To use our Service, you must:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Be at least 13 years of age</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Have parental/guardian consent if under 18 years of age</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Provide accurate and complete registration information</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Agree to these Terms and our Privacy Policy</span>
                </li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
                <p>
                  You agree to notify us immediately of any unauthorized access to or use of your account. We reserve the right to suspend or terminate accounts that violate these Terms.
                </p>
              </div>
            </section>

            {/* Acceptable Use */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                4. Acceptable Use
              </h2>
              <p className="text-gray-300 mb-4">You agree to use the Service only for lawful purposes and in accordance with these Terms. You may:</p>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• Access educational content for personal, non-commercial use</li>
                <li>• Take quizzes, tests, and practice exams</li>
                <li>• Track your learning progress</li>
                <li>• Share your achievements on social media</li>
                <li>• Provide feedback and suggestions</li>
              </ul>
            </section>

            {/* Prohibited Activities */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-400" />
                5. Prohibited Activities
              </h2>
              <p className="text-gray-300 mb-4">You agree NOT to:</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>Copy, distribute, or share our content without permission</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>Use the Service for any commercial purpose without authorization</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>Attempt to hack, reverse engineer, or disrupt the Service</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>Share your account credentials with others</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>Use automated systems to access the Service</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>Post false, misleading, or harmful content</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>Violate any applicable laws or regulations</span>
                </li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed">
                The Service and its original content, features, and functionality are owned by Samadhan GS and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. Our content includes but is not limited to text, graphics, logos, images, audio, video, quizzes, and software.
              </p>
            </section>

            {/* Subscriptions & Payments */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">7. Subscriptions & Payments</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Some features of our Service require a paid subscription. Payment will be charged to your chosen payment method. Subscriptions automatically renew unless cancelled before the renewal date.
                </p>
                <p>
                  <strong className="text-white">Refund Policy:</strong> We offer refunds within 7 days of purchase if you are not satisfied with our Service. Refunds are processed to the original payment method within 5-7 business days.
                </p>
                <p>
                  All prices are in Indian Rupees (INR) and include applicable GST.
                </p>
              </div>
            </section>

            {/* Disclaimers */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                8. Disclaimers
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We do not guarantee that our content is error-free or that it will help you pass any specific examination.
                </p>
                <p>
                  Educational content is provided for informational purposes only and should not be considered as professional advice. We recommend verifying important information from official sources.
                </p>
                <p>
                  We are not responsible for any decisions you make based on information provided through our Service.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                To the maximum extent permitted by applicable law, Samadhan GS shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses, resulting from your use or inability to use the Service.
              </p>
            </section>

            {/* Governing Law */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Scale className="w-6 h-6 text-blue-400" />
                10. Governing Law
              </h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>

            {/* Changes */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-blue-400" />
                Contact Us
              </h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white font-semibold">Samadhan GS</p>
                <a href="mailto:samadhangsexam@gmail.com" className="text-blue-400 hover:underline">
                  samadhangsexam@gmail.com
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
