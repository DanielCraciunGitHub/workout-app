import { authRouter } from "./routers/authRouter"
import { exerciseRouter } from "./routers/exerciseRouter"
import { router } from "./trpc"

export const appRouter = router({
  authRouter,
  exerciseRouter,
})

export type AppRouter = typeof appRouter
