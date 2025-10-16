"use client";
import React, { useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const scriptURL = process.env.NEXT_PUBLIC_CONTACT_FORM_URL as string;

    try {
      const res = await fetch(scriptURL, { method: "POST", body: formData });
      if (res.ok) {
        setStatus("Message sent successfully!");
        form.reset();
      } else {
        setStatus("Failed to send message. Try again later.");
      }
    } catch (err) {
      setStatus("Error occurred. Please check your connection.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#F6F9FC] p-6 rounded-2xl space-y-6"
    >
      {/* Grid layout for inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            required
            className="w-full px-4 py-3 rounded-full bg-white border border-gray-300 focus:ring-2 focus:ring-[#6A48E8] focus:outline-none"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            required
            className="w-full px-4 py-3 rounded-full bg-white border border-gray-300 focus:ring-2 focus:ring-[#6A48E8] focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="example@gmail.com"
            required
            className="w-full px-4 py-3 rounded-full bg-white border border-gray-300 focus:ring-2 focus:ring-[#6A48E8] focus:outline-none"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Phone Number
          </label>
          <input
            name="phone"
            type="text"
            placeholder="00000 00000"
            required
            className="w-full px-4 py-3 rounded-full bg-white border border-gray-300 focus:ring-2 focus:ring-[#6A48E8] focus:outline-none"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Message
        </label>
        <textarea
          name="message"
          placeholder="Insert a Message"
          rows={5}
          required
          className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-300 focus:ring-2 focus:ring-[#6A48E8] focus:outline-none resize-none"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-black text-white flex items-center space-x-2 hover:bg-gray-900 transition-all"
        >
          <span>Submit</span>
          <span className="w-2 h-2 bg-white rounded-full"></span>
        </button>
      </div>

      {/* Status Message */}
      {status && (
        <p className="text-sm mt-3 text-gray-700 font-medium">{status}</p>
      )}
    </form>
  );
};

export default ContactForm;
