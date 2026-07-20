'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// --- Context & Hook for Global Modal State ---

interface ContactOverlayContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ContactOverlayContext = createContext<ContactOverlayContextType | undefined>(undefined);

export const useContactOverlay = () => {
  const context = useContext(ContactOverlayContext);
  if (!context) {
    throw new Error('useContactOverlay must be used within a ContactOverlayProvider');
  }
  return context;
};

export const ContactOverlayProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <ContactOverlayContext.Provider value={{ isOpen, open, close }}>
      {children}
      {isOpen && <ContactOverlay onClose={close} />}
    </ContactOverlayContext.Provider>
  );
};

// --- The WhatsApp Contact Modal Component ---

const ContactOverlay = ({ onClose }: { onClose: () => void }) => {
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
      const phoneNumber = '1234567890'; // IMPORTANT: Replace with your actual country code + phone number (no '+' or '00')
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      form.reset();
      onClose(); // Automatically close the overlay after clicking send
    } catch (err) {
      setError('Failed to prepare your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-black">Contact Us</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input 
            name="name" 
            placeholder="Your Name" 
            required 
            className="w-full border border-gray-300 rounded p-2 mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea 
            name="message" 
            placeholder="Your Message" 
            required 
            rows={4}
            className="w-full border border-gray-300 rounded p-2 mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-blue-600 text-white font-medium px-4 py-3 rounded disabled:opacity-50 w-full hover:bg-blue-700 transition-colors"
          >
            {isSubmitting ? 'Opening WhatsApp...' : 'Send via WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactOverlay;
