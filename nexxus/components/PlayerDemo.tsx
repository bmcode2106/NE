// file: components/PlayerDemo.tsx
"use client";

import { useState, useEffect } from 'react';
import { SettingsToggle } from './SettingsToggle';
import { ColorPicker } from './ColorPicker';
import { Film, Tv, Book, Copy, Check, Play, Zap, ChevronsRight, Tv2, Indent, Download, Cast, ListVideo, Server, Settings, PictureInPicture, Star, Timer } from 'lucide-react';

type ContentType = 'movie' | 'tv' | 'anime';

const PlayerDemo = () => {
  // State untuk Konten
  const [activeTab, setActiveTab] = useState<ContentType>('movie');
  const [mediaId, setMediaId] = useState('597');
  const [season, setSeason] = useState('1');
  const [episode, setEpisode] = useState('1');
  const [isDub, setIsDub] = useState(false);
  
  // State untuk Pengaturan Player
  const [autoplay, setAutoplay] = useState(true);
  const [autoNext, setAutoNext] = useState(true);
  const [showNextButton, setShowNextButton] = useState(true);
  const [showPoster, setShowPoster] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [download, setDownload] = useState(false);
  const [chromecast, setChromecast] = useState(true);
  const [episodeList, setEpisodeList] = useState(true);
  const [serverIcon, setServerIcon] = useState(true);
  const [settingIcon, setSettingIcon] = useState(true);
  const [pipIcon, setPipIcon] = useState(true);
  const [watchparty, setWatchparty] = useState(false);
  const [progress, setProgress] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#6C63FF');
  const [secondaryColor, setSecondaryColor] = useState('#9F9BFF');
  const [iconColor, setIconColor] = useState('#FFFFFF');
  // const [logoUrl, setLogoUrl] = useState(...) // --> DIHAPUS

  // State untuk URL dan UI
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [domain, setDomain] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setDomain(window.location.origin);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let path = '/embed/';
    switch (activeTab) {
      case 'movie': path += `movie/${mediaId || '597'}`; break;
      case 'tv': path += `tv/${mediaId || '1399'}/${season || '1'}/${episode || '1'}`; break;
      case 'anime': path += `anime/${mediaId || '21'}/${episode || '1'}`; break;
    }

    const params = new URLSearchParams();
    if (activeTab === 'anime') params.append('dub', String(isDub));
    params.append('autoplay', String(autoplay));
    params.append('autonext', String(autoNext));
    params.append('nextbutton', String(showNextButton));
    params.append('poster', String(showPoster));
    params.append('title', String(showTitle));
    params.append('download', String(download));
    params.append('chromecast', String(chromecast));
    params.append('episodelist', String(episodeList));
    params.append('server', String(serverIcon));
    params.append('setting', String(settingIcon));
    params.append('pip', String(pipIcon));
    params.append('watchparty', String(watchparty));
    params.append('primarycolor', primaryColor.substring(1));
    params.append('secondarycolor', secondaryColor.substring(1));
    params.append('iconcolor', iconColor.substring(1));
    // if (logoUrl) params.append('logourl', logoUrl); // --> DIHAPUS
    if (progress) params.append('progress', progress);
    
    setGeneratedUrl(`${domain}${path}?${params.toString()}`);

  }, [
    isClient, domain, activeTab, mediaId, season, episode, isDub,
    autoplay, autoNext, showNextButton, showPoster, showTitle, download, chromecast,
    episodeList, serverIcon, settingIcon, pipIcon, watchparty, progress,
    primaryColor, secondaryColor, iconColor // logoUrl DIHAPUS DARI DEPENDENCY
  ]);

  const handleCopy = () => { if (generatedUrl) { navigator.clipboard.writeText(generatedUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }};
  
  const handleTabChange = (tab: ContentType) => {
    setActiveTab(tab);
    if (tab === 'movie') setMediaId('597');
    else if (tab === 'tv') setMediaId('1399');
    else if (tab === 'anime') setMediaId('21');
  };
  
  const renderInputs = () => {
    switch (activeTab) {
      case 'movie':
        return <input className="input-style" placeholder="Enter Movie ID (TMDB)" value={mediaId} onChange={(e) => setMediaId(e.target.value)} />;
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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Advanced <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Player</span></h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto">Our powerful custom player allows you to test the embedding experience exactly how you want it.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-zinc-900 rounded-lg p-4 sm:p-6 mb-8 border border-zinc-800">
              <div className="flex justify-center mb-6"><div className="bg-zinc-800 rounded-lg p-1 flex gap-1">
                <button onClick={() => handleTabChange('movie')} className={`tab-button ${activeTab === 'movie' ? 'bg-purple-600 text-white shadow-lg' : 'text-white/70 hover:bg-zinc-700'}`}><Film className="w-4 h-4" /> MOVIE</button>
                <button onClick={() => handleTabChange('tv')} className={`tab-button ${activeTab === 'tv' ? 'bg-purple-600 text-white shadow-lg' : 'text-white/70 hover:bg-zinc-700'}`}><Tv className="w-4 h-4" /> SERIES</button>
                <button onClick={() => handleTabChange('anime')} className={`tab-button ${activeTab === 'anime' ? 'bg-purple-600 text-white shadow-lg' : 'text-white/70 hover:bg-zinc-700'}`}><Book className="w-4 h-4" /> ANIME</button>
              </div></div>
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">{renderInputs()}</div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-700/50"><h3 className="text-xl font-semibold text-white">Player Preview</h3></div>
              <div className="p-4 sm:p-6">
                <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6 relative border border-zinc-700">
                  {isClient && generatedUrl ? (<iframe key={generatedUrl} src={generatedUrl.replace(domain, 'https://player.vidplus.to')} title="Embedded Player" className="w-full h-full border-0" allowFullScreen allow="autoplay; encrypted-media" />) : (<div className="w-full h-full flex items-center justify-center"><p className="text-white/50">Loading player preview...</p></div>)}
                </div>
                <div className="bg-zinc-800/50 rounded-xl border border-zinc-700/50 p-4">
                  <div className="flex items-center justify-between mb-2"><span className="text-sm font-semibold text-white">Generated Player Link</span><button onClick={handleCopy} className="inline-flex items-center justify-center gap-2 text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-md h-8 px-3 transition-all duration-200">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? 'Copied!' : 'Copy'}</button></div>
                  <div className="bg-black/40 p-3 rounded-lg border border-zinc-700"><p className="text-sm font-mono break-all text-zinc-300">{generatedUrl || 'Generating link...'}</p></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-700/50"><h3 className="text-xl font-semibold text-white">Player Settings</h3></div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4"><ColorPicker label="Primary" color={primaryColor} onColorChange={setPrimaryColor} /><ColorPicker label="Secondary" color={secondaryColor} onColorChange={setSecondaryColor} /><ColorPicker label="Icon" color={iconColor} onColorChange={setIconColor} /></div>
                <div className="space-y-2">
                  <SettingsToggle label="Autoplay" description="Start playing automatically" icon={<Play className="w-4 h-4 text-purple-400" />} checked={autoplay} onCheckedChange={setAutoplay} colorClass='bg-purple-500' />
                  <SettingsToggle label="Auto Next" description="Continue to next automatically" icon={<Zap className="w-4 h-4 text-blue-400" />} checked={autoNext} onCheckedChange={setAutoNext} colorClass='bg-blue-500' />
                  <SettingsToggle label="Next Button" description="Display next episode button" icon={<ChevronsRight className="w-4 h-4 text-green-400" />} checked={showNextButton} onCheckedChange={setShowNextButton} colorClass='bg-green-500' />
                  <SettingsToggle label="Show Poster" description="Display content poster image" icon={<Tv2 className="w-4 h-4 text-orange-400" />} checked={showPoster} onCheckedChange={setShowPoster} colorClass='bg-orange-500' />
                  <SettingsToggle label="Show Title" description="Display content title" icon={<Indent className="w-4 h-4 text-indigo-400" />} checked={showTitle} onCheckedChange={setShowTitle} colorClass='bg-indigo-500' />
                  <SettingsToggle label="Download" description="Enable download button" icon={<Download className="w-4 h-4 text-teal-400" />} checked={download} onCheckedChange={setDownload} colorClass='bg-teal-500' />
                  <SettingsToggle label="Chromecast" description="Enable Chromecast support" icon={<Cast className="w-4 h-4 text-sky-400" />} checked={chromecast} onCheckedChange={setChromecast} colorClass='bg-sky-500' />
                  <SettingsToggle label="Episode List" description="Show episode list button" icon={<ListVideo className="w-4 h-4 text-purple-400" />} checked={episodeList} onCheckedChange={setEpisodeList} colorClass='bg-purple-500' />
                  <SettingsToggle label="Server Icon" description="Show server selection icon" icon={<Server className="w-4 h-4 text-indigo-400" />} checked={serverIcon} onCheckedChange={setServerIcon} colorClass='bg-indigo-500' />
                  <SettingsToggle label="Setting Icon" description="Show settings icon" icon={<Settings className="w-4 h-4 text-amber-400" />} checked={settingIcon} onCheckedChange={setSettingIcon} colorClass='bg-amber-500' />
                  <SettingsToggle label="PIP Icon" description="Show Picture-in-Picture icon" icon={<PictureInPicture className="w-4 h-4 text-emerald-400" />} checked={pipIcon} onCheckedChange={setPipIcon} colorClass='bg-emerald-500' />
                  <SettingsToggle label="Watch Party" description="Enable Watch Party features" icon={<Star className="w-4 h-4 text-pink-400" />} checked={watchparty} onCheckedChange={setWatchparty} colorClass='bg-pink-500' />
                </div>
                {/* Bagian Input Logo URL DIHAPUS DARI SINI */}
                <div className="flex items-center justify-between p-2.5 bg-zinc-800/30 rounded-lg border border-zinc-700/30">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-7 h-7 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Timer className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <label className="text-sm font-medium text-zinc-200 block truncate">Progress</label>
                            <p className="text-xs text-zinc-500 truncate">Set start time in seconds</p>
                        </div>
                    </div>
                    <input
                        type="number"
                        placeholder="Seconds"
                        value={progress}
                        onChange={(e) => setProgress(e.target.value)}
                        className="w-28 h-8 bg-zinc-700/50 border border-zinc-600/50 text-zinc-200 rounded-lg text-center text-sm focus:border-cyan-500/50 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerDemo;
