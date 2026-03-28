'use client';
import Galaxy from '@/components/galaxy-background';
import { useTheme } from '@/context/theme-context';

export function Background3D() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const galaxyConfig = isDark
    ? {
        density: 1.5,
        glowIntensity: 0.15,
        saturation: 1,
        hueShift: 2,
        backgroundMix: 1,
      }
    : {
        density: 1.5,
        glowIntensity: 0.1,
        saturation: 0.5,
        hueShift: 2,
        backgroundMix: 0.42,
      };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="relative h-screen w-screen">
        <Galaxy
          {...galaxyConfig}
          mouseRepulsion={false}
          mouseInteraction={false}
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
