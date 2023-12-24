'use client'

import React, { useState, useRef } from 'react'

const Avatar: React.FC = () => {
  const [avatarImage, setAvatarImage] = useState<string>('../')

  const inputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        const newImage = reader.result as string
        setAvatarImage(newImage)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleAvatarClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div
      className="flex items-center justify-center"
      onClick={handleAvatarClick}
    >
      <div className="flex-shrink-0">
        <img className="h-12 w-12 rounded-full" src={avatarImage} alt="tico" />
        <input
          className="hidden"
          type="file"
          onChange={handleImageChange}
          ref={inputRef}
        />
      </div>
    </div>
  )
}

export default Avatar
