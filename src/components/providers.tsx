"use client"

import React, { useState } from "react"
import { siteConfig } from "@/config"
import { trpc } from "@/server/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import superjson from "superjson"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function Provider({ children, ...props }: ThemeProviderProps) {
  const [queryClient] = useState(() => new QueryClient({}))

  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${siteConfig.url}/api/trpc`,
        }),
      ],
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider {...props}>
          <SessionProvider refetchOnWindowFocus={false}>
            {children}
          </SessionProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
