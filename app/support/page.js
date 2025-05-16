"use client";
import { useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineMessage } from "react-icons/ai";

export default function SupportPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await fetch("/api/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setSubmitted(true);
          alert("Your message has been sent!");
          setFormData({ name: "", email: "", message: "" });
        } else {
          const data = await res.json();
          alert("Failed to send: " + (data.error || "Unknown error"));
          setSubmitted(false);
        }
      } catch (error) {
        alert("Error sending message: " + error.message);
        setSubmitted(false);
      }
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 pb-20 bg-gray-900 flex justify-center items-start">
      <div className="w-full max-w-lg sm:max-w-md xs:max-w-sm px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-8 sm:p-6 xs:p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl"
        >
          <h1 className="text-3xl font-semibold text-center mb-8 text-indigo-600">Support & Contact</h1>

          {/* Name Field */}
          <div className="relative mb-6">
            <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`pl-10 pr-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="relative mb-6">
            <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={`pl-10 pr-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Message Field */}
          <div className="relative mb-6">
            <AiOutlineMessage className="absolute left-3 top-3 text-gray-400" size={20} />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className={`pl-10 pr-3 pt-3 pb-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              rows={5}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700 transition transform hover:-translate-y-0.5"
          >
            Send Message
          </button>

          {submitted && (
            <p className="mt-4 text-green-600 font-semibold text-center animate-fadeIn">Thank you for contacting us!</p>
          )}
        </form>
      </div>
    </div>
  );
}
