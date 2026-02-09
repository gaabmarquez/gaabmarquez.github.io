"use client"

import { useRef, useEffect, useCallback } from "react"
import { useTheme } from "@/components/theme-provider"
import * as THREE from "three"

const PARTICLE_COUNT = 800
const CONNECTION_DISTANCE = 120
const MOUSE_RADIUS = 200

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef(new THREE.Vector2(9999, 9999))
  const frameRef = useRef<number>(0)
  const { theme } = useTheme()
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.set(e.clientX, e.clientY)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      1,
      2000
    )
    camera.position.z = 500

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Particles
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const phases = new Float32Array(PARTICLE_COUNT)

    const halfW = container.clientWidth * 0.7
    const halfH = container.clientHeight * 0.7

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * halfW * 2
      positions[i3 + 1] = (Math.random() - 0.5) * halfH * 2
      positions[i3 + 2] = (Math.random() - 0.5) * 400

      velocities[i3] = (Math.random() - 0.5) * 0.3
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.3
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.1

      sizes[i] = Math.random() * 3 + 1
      phases[i] = Math.random() * Math.PI * 2
    }

    // Particle geometry
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    // Particle material with custom shader
    const particleMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        uniform float uPixelRatio;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Lines for connections
    const lineGeo = new THREE.BufferGeometry()
    const maxLines = PARTICLE_COUNT * 6
    const linePositions = new Float32Array(maxLines * 6)
    const lineColors = new Float32Array(maxLines * 6)
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3))

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    // Color palettes
    const getColors = () => {
      if (themeRef.current === "dark") {
        return {
          primary: new THREE.Color("hsl(243, 75%, 65%)"),
          accent: new THREE.Color("hsl(262, 83%, 68%)"),
          warm: new THREE.Color("hsl(16, 90%, 65%)"),
        }
      }
      return {
        primary: new THREE.Color("hsl(243, 75%, 59%)"),
        accent: new THREE.Color("hsl(262, 83%, 58%)"),
        warm: new THREE.Color("hsl(16, 90%, 58%)"),
      }
    }

    // Update particle colors
    const updateColors = () => {
      const palette = getColors()
      const colArr = [palette.primary, palette.accent, palette.warm]
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const c = colArr[i % 3]
        const i3 = i * 3
        colors[i3] = c.r
        colors[i3 + 1] = c.g
        colors[i3 + 2] = c.b
      }
      particleGeo.attributes.color.needsUpdate = true
    }
    updateColors()

    // Mouse projected into 3D
    const mouseWorld = new THREE.Vector3()

    // Animation loop
    let prevTheme = themeRef.current
    const clock = new THREE.Clock()

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()
      const dt = Math.min(clock.getDelta(), 0.05)

      // Check theme change
      if (themeRef.current !== prevTheme) {
        prevTheme = themeRef.current
        updateColors()
      }

      particleMat.uniforms.uTime.value = time

      // Project mouse into 3D space
      const mx = (mouseRef.current.x / container.clientWidth) * 2 - 1
      const my = -(mouseRef.current.y / container.clientHeight) * 2 + 1
      mouseWorld.set(mx * halfW, my * halfH, 0)

      // Update particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3

        // Wave motion
        positions[i3] += velocities[i3] + Math.sin(time * 0.3 + phases[i]) * 0.15
        positions[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + phases[i]) * 0.15
        positions[i3 + 2] += velocities[i3 + 2]

        // Mouse repulsion
        const dx = positions[i3] - mouseWorld.x
        const dy = positions[i3 + 1] - mouseWorld.y
        const distSq = dx * dx + dy * dy
        if (distSq < MOUSE_RADIUS * MOUSE_RADIUS && distSq > 0) {
          const dist = Math.sqrt(distSq)
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 2
          positions[i3] += (dx / dist) * force
          positions[i3 + 1] += (dy / dist) * force
        }

        // Wrap around edges
        if (positions[i3] > halfW) positions[i3] = -halfW
        if (positions[i3] < -halfW) positions[i3] = halfW
        if (positions[i3 + 1] > halfH) positions[i3 + 1] = -halfH
        if (positions[i3 + 1] < -halfH) positions[i3 + 1] = halfH
        if (positions[i3 + 2] > 200) positions[i3 + 2] = -200
        if (positions[i3 + 2] < -200) positions[i3 + 2] = 200
      }
      particleGeo.attributes.position.needsUpdate = true

      // Update connections — sample a subset each frame for perf
      let lineIdx = 0
      const palette = getColors()
      const step = PARTICLE_COUNT > 400 ? 2 : 1

      for (let i = 0; i < PARTICLE_COUNT; i += step) {
        const i3 = i * 3
        for (let j = i + 1; j < PARTICLE_COUNT; j += step) {
          if (lineIdx >= maxLines) break
          const j3 = j * 3
          const dx = positions[i3] - positions[j3]
          const dy = positions[i3 + 1] - positions[j3 + 1]
          const dz = positions[i3 + 2] - positions[j3 + 2]
          const distSq = dx * dx + dy * dy + dz * dz

          if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            const alpha = 1 - Math.sqrt(distSq) / CONNECTION_DISTANCE
            const l6 = lineIdx * 6

            linePositions[l6] = positions[i3]
            linePositions[l6 + 1] = positions[i3 + 1]
            linePositions[l6 + 2] = positions[i3 + 2]
            linePositions[l6 + 3] = positions[j3]
            linePositions[l6 + 4] = positions[j3 + 1]
            linePositions[l6 + 5] = positions[j3 + 2]

            const c = palette.primary
            lineColors[l6] = c.r * alpha
            lineColors[l6 + 1] = c.g * alpha
            lineColors[l6 + 2] = c.b * alpha
            lineColors[l6 + 3] = c.r * alpha
            lineColors[l6 + 4] = c.g * alpha
            lineColors[l6 + 5] = c.b * alpha

            lineIdx++
          }
        }
        if (lineIdx >= maxLines) break
      }

      // Zero out unused lines
      for (let i = lineIdx; i < maxLines; i++) {
        const l6 = i * 6
        linePositions[l6] = 0
        linePositions[l6 + 1] = 0
        linePositions[l6 + 2] = 0
        linePositions[l6 + 3] = 0
        linePositions[l6 + 4] = 0
        linePositions[l6 + 5] = 0
      }

      lineGeo.attributes.position.needsUpdate = true
      lineGeo.attributes.color.needsUpdate = true

      // Gentle camera sway
      camera.position.x = Math.sin(time * 0.1) * 20
      camera.position.y = Math.cos(time * 0.15) * 15
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // Events
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [handleMouseMove])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10"
      style={{ opacity: 0.7 }}
    />
  )
}
