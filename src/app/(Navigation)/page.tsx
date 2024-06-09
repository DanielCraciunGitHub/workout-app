import { Metadata, Viewport } from "next"

import { baseMetadata, baseViewport } from "@/config/metadata"

import { ExercisesList } from "./ExercisesList"

export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: "APPNAME" },
  openGraph: {
    ...baseMetadata.openGraph,
    title: { absolute: "APPNAME" },
  },
  twitter: {
    ...baseMetadata.twitter,
    title: { absolute: "APPNAME" },
  },
}
export const viewport: Viewport = {
  ...baseViewport,
}

export default async function Home() {
  return (
    <section className="mt-2 flex flex-col items-center space-y-8">
      <div className="text-4xl font-extrabold tracking-tight md:text-5xl">
        Select your Exercises
      </div>

      <ExercisesList />
    </section>
  )
}
