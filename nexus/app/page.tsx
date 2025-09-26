"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

type ContentType = "movie" | "tv" | "anime"

function useOrigin() {
  if (typeof window === "undefined") return "https://your-domain.com"
  return window.location.origin
}

function Pill({
  active,
  children,
  onClick,
  ariaLabel,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
  ariaLabel: string
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function Page() {
  const origin = useOrigin()
  const [type, setType] = useState<ContentType>("movie")

  // movie
  const [movieId, setMovieId] = useState<string>("597")

  // tv
  const [tvId, setTvId] = useState<string>("94997")
  const [season, setSeason] = useState<string>("1")
  const [episode, setEpisode] = useState<string>("1")

  // anime
  const [animeId, setAnimeId] = useState<string>("21")
  const [animeNumber, setAnimeNumber] = useState<string>("1")
  const [dub, setDub] = useState<boolean>(false)

  const embedPath = useMemo(() => {
    if (type === "movie") return `/embed/movie/${movieId || ""}`
    if (type === "tv") return `/embed/tv/${tvId || ""}/${season || ""}/${episode || ""}`
    return `/embed/anime/${animeId || ""}/${animeNumber || ""}${dub ? "?dub=true" : ""}`
  }, [type, movieId, tvId, season, episode, animeId, animeNumber, dub])

  const fullUrl = `${origin}${embedPath}`

  return (
    <main>
      <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div aria-hidden className="h-8 w-8 rounded-md bg-primary" />
            <span className="text-lg font-bold tracking-tight">Nexus</span>
          </div>
          <nav className="hidden gap-2 md:flex">
            <a href="#player" className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              Player
            </a>
            <a href="#docs" className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              Docs
            </a>
          </nav>
        </div>
      </header>

      <section className="border-b">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-2 md:py-16">
          <div className="space-y-4">
            <h1 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
              Next‑gen Embeddable Player on your domain
            </h1>
            <p className="text-pretty text-muted-foreground">
              Generate player links for movies, TV shows, and anime. Share only your domain; we proxy playback to the
              VidPlus player behind the scenes.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="#player"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Generate Player
              </a>
              <a href="#docs" className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-semibold">
                Read Docs
              </a>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="mb-3 text-sm font-medium">Live Preview</div>
            <div className="aspect-video overflow-hidden rounded-lg border">
              <iframe
                src={fullUrl}
                title="Nexus Embed Preview"
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium">Generated URL</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border bg-muted px-3 py-2 text-xs">
                  {fullUrl}
                </code>
                <button
                  type="button"
                  className="rounded-md border px-3 py-2 text-xs font-medium"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(fullUrl)
                    } catch {}
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="player" className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Player Builder</h2>
            <p className="text-muted-foreground">Choose type and fill in the IDs below.</p>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Pill active={type === "movie"} onClick={() => setType("movie")} ariaLabel="Movie">
              Movie
            </Pill>
            <Pill active={type === "tv"} onClick={() => setType("tv")} ariaLabel="TV">
              TV
            </Pill>
            <Pill active={type === "anime"} onClick={() => setType("anime")} ariaLabel="Anime">
              Anime
            </Pill>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4 rounded-xl border p-4">
              {type === "movie" && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="movieId" className="text-sm font-medium">
                      TMDB Movie ID
                    </label>
                    <input
                      id="movieId"
                      inputMode="numeric"
                      className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                      placeholder="e.g. 597"
                      value={movieId}
                      onChange={(e) => setMovieId(e.target.value)}
                    />
                  </div>
                </>
              )}

              {type === "tv" && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="tvId" className="text-sm font-medium">
                      TMDB TV ID
                    </label>
                    <input
                      id="tvId"
                      inputMode="numeric"
                      className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                      placeholder="e.g. 94997"
                      value={tvId}
                      onChange={(e) => setTvId(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="season" className="text-sm font-medium">
                        Season
                      </label>
                      <input
                        id="season"
                        inputMode="numeric"
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        placeholder="1"
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="episode" className="text-sm font-medium">
                        Episode
                      </label>
                      <input
                        id="episode"
                        inputMode="numeric"
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        placeholder="1"
                        value={episode}
                        onChange={(e) => setEpisode(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {type === "anime" && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="animeId" className="text-sm font-medium">
                      Anilist ID
                    </label>
                    <input
                      id="animeId"
                      inputMode="numeric"
                      className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                      placeholder="e.g. 21"
                      value={animeId}
                      onChange={(e) => setAnimeId(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="animeNumber" className="text-sm font-medium">
                        Episode Number
                      </label>
                      <input
                        id="animeNumber"
                        inputMode="numeric"
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        placeholder="1"
                        value={animeNumber}
                        onChange={(e) => setAnimeNumber(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Dub</label>
                      <div className="flex items-center gap-3 rounded-md border p-2">
                        <input
                          id="dub"
                          type="checkbox"
                          checked={dub}
                          onChange={(e) => setDub(e.target.checked)}
                          className="h-4 w-4"
                          aria-label="Toggle dub"
                        />
                        <label htmlFor="dub" className="text-sm">
                          Enable dub
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border p-4">
                <div className="mb-2 text-sm font-medium">Generated URL</div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border bg-muted px-3 py-2 text-xs">
                    {fullUrl}
                  </code>
                  <button
                    type="button"
                    className="rounded-md border px-3 py-2 text-xs font-medium"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(fullUrl)
                      } catch {}
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="rounded-xl border p-4">
                <div className="mb-2 text-sm font-medium">Embed Code</div>
                <pre className="overflow-auto rounded-md border bg-muted p-3 text-xs">
                  {`<iframe
  src="${fullUrl}"
  frameborder="0"
  allow="autoplay; encrypted-media; picture-in-picture"
  allowfullscreen
></iframe>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="docs">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <h2 className="text-2xl font-bold">API Documentation</h2>
          <p className="text-muted-foreground">Use these routes on your domain to embed content anywhere.</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border p-4">
              <h3 className="mb-2 text-lg font-semibold">Movies</h3>
              <code className="block rounded-md border bg-muted px-3 py-2 text-xs">
                {origin}/embed/movie/{"{tmdbId}"}
              </code>
              <div className="mt-3 text-sm font-medium">Example</div>
              <code className="block rounded-md border bg-muted px-3 py-2 text-xs">{origin}/embed/movie/78692</code>
            </div>

            <div className="rounded-xl border p-4">
              <h3 className="mb-2 text-lg font-semibold">TV Shows</h3>
              <code className="block rounded-md border bg-muted px-3 py-2 text-xs">
                {origin}/embed/tv/{"{tmdbId}"}/{"{season}"}/{"{episode}"}
              </code>
              <div className="mt-3 text-sm font-medium">Example</div>
              <code className="block rounded-md border bg-muted px-3 py-2 text-xs">{origin}/embed/tv/94997/1/1</code>
            </div>

            <div className="rounded-xl border p-4">
              <h3 className="mb-2 text-lg font-semibold">Anime</h3>
              <code className="block rounded-md border bg-muted px-3 py-2 text-xs">
                {origin}/embed/anime/{"{anilistId}"}/{"{number}"}?dub=true|false
              </code>
              <div className="mt-3 text-sm font-medium">Example</div>
              <code className="block rounded-md border bg-muted px-3 py-2 text-xs">
                {origin}/embed/anime/21/1?dub=true
              </code>
            </div>

            <div className="rounded-xl border p-4">
              <h3 className="mb-2 text-lg font-semibold">Embed Snippet</h3>
              <pre className="overflow-auto rounded-md border bg-muted p-3 text-xs">
                {`<iframe
  src="${origin}/embed/movie/597"
  frameborder="0"
  allow="autoplay; encrypted-media; picture-in-picture"
  allowfullscreen
></iframe>`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
