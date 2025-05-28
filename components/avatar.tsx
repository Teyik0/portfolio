"use client"

import Image from "next/legacy/image"
import { motion } from "framer-motion"

export const Avatar = () => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0], // Move up and down
      }}
      transition={{
        duration: 8, // Duration of one cycle
        repeat: Number.POSITIVE_INFINITY, // Repeat the animation infinitely
        ease: "easeInOut", // Easing function
      }}
    >
      <div className="avatar">
        <Image src="/ghibli-1.webp" alt="profilephoto" width={300} height={300} className="mask mask-hexagon" />
      </div>
    </motion.div>
  )
}

export default Avatar
