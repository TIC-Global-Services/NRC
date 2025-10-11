import React from "react";

const ContactForm = () => {
  return (
    <form className="bg-[#F6F9FC]">
      {/* Grid layout for inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            First Name
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3 rounded-full bg-white border border-gray-300 focus:ring-2 focus:ring-[#6A48E8] focus:outline-none"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3 rounded-full bg-white border border-gray-300 focus:ring-2 focus:ring-[#6A48E8] focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full px-4 py-3 rounded-full bg-white border border-gray-300 focus:ring-2 focus:ring-[#6A48E8] focus:outline-none"
          />
        </div>

        {/* Phone Number / Product */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="Select Product"
            className="w-full px-4 py-3 rounded-full bg-white border border-gray-300 focus:ring-2 focus:ring-[#6A48E8] focus:outline-none"
          />
        </div>
      </div>

      {/* Message */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Message
        </label>
        <textarea
          placeholder="Insert a Message"
          rows={5}
          className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-300 focus:ring-2 focus:ring-[#6A48E8] focus:outline-none resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-black text-white flex items-center space-x-2 hover:bg-gray-900 transition-all"
        >
          <span>Submit</span>
          <span className="w-2 h-2 bg-white rounded-full"></span>
        </button>
      </div>
    </form>
  );
};

export default ContactForm;