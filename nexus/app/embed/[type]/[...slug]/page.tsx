import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nexus Embed",
  description: "Embeddable player route",
  robots: { index: false, follow: false },
}

type PageProps = {
  params: { type: "movie" | "tv" | "anime"; slug: string[] }
  searchParams: Record<string, string | string[] | undefined>
}

function buildVidplusUrl({
  type,
  slug,
  searchParams,
}: {
  type: "movie" | "tv" | "anime"
  slug: string[]
  searchParams: Record<string, string | string[] | undefined>
}) {
  const base = "https://player.vidplus.to/embed"

  if (type === "movie") {
    const tmdbId = slug?.[0]
    if (!tmdbId) return null
    return `${base}/movie/${encodeURIComponent(tmdbId)}`
  }

  if (type === "tv") {
    const tmdbId = slug?.[0]
    const season = slug?.[1]
    const episode = slug?.[2]
    if (!tmdbId || !season || !episode) return null
    return `${base}/tv/${encodeURIComponent(tmdbId)}/${encodeURIComponent(season)}/${encodeURIComponent(episode)}`
  }

  // anime
  const anilistId = slug?.[0]
  const number = slug?.[1]
  if (!anilistId || !number) return null
  const dub = String(searchParams?.dub ?? "").toLowerCase() === "true"
  const qs = dub ? "?dub=true" : ""
  return `${base}/anime/${encodeURIComponent(anilistId)}/${encodeURIComponent(number)}${qs}`
}

export default function EmbedPage({ params, searchParams }: PageProps) {
  const url = buildVidplusUrl({ type: params.type, slug: params.slug, searchParams })

  if (!url) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="max-w-md rounded-xl border p-6 text-center">
          <h1 className="text-lg font-semibold">Invalid embed URL</h1>
          <p className="mt-2 text-sm text-muted-foreground">Please check the parameters. Supported:</p>
          <ul className="mt-3 list-disc pl-6 text-sm text-muted-foreground">
            <li>/embed/movie/{"{tmdbId}"}</li>
            <li>
              /embed/tv/{"{tmdbId}"}/{"{season}"}/{"{episode}"}
            </li>
            <li>
              /embed/anime/{"{anilistId}"}/{"{number}"}?dub=true|false
            </li>
          </ul>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="aspect-video w-full">
        <iframe
          src={url}
          title="Nexus Player"
          className="h-screen w-screen border-0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          referrerPolicy="no-referrer"
        />
      </div>
    </main>
  )
}
