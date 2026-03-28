'use client';
import Galaxy from '@/components/galaxy-background';

export function Background3D() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="w-screen h-screen relative">
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction={false}
          density={1.5}
          glowIntensity={0.15}
          saturation={1}
          hueShift={2}
          twinkleIntensity={0}
          rotationSpeed={0}
          repulsionStrength={0}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={0.5}
        />
      </div>
    </div>
  );
}

export default Background3D;
