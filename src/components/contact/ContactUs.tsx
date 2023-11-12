import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Helmet } from 'react-helmet-async';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactUs: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await emailjs.sendForm(
        'service_q23e30r',
        'template_dfrr51h',
        form.current!,
        '6JQLIprPQ7z5sW35J'
      );

      console.log(result.text);
      alert('Email sent successfully.');

      // Clear the form after successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error: any) {
      console.error(error.text);
      alert('Failed to send email. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
    <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <Header />
      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md p-4 bg-white shadow-md rounded-md">
          <h1 className="text-3xl font-semibold text-center mb-6">Contact Us</h1>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700">Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="btn btn-block bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
