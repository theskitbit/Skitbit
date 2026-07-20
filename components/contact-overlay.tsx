import React, { useState } from 'react';

// components/contact-overlay.tsx

const ContactOverlay = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const name = formData.get('name') as string || 'Client';
      const message = formData.get('message') as string || 'I am interested in your services.';

      // Construct the WhatsApp message URL
      const whatsappMessage = encodeURIComponent(`Hello, my name is ${name}. ${message}`);
      const phoneNumber = '1234567890'; // Replace with your actual phone number
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      // Optionally reset form
      form.reset();
    } catch (err) {
      setError('Failed to prepare your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input 
            name="name" 
            placeholder="Your Name" 
            required 
            className="w-full border p-2 mb-4"
          />
          <textarea 
            name="message" 
            placeholder="Your Message" 
            required 
            className="w-full border p-2 mb-4"
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 w-full"
          >
            {isSubmitting ? 'Opening WhatsApp...' : 'Send via WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactOverlay;
