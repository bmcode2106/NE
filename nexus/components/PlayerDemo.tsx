// file: components/PlayerDemo.tsx
"use client";

import { useState, useEffect } from 'react';
import { Film, Tv, Book, Copy, Check } from 'lucide-react';

type ContentType = 'movie' | 'tv' | 'anime';

const PlayerDemo = () => {
  const [activeTab, setActiveTab] = useState<ContentType>('movie');
  
  const [mediaId, setMediaId] = useState('597');
  const [season, setSeason] = useState('1');
  const [episode, setEpisode] = useState('1');
  const [isDub, setIsDub] = useState(false);

  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  
  const [domain, setDomain] = useState('');
  const [isClient, setIsClient] = useState(false); // State untuk menandakan sudah di client

  useEffect(() => {
    // Jalankan sekali saat mount untuk mendeteksi domain dan menandakan kita di client
    setIsClient(true);
    setDomain(window.location.origin);
  }, []);

  useEffect(() => {
    // Cek isClient atau domain untuk memastikan URL hanya dibuat di client-side
    if (!isClient) return;

    let urlPath = '/embed/';
    
    switch (activeTab) {
      case 'movie':
        urlPath += `movie/${mediaId || '597'}`;
        break;
      case 'tv':
        urlPath += `tv/${mediaId || '1399'}/${season || '1'}/${episode || '1'}`;
        break;
      case 'anime':
        const animeEpisode = episode || '1';
        urlPath += `anime/${mediaId || '21'}/${animeEpisode}?dub=${isDub}`;
        break;
      default:
        urlPath += 'movie/597';
    }
    
    setGeneratedUrl(`${domain}${urlPath}`);

  }, [activeTab, mediaId, season, episode, isDub, domain, isClient]);

  const handleCopy = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleTabChange = (tab: ContentType) => {
    setActiveTab(tab);
    if (tab === 'movie') {
      setMediaId('597');
      setEpisode('1');
    } else if (tab === 'tv') {
      setMediaId('1399');
      setSeason('1');
      setEpisode('1');
    } else if (tab === 'anime') {
      setMediaId('21');
      setEpisode('1');
      setIsDub(false);
    }
  };


  const renderInputs = () => {
    switch (activeTab) {
      case 'movie':
        return (
          <input className="input-style" placeholder="Enter Movie ID (TMDB)" value={mediaId} onChange={(e) => setMediaId(e.target.value)} />
        );
      case 'tv':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input className="input-style" placeholder="TV ID (TMDB)" value={mediaId} onChange={(e) => setMediaId(e.target.value)} />
            <input className="input-style" placeholder="Season" type="number" value={season} onChange={(e) => setSeason(e.target.value)} />
            <input className="input-style" placeholder="Episode" type="number" value={episode} onChange={(e) => setEpisode(e.target.value)} />
          </div>
        );
      case 'anime':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <input className="input-style" placeholder="Anime ID (Anilist)" value={mediaId} onChange={(e) => setMediaId(e.target.value)} />
            <div className="flex gap-4 items-center justify-center">
              <input className="input-style" placeholder="Episode" type="number" value={episode} onChange={(e) => setEpisode(e.target.value)} />
              <div className="flex items-center gap-3">
                <span className="font-medium text-white/80">Dub</span>
                <button
                  type="button"
                  onClick={() => setIsDub(!isDub)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-800 ${isDub ? 'bg-purple-600' : 'bg-zinc-600'}`}
                  role="switch"
                  aria-checked={isDub}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isDub ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="player" className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Advanced <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Player</span>
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Our powerful custom player allows you to test the embedding experience exactly how you want it.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-4 sm:p-6 mb-8 border border-zinc-800">
          <div className="flex justify-center mb-6">
            <div className="bg-zinc-800 rounded-lg p-1 flex gap-1">
              <button onClick={() => handleTabChange('movie')} className={`tab-button ${activeTab === 'movie' ? 'bg-purple-600 text-white shadow-lg' : 'text-white/70 hover:bg-zinc-700'}`}>
                <Film className="w-4 h-4" /> MOVIE
              </button>
              <button onClick={() => handleTabChange('tv')} className={`tab-button ${activeTab === 'tv' ? 'bg-purple-600 text-white shadow-lg' : 'text-white/70 hover:bg-zinc-700'}`}>
                <Tv className="w-4 h-4" /> SERIES
              </button>
              <button onClick={() => handleTabChange('anime')} className={`tab-button ${activeTab === 'anime' ? 'bg-purple-600 text-white shadow-lg' : 'text-white/70 hover:bg-zinc-700'}`}>
                <Book className="w-4 h-4" /> ANIME
              </button>
            </div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
            {renderInputs()}
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-700/50">
            <h3 className="text-xl font-semibold text-white">Player Preview</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6 relative border border-zinc-700">
              {/* Render iframe hanya jika URL sudah siap (isClient true) */}
              {isClient && generatedUrl ? (
                <iframe
                  key={generatedUrl}
                  src={generatedUrl.replace(domain, 'https://player.vidplus.to')}
                  title="Embedded Player"
                  className="w-full h-full border-0"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-white/50">Loading player preview...</p>
                </div>
              )}
            </div>
            <div className="bg-zinc-800/50 rounded-xl border border-zinc-700/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">Generated Player Link</span>
                <button onClick={handleCopy} className="inline-flex items-center justify-center gap-2 text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-md h-8 px-3 transition-all duration-200">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-black/40 p-3 rounded-lg border border-zinc-700">
                <p className="text-sm font-mono break-all text-zinc-300">
                  {generatedUrl || 'Generating link...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerDemo;
