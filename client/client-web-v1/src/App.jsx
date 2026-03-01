import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";

/* Rotating Planet */
function Planet() {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.003;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial color="#6C63FF" />
    </mesh>
  );
}

/* Floating Cube */
function FloatingCube() {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.position.y = Math.sin(clock.elapsedTime) * 1.5;
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} position={[5, 0, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#FF7A18" />
    </mesh>
  );
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0B0F1A" }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} />

        {/* Background Stars */}
        <Stars radius={300} depth={60} count={15000} factor={7} fade />

        {/* Objects */}
        <Planet />
        <FloatingCube />

        {/* Controls */}
        <OrbitControls enableZoom enablePan />
      </Canvas>
    </div>
  );
}
