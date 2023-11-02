import React from 'react'

export default function ContactPage() {
  return (
    <section className="bg-white">
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-bold text-center text-[#32334A]">
        Contact Us
      </h2>
      <p className="mb-5 lg:mb-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
      Get in touch and share your questions, feedback, ideas, and or suggestions with us. We'd love to hear from you.
      </p>
      <form className="space-y-8">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium ">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500   placeholder-gray-400 focus:border-primary-500"
            placeholder="email@gmail.com"
     
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block mb-2 text-sm font-medium "
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500   placeholder-gray-400 focus:border-primary-500"
            placeholder="How we can help you"
           
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium "
          >
            Your message
          </label>
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500   placeholder-gray-400 focus:border-primary-500"
            placeholder="Leave a comment..."
            defaultValue={""}
           
          />
        </div>
        <button
          type="submit"
          className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-[#32334A] hover:bg-[#3f415a]"
        >
          Send message
        </button>
      </form>
    </div>
  </section>
  )
}
