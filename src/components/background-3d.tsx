'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';
import Galaxy from '@/components/galaxy-background';

function Particles({ count = 1500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  // giữ data không bị reset trong lifecycle
  const positionsRef = useRef<Float32Array>();
  const velocitiesRef = useRef<Float32Array>();

  if (!positionsRef.current || !velocitiesRef.current) {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const spread = 12;

    for (let i = 0; i < count; i++) {
      // vị trí
      positions[i * 3 + 0] = (Math.random() - 0.5) * spread * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 1.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 2;

      // velocity (chậm + mượt hơn)
      const angle = -Math.PI / 5; // 30 độ (có thể chỉnh)

      const speed = 0.01 + Math.random() * 0.01;

      velocities[i * 3 + 0] = Math.sin(angle) * speed;  // X
      velocities[i * 3 + 1] = -Math.cos(angle) * speed; // Y (luôn rơi xuống)
      velocities[i * 3 + 2] = 0;
    }

    positionsRef.current = positions;
    velocitiesRef.current = velocities;
  }

  const positions = positionsRef.current!;
  const velocities = velocitiesRef.current!;

  useFrame((_, delta) => {
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] += velocities[i * 3 + 0] * delta * 60;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60;

      // reset khi ra khỏi màn
      if (positions[i * 3 + 1] < -10) {
        positions[i * 3 + 1] = 10;
        positions[i * 3 + 0] = (Math.random() - 0.5) * 24;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#3b82f6"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}


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
