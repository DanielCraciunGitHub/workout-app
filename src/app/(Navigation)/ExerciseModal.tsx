"use client"

import { ReactNode, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { exerciseFormSchema } from "@/lib/validations/exercise"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { SpinnerButton } from "@/components/Buttons/SpinnerButton"
import { GenericFormField } from "@/components/InputField"

import { submitExercise } from "../_actions/exercises"

interface ExerciseModalProps {
  buttonNode: ReactNode
  name: string
  exerciseId: string
  muscle: string
}
type Inputs = z.infer<typeof exerciseFormSchema>

export const ExerciseModal = ({
  buttonNode,
  muscle,
  name,
  exerciseId,
}: ExerciseModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const { data: session } = useSession()

  const form = useForm<Inputs>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      sets: undefined,
      reps: undefined,
    },
  })

  const onSubmit = async ({ reps, sets }: Inputs) => {
    setIsLoading(true)

    await submitExercise({
      exerciseId,
      userId: session?.user.id,
      volume: reps * sets,
    })

    setIsLoading(false)
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open)
        form.reset()
      }}
    >
      <DialogTrigger asChild>{buttonNode}</DialogTrigger>
      <DialogContent className="flex flex-col border-muted">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{name}</DialogTitle>
          <DialogDescription className="text-lg">
            Muscle worked: <span className="font-bold">{muscle}</span>
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col justify-center space-y-8"
          >
            <GenericFormField
              name="sets"
              label="Sets"
              placeholder="3"
              control={form.control}
            />
            <GenericFormField
              name="reps"
              label="Repetitions"
              placeholder="12"
              control={form.control}
            />

            <SpinnerButton name="Send" state={isLoading} type="submit" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
