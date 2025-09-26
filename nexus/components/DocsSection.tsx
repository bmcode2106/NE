// file: components/DocsSection.tsx
"use client"; // Menjadikan ini komponen klien

import { useState, useEffect } from 'react';
import { ApiDocsCard } from './ApiDocsCard';

const DocsSection = () => {
  const [domain, setDomain] = useState('');

  useEffect(() => {
    // Deteksi domain saat komponen dimuat di browser
    setDomain(window.location.origin);
  }, []);

  return (
    <section id="docs" className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            API Documentation
          </h2>
          <p className="text-zinc-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Use our API to embed movies, TV shows, and anime with a fully customizable player on your own site.
          </p>
        </div>

        <div className="space-y-8 w-full">
          <ApiDocsCard
            title="Embed Movies"
            descriptionNode={
              <>
                Use the ID from{' '}
                <a href="https://www.themoviedb.org/" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors" target="_blank" rel="noopener noreferrer">
                  The Movie Database (TMDB)
                </a>. All player parameters are optional.
              </>
            }
            urlPath="/embed/movie/{tmdbId}?autoplay=true&..."
            codeExamplePath='/embed/movie/78692'
            domain={domain}
          />

          <ApiDocsCard
            title="Embed TV Shows"
            descriptionNode={
              <>
                Use the TV ID, season, and episode number. All player parameters are optional.
              </>
            }
            urlPath="/embed/tv/{tmdbId}/{season}/{episode}?autonext=true&..."
            codeExamplePath='/embed/tv/94997/1/1'
            domain={domain}
          />

          <ApiDocsCard
            title="Embed Anime"
            descriptionNode={
              <>
                Use the ID from{' '}
                <a href="https://anilist.co/" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors" target="_blank" rel="noopener noreferrer">
                  Anilist
                </a>
                , episode number, and optional dub parameter.
              </>
            }
            urlPath="/embed/anime/{anilistId}/{episode}?dub=true&..."
            codeExamplePath='/embed/anime/21/1?dub=true'
            domain={domain}
          />
        </div>
      </div>
    </section>
  );
};

export default DocsSection;
