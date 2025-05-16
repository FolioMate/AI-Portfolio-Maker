"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGeneratePortfolio = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Generate a portfolio introduction for a developer." }] }],
          }),
        }
      );

      const data = await response.json();

      if (data && data.candidates?.length > 0) {
        console.log("Generated Portfolio:", data.candidates[0].content.parts[0].text);
      }

      router.push("/templates");
    } catch (err) {
      console.error("Gemini API Error:", err);
      setError("❌ Failed to generate portfolio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 pt-24 pb-20 bg-gray-800 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-2 p-6 shadow-md text-left w-full rounded-lg bg-gray-100"
        >
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">About This Website – FolioMate</h2>
          <p className="text-gray-700">
            Welcome to <strong>FolioMate</strong>, your ultimate AI-powered portfolio builder designed to help professionals,
            students, and creatives showcase their work effortlessly.
          </p>
          <ul className="mt-3 space-y-2 text-gray-600 list-disc pl-5">
            <li><strong>AI-Powered Portfolio Creation</strong> – Generate a professional portfolio based on your skills and experience.</li>
            <li><strong>Customizable Templates</strong> – Choose from a variety of modern and responsive designs.</li>
            <li><strong>Seamless Integration</strong> – Easily add projects, resumes, and social media links.</li>
            <li><strong>User-Friendly Interface</strong> – No coding skills required – just input your details, and AI does the rest!</li>
            <li><strong>SEO & Performance Optimized</strong> – Ensure your portfolio stands out and loads quickly.</li>
          </ul>
          <p className="mt-3 text-gray-700">
            With FolioMate, you can build, customize, and share your portfolio with potential clients and employers in minutes.
          </p>
          <p className="mt-3 font-semibold text-green-600">🚀 Create. Showcase. Succeed.</p>
        </motion.div>

        {/* Use Cases Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="border-2 p-6 shadow-md text-center w-full rounded-lg bg-gray-100 flex flex-col items-center"
        >
          <h2 className="text-2xl font-semibold text-purple-600 mb-3">Showcase Real-World Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {[
              { title: "Developer Portfolio", desc: "Showcase coding projects, GitHub repos, and blogs." },
              { title: "Designer Portfolio", desc: "Highlight design work and visual creativity." },
              { title: "Student Resume", desc: "Present skills, internships, and academics." },
              { title: "Freelancer Profile", desc: "Promote services with testimonials and projects." },
            ].map((useCase, i) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-6 border rounded-lg shadow bg-white transition-all duration-300"
                key={i}
              >
                <h3 className="font-semibold text-gray-800 text-lg">{useCase.title}</h3>
                <p className="text-sm text-gray-600">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-6xl mt-10 px-4"
      >
        <h2 className="text-2xl font-semibold text-purple-700 text-center mb-4">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "AI-Powered", description: "Automatically generates your portfolio." },
            { title: "Responsive", description: "Looks great on all devices." },
            { title: "Customizable", description: "Personalize with themes and styles." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-4 border rounded-lg shadow bg-gray-100 text-center"
            >
              <h3 className="font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-6xl mt-10 px-4"
      >
        <h2 className="text-2xl font-semibold text-purple-700 text-center mb-4">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { step: "Step 1", text: "Enter your details & skills." },
            { step: "Step 2", text: "Select a template and customize." },
            { step: "Step 3", text: "Publish & share your portfolio." },
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-4 border rounded-lg shadow bg-gray-100 text-center"
            >
              <h3 className="font-semibold text-gray-800">{step.step}</h3>
              <p className="text-sm text-gray-600">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className="mt-8 flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={handleGeneratePortfolio}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition transform ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
          } text-white`}
        >
          {loading ? "Generating..." : "Start Building"} <FaArrowRight />
        </button>
      </motion.div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
