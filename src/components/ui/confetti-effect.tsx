"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export function ConfettiEffect({
  emoji = "🦄",
  trigger = false, // Boolean to trigger the effect
  particleCount = {
    primary: 30,
    secondary: 5,
    circles: 15,
  },
  scalar = 2,
  spread = 360,
  ticks = 60,
  gravity = 0,
  decay = 0.96,
  startVelocity = 20,
  className = "",
}) {
  useEffect(() => {
    if (trigger) {
      const emojiShape = confetti.shapeFromText({ text: emoji, scalar });

      const defaults = {
        spread,
        ticks,
        gravity,
        decay,
        startVelocity,
        shapes: [emojiShape],
        scalar,
      };

      const shoot = () => {
        // Primary burst
        confetti({
          ...defaults,
          particleCount: particleCount.primary,
        });

        // Secondary burst
        confetti({
          ...defaults,
          particleCount: particleCount.secondary,
        });

        // Circle burst
        confetti({
          ...defaults,
          particleCount: particleCount.circles,
          scalar: scalar / 2,
          shapes: ["circle"],
        });
      };

      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
    }
  }, [
    trigger,
    emoji,
    particleCount,
    scalar,
    spread,
    ticks,
    gravity,
    decay,
    startVelocity,
  ]);

  return <div className={className} />;
}

export default ConfettiEffect;
