"use client"

import { ReactNode } from "react"
import { useSession } from "next-auth/react"

import { Badge } from "@/components/ui/badge"
import { LoginModal } from "@/components/LoginModal"

import { ExerciseModal } from "./ExerciseModal"

export const ExerciseCard = ({ difficulty, muscle, name, id }: Exercise) => {
  const difficultyColor = getDifficultyColor(difficulty)
  const muscleColor = getMuscleColor(muscle)
  const { data: session } = useSession()

  const exerciseCardNode = (
    <div className="flex cursor-pointer items-center justify-between space-x-2 rounded bg-muted p-2 hover:bg-muted-foreground/50">
      <div className="flex">
        <div>{name}</div>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <Badge className={difficultyColor}>{difficulty}</Badge>
        <Badge className={muscleColor}>{muscle}</Badge>
      </div>
    </div>
  ) as ReactNode

  return session ? (
    <ExerciseModal
      exerciseId={id}
      muscle={muscle}
      name={name}
      buttonNode={exerciseCardNode}
    />
  ) : (
    <LoginModal buttonNode={exerciseCardNode} />
  )
}
function getMuscleColor(muscle: string): string {
  const colors: Record<string, string> = {
    abdominals: "bg-blue-500",
    shoulders: "bg-fuchsia-500",
    abductors: "bg-green-500",
    adductors: "bg-yellow-500",
    biceps: "bg-red-500",
    calves: "bg-purple-500",
    chest: "bg-pink-500",
    forearms: "bg-indigo-500",
    glutes: "bg-orange-500",
    hamstrings: "bg-teal-500",
    lats: "bg-cyan-500",
    lower_back: "bg-gray-500",
    middle_back: "bg-lime-500",
    neck: "bg-amber-500",
    quadriceps: "bg-gray-500",
    traps: "bg-rose-500",
    triceps: "bg-red-500",
  }

  return colors[muscle.toLowerCase()] || "bg-gray-100" // Default to gray if muscle not found
}
function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    beginner: "bg-green-500",
    intermediate: "bg-yellow-500",
    expert: "bg-red-500",
  }

  return colors[difficulty.toLowerCase()] || "bg-gray-100" // Default to gray if difficulty not found
}
