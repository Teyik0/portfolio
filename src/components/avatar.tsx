'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export const Avatar = () => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0], // Move up and down
      }}
      transition={{
        duration: 8, // Duration of one cycle
        repeat: Number.POSITIVE_INFINITY, // Repeat the animation infinitely
        ease: 'easeInOut', // Easing function
      }}
    >
      <div className="avatar w-72">
        <Image
          alt="profile-photo"
          className="mask mask-squircle"
          height={15}
          src="/ghibli.webp"
          width={15}
        />
      </div>
    </motion.div>
  );
};
