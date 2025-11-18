import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { Shield, Eye, Lock, Database, Share2, UserCheck, Mail, Calendar } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Samadhan GS',
  description: 'Privacy Policy for Samadhan GS - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-300 text-lg">
              Your privacy is important to us. This policy explains how we handle your data.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Last updated: November 2024</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-blue-400" />
                Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Samadhan GS ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website. We are based in India and comply with applicable Indian data protection laws, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-green-400" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name and email address</li>
                    <li>Phone number (optional)</li>
                    <li>Profile information (photo, bio)</li>
                    <li>Educational background and exam preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Usage Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>App usage patterns and preferences</li>
                    <li>Quiz and test performance data</li>
                    <li>Learning progress and analytics</li>
                    <li>Device information and IP address</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-purple-400" />
                How We Use Your Information
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>To provide and personalize our educational services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>To track your learning progress and provide recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>To send important updates, notifications, and promotional content</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>To improve our app and develop new features</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>To comply with legal obligations</span>
                </li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Share2 className="w-6 h-6 text-yellow-400" />
                Data Sharing & Disclosure
              </h2>
              <p className="text-gray-300 mb-4">
                We do not sell your personal information. We may share your data with:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Service Providers:</strong> Third-party services that help us operate our platform (analytics, cloud storage, payment processing)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Legal Requirements:</strong> When required by law or to protect our rights</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Business Transfers:</strong> In connection with any merger or acquisition</span>
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-red-400" />
                Data Security
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-gray-300 mb-4">Under Indian data protection laws, you have the right to:</p>
              <ul className="space-y-2 text-gray-300">
                <li>• Access your personal data</li>
                <li>• Correct inaccurate data</li>
                <li>• Request deletion of your data</li>
                <li>• Withdraw consent for data processing</li>
                <li>• Data portability</li>
                <li>• Nominate a person to exercise rights on your behalf</li>
              </ul>
              <p className="text-gray-300 mt-4">
                To exercise these rights, please visit our <a href="/data-deletion" className="text-blue-400 hover:underline">Data Deletion page</a> or contact us at the email below.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-blue-400" />
                Contact Us
              </h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white font-semibold">Samadhan GS</p>
                <a href="mailto:samadhangsexam@gmail.com" className="text-blue-400 hover:underline">
                  samadhangsexam@gmail.com
                </a>
              </div>
            </section>

            {/* Changes */}
            <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
