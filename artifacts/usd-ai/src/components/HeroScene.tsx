import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COIN_TYPES = ["BTC", "ETH", "USDT"] as const;
type CoinType = (typeof COIN_TYPES)[number];

function makeCoinTexture(symbol: CoinType): THREE.CanvasTexture {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 30, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "#5C1A2A");
  grad.addColorStop(0.7, "#2A0810");
  grad.addColorStop(1, "#0a0306");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "#8A2B42";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(194,86,111,0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#D9B98A";
  ctx.font = "bold 150px 'Arial', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const glyph = symbol === "BTC" ? "\u20BF" : symbol === "ETH" ? "\u039E" : "\u20AE";
  ctx.fillText(glyph, size / 2, size / 2 + 8);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function makeTrackTexture(): THREE.CanvasTexture {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0a0306";
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "rgba(107,30,48,0.55)";
  ctx.lineWidth = 1.5;
  const step = 32;
  for (let i = 0; i <= size; i += step) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke();
  }
  ctx.strokeStyle = "rgba(58,14,30,0.6)";
  ctx.lineWidth = 1;
  for (let i = -size; i <= size * 2; i += 12) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + size, size); ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

const UPPER_START = new THREE.Vector3(7.2, 2.6, -0.3);
const PORTAL_IN = new THREE.Vector3(1.6, 1.1, 0);
const PORTAL_OUT = new THREE.Vector3(-1.6, -1.1, 0);
const LOWER_END = new THREE.Vector3(-7.2, -2.6, 0.3);

function Track({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const trackTex = useMemo(() => makeTrackTexture(), []);
  const dir = to.clone().sub(from);
  const len = dir.length();
  const mid = from.clone().add(to).multiplyScalar(0.5);
  const angleZ = Math.atan2(dir.y, dir.x);
  trackTex.repeat.set(Math.max(2, len * 0.6), 1.2);
  return (
    <group position={mid} rotation={[0, 0, angleZ]}>
      <mesh>
        <boxGeometry args={[len, 1.3, 0.18]} />
        <meshStandardMaterial
          map={trackTex}
          color="#1a0510"
          roughness={0.85}
          metalness={0.25}
          emissive="#2A0810"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Glowing rails */}
      <mesh position={[0, 0.7, 0.06]}>
        <boxGeometry args={[len, 0.06, 0.22]} />
        <meshStandardMaterial color="#3A0E1E" emissive="#7A2236" emissiveIntensity={0.55} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.7, 0.06]}>
        <boxGeometry args={[len, 0.06, 0.22]} />
        <meshStandardMaterial color="#3A0E1E" emissive="#7A2236" emissiveIntensity={0.55} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Portal({ position, hue }: { position: THREE.Vector3; hue: string }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ringRef.current) ringRef.current.rotation.z += dt * 0.5;
    if (innerRef.current) innerRef.current.rotation.z -= dt * 0.35;
  });
  return (
    <group position={position}>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.05, 0.09, 16, 80]} />
        <meshStandardMaterial color={hue} emissive={hue} emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <mesh ref={innerRef}>
        <ringGeometry args={[0.62, 0.98, 56]} />
        <meshBasicMaterial color="#6B1E30" transparent opacity={0.55} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.62, 48]} />
        <meshBasicMaterial color="#080205" />
      </mesh>
      <pointLight color={hue} intensity={4} distance={7} decay={2} />
    </group>
  );
}

function Coin({
  type,
  offset,
  speed,
}: {
  type: CoinType;
  offset: number;
  speed: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const faceTex = useMemo(() => makeCoinTexture(type), [type]);
  const startRef = useRef(performance.now() / 1000);
  const tmpPos = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!ref.current) return;
    const now = performance.now() / 1000;
    const tRaw = ((now - startRef.current) * speed + offset) % 1;

    let scale = 0.85;
    const rollAngle = tRaw * Math.PI * 14;

    if (tRaw < 0.42) {
      const u = tRaw / 0.42;
      tmpPos.lerpVectors(UPPER_START, PORTAL_IN, u);
    } else if (tRaw < 0.50) {
      const u = (tRaw - 0.42) / 0.08;
      tmpPos.copy(PORTAL_IN);
      scale = 0.85 * (1 - u);
    } else if (tRaw < 0.58) {
      const u = (tRaw - 0.50) / 0.08;
      tmpPos.copy(PORTAL_OUT);
      scale = 0.85 * u;
    } else {
      const u = (tRaw - 0.58) / 0.42;
      tmpPos.lerpVectors(PORTAL_OUT, LOWER_END, u);
    }

    ref.current.position.copy(tmpPos);
    ref.current.scale.setScalar(scale);
    ref.current.rotation.z = rollAngle;
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.10, 48]} />
        <meshStandardMaterial color="#2A0810" metalness={0.75} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0, 0.052]}>
        <circleGeometry args={[0.4, 48]} />
        <meshStandardMaterial map={faceTex} metalness={0.45} roughness={0.4} emissive="#2A0810" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0, 0, -0.052]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[0.4, 48]} />
        <meshStandardMaterial map={faceTex} metalness={0.45} roughness={0.4} emissive="#2A0810" emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

function Scene() {
  const coins = useMemo(() => {
    const N = 9;
    return Array.from({ length: N }, (_, i) => ({
      type: COIN_TYPES[i % 3] as CoinType,
      offset: i / N,
    }));
  }, []);

  return (
    <>
      <fog attach="fog" args={["#080205", 9, 24]} />
      <ambientLight intensity={0.3} color="#3A0E1E" />
      <directionalLight position={[5, 8, 5]} intensity={0.55} color="#A23A52" />
      <pointLight position={[-7, 4, 5]} intensity={1.4} color="#6B1E30" distance={22} decay={2} />
      <pointLight position={[7, -4, 5]} intensity={1.0} color="#4A1426" distance={18} decay={2} />

      <Track from={UPPER_START} to={PORTAL_IN} />
      <Track from={PORTAL_OUT} to={LOWER_END} />
      <Portal position={PORTAL_IN} hue="#C2566F" />
      <Portal position={PORTAL_OUT} hue="#C2566F" />

      {coins.map((c, i) => (
        <Coin key={i} type={c.type} offset={c.offset} speed={0.07} />
      ))}
    </>
  );
}

function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

export default function HeroScene() {
  if (!hasWebGL()) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, #2A0810 0%, #080205 70%)",
        }}
      />
    );
  }
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], fov: 42 }}
      style={{ width: "100%", height: "100%", background: "#080205" }}
      gl={{ antialias: true, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false }}
    >
      <Scene />
    </Canvas>
  );
}
