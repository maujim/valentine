"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ValentineUI() {
  const [noButtonVisible, setNoButtonVisible] = useState(true)

  const handleYesClick = () => {
    alert("Yay! Happy Valentine's Day! ❤️")
  }

  const handleNoClick = () => {
    setNoButtonVisible(false)
  }

  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
      <Button
        onClick={handleYesClick}
        className="px-8 py-6 text-lg font-semibold bg-opacity-20 backdrop-blur-md bg-white border border-white border-opacity-20 shadow-xl hover:bg-opacity-30 transition-all duration-300 text-red-600 dark:text-red-400"
      >
        Yes
      </Button>
      {noButtonVisible && (
        <Button
          onClick={handleNoClick}
          className="px-8 py-6 text-lg font-semibold bg-opacity-20 backdrop-blur-md bg-white border border-white border-opacity-20 shadow-xl hover:bg-opacity-30 transition-all duration-300 text-red-600 dark:text-red-400 animate-out fade-out slide-out-to-bottom duration-1000"
        >
          No
        </Button>
      )}
    </div>
  )
}

