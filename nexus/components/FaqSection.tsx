// file: components/FaqSection.tsx
"use client";

import { useState } from 'react';
import FaqItem from './FaqItem';

const faqData = [
  {
    q: "What is Nexus API?",
    a: "Nexus API is a powerful tool for developers to easily embed high-quality video content, including movies, TV shows, and anime, into their websites or applications. We provide a simple yet highly customizable player."
  },
  {
    q: "Is the API free to use?",
    a: "Yes, our core API for embedding content is completely free for all developers. We believe in providing accessible tools to the community. Advanced features or higher traffic limits may be part of future premium plans."
  },
  {
    q: "Where do you source your content from?",
    a: "We aggregate content from a wide variety of publicly available, third-party sources. We do not host any content on our own servers. Our service acts as an intelligent proxy to find and stream the best available source for the requested media."
  },
  {
    q: "How do I get a TMDB or Anilist ID?",
    a: "You can find the ID for a movie or TV show in the URL of its page on The Movie Database (TMDB). For example, the URL for The Dark Knight is themoviedb.org/movie/155-the-dark-knight, so the ID is 155. Similarly, you can find the Anilist ID in the URL on anilist.co."
  },
  {
    q: "Can I customize the appearance of the player?",
    a: "Absolutely! Our player is designed to be highly customizable. You can change primary, secondary, and icon colors, add a custom logo, and toggle nearly every UI element on or off via URL parameters. Check our Player Demo and API Docs for all available options."
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Buka item pertama secara default

  const handleToggle = (index: number) => {
    // Jika item yang diklik sudah terbuka, tutup. Jika tidak, buka.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 px-4 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-zinc-400">
            Have questions? We've got answers. If you can't find what you're looking for, feel free to join our community.
          </p>
        </div>
        <div className="space-y-2">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
