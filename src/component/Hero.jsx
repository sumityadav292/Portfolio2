
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, Download } from 'lucide-react'

function NeonSphere() {
  const sphere = useRef(null)

  useFrame((state, delta) => {
    if (sphere.current) {
      sphere.current.rotation.y += delta * 0.18
      sphere.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.12
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh ref={sphere}>
        <icosahedronGeometry args={[1.65, 4]} />
        <meshStandardMaterial
          color="#8055ff"
          emissive="#4c1d95"
          emissiveIntensity={1.8}
          metalness={0.65}
          roughness={0.25}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-glow" />

      <div className="hero-content">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow" style={{ fontWeight: "bold", fontSize: "15px" }}>
            <span className="status-dot" />
            AVAILABLE FOR OPPORTUNITIES
          </p>

          <h1> 
            SUMIT
            <br />
            <span>YADAV</span>
          </h1>

          <h2>
            Full Stack <span>Developer</span>
          </h2>

          <p className="hero-description" style={{ fontWeight: "bold", fontSize: "17px", color:  "#5865F2"}}>
            I build modern, responsive web experiences
            with clean interfaces and powerful functionality.
            Turning ideas into real digital products.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="primary-button">
              Explore My Work <ArrowDown size={18} />
            </a>

            <a href="https://drive.google.com/file/d/1WPgnlpo-7gY1B1NoWalygZzLjhTetqkV/view?usp=sharing" className="primary-button" download>
              Resume <Download size={17} />
            </a>
          </div>

          <div className="social-links">
            <a
              href="https://github.com/sumityadav292"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <span style={{ fontSize: '14px', fontWeight: 800 }}>
                GH
              </span>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <span style={{ fontSize: '14px', fontWeight: 800 }}>
                in
              </span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="orb-ring ring-one" />
          <div className="orb-ring ring-two" />

          <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <pointLight
              position={[3, 3, 3]}
              intensity={30}
              color="#8b5cf6"
            />
            <pointLight
              position={[-3, -2, 2]}
              intensity={18}
              color="#2563eb"
            />

            <NeonSphere />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.4}
            />
          </Canvas>

          <div className="floating-tag tag-react">React.js</div>
          <div className="floating-tag tag-node">Node.js</div>
          <div className="floating-tag tag-code">Express.js</div>

          <div className="profile-card">
            <img src="/src/assets/sum.jpg" alt="Sumit Yadav" />
            <div>
              <strong>Sumit Yadav</strong>
              <span>Developer &amp; Creator</span>
            </div>
            <span className="card-dot" />
          </div>
        </motion.div>
      </div>

      <a className="scroll-indicator" href="#about" style={{ fontWeight: "bold", fontSize: "20px" }}>
        <span /> SCROLL TO EXPLORE
      </a>
    </section>
  )
}
