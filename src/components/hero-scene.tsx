"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

type BuildingSpec = {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  delay: number;
};

function generateBuildingSpecs(): BuildingSpec[] {
  const specs: BuildingSpec[] = [];
  let order = 0;
  for (let gx = -2; gx <= 2; gx++) {
    for (let gz = -2; gz <= 2; gz++) {
      const skip = Math.abs(gx) === 2 && Math.abs(gz) === 2;
      if (skip || Math.random() > 0.62) continue;
      const dist = Math.hypot(gx, gz);
      specs.push({
        x: gx * 0.92 + (Math.random() - 0.5) * 0.12,
        z: gz * 0.92 + (Math.random() - 0.5) * 0.12,
        w: 0.4 + Math.random() * 0.2,
        d: 0.4 + Math.random() * 0.2,
        h: 0.5 + Math.max(0, 2.6 - dist * 0.7) * (0.4 + Math.random() * 0.8),
        delay: dist * 0.09 + order * 0.02,
      });
      order++;
    }
  }
  return specs;
}

// Generated once at module load, not during render — keeps the
// layout stable across re-renders without calling Math.random in-render.
const BUILDING_SPECS = generateBuildingSpecs();

function Building({ spec }: { spec: BuildingSpec }) {
  const group = useRef<THREE.Group>(null);
  const edgeMat = useRef<THREE.LineBasicMaterial>(null);
  const faceMat = useRef<THREE.MeshPhysicalMaterial>(null);

  const geometry = useMemo(
    () => new THREE.BoxGeometry(spec.w, spec.h, spec.d),
    [spec.w, spec.h, spec.d]
  );
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useEffect(() => {
    if (!group.current) return;
    gsap.fromTo(
      group.current.scale,
      { y: 0.001 },
      {
        y: 1,
        duration: 1.6,
        delay: 0.4 + spec.delay,
        ease: "power4.out",
      }
    );
    if (faceMat.current) {
      gsap.fromTo(
        faceMat.current,
        { opacity: 0 },
        {
          opacity: 0.32,
          duration: 1.2,
          delay: 1.1 + spec.delay,
          ease: "power2.out",
        }
      );
    }
    if (edgeMat.current) {
      gsap.fromTo(
        edgeMat.current,
        { opacity: 0.9 },
        {
          opacity: 0.22,
          duration: 1.4,
          delay: 1.1 + spec.delay,
          ease: "power2.out",
        }
      );
    }
  }, [spec.delay]);

  return (
    <group ref={group} position={[spec.x, 0, spec.z]} scale={[1, 0.001, 1]}>
      <mesh geometry={geometry} position={[0, spec.h / 2, 0]}>
        <meshPhysicalMaterial
          ref={faceMat}
          color="#f6f2e9"
          metalness={0.05}
          roughness={0.18}
          transparent
          opacity={0}
          envMapIntensity={1.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments geometry={edges} position={[0, spec.h / 2, 0]}>
        <lineBasicMaterial
          ref={edgeMat}
          color="#ddc088"
          transparent
          opacity={0.9}
        />
      </lineSegments>
    </group>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  const base = useMemo(() => new THREE.Vector3(3.6, 2.35, 4.8), []);

  useFrame(() => {
    const targetX = base.x + pointer.x * 0.55;
    const targetY = base.y + pointer.y * 0.32;
    // Mutating the camera in useFrame is the standard react-three-fiber
    // pattern: it bypasses React's render cycle for per-frame updates.
    // eslint-disable-next-line react-hooks/immutability
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(0, 0.75, 0);
  });

  return null;
}

function Scene() {
  return (
    <>
      <Rig />
      <ambientLight intensity={0.35} color="#ddc088" />
      <directionalLight
        position={[4, 5, 2]}
        intensity={1.4}
        color="#ffe8bf"
      />
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.6}
        color="#4c7d6c"
      />
      {BUILDING_SPECS.map((spec, i) => (
        <Building key={i} spec={spec} />
      ))}
      <Grid
        position={[0, 0, 0]}
        args={[12, 12]}
        cellSize={0.46}
        cellThickness={0.5}
        cellColor="#ddc088"
        sectionSize={0.92}
        sectionThickness={0.7}
        sectionColor="#c7a159"
        fadeDistance={7}
        fadeStrength={1.5}
        infiniteGrid={false}
      />
      <Sparkles
        count={70}
        scale={[7, 3, 7]}
        size={1.6}
        speed={0.15}
        opacity={0.35}
        color="#ddc088"
      />
      <fog attach="fog" args={["#0b0a08", 6, 13]} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [3.6, 2.35, 4.8], fov: 36 }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#0b0a08"]} />
      <Scene />
    </Canvas>
  );
}
