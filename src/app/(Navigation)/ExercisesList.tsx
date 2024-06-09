"use client"

import { useState } from "react"
import { trpc } from "@/server/client"

import { ExerciseCard } from "./ExerciseCard"
import { SearchBar } from "./SearchBar"

interface ExercisesListProps {}

export const ExercisesList = ({}: ExercisesListProps) => {
  const [searchTitle, setSearchTitle] = useState<string>("")

  const { data, isFetching, isError } =
    trpc.exerciseRouter.getExercisesByName.useQuery(
      {
        name: searchTitle,
        limit: 7,
      },
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      }
    )

  const updateSearchTitle = (title: string) => {
    setSearchTitle(title)
  }
  return (
    <div className="flex flex-col items-center">
      <SearchBar updateSearchTitle={updateSearchTitle} />
      <div className="container my-4 flex flex-col space-y-2">
        {data?.map((exercise) => (
          <ExerciseCard key={exercise.id} {...exercise} />
        ))}
      </div>
    </div>
  )
}
