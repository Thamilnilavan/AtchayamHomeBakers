"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildDust, type DustField } from "./world";

export default function AtchayamCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch (err) {
      console.warn("WebGL unavailable — gold dust disabled.", err);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 80);
    camera.position.set(0, 0, 14);
    camera.lookAt(0, 1.2, 0);

    const small = (window.innerWidth || 1) < 768;
    const dust: DustField = buildDust(small ? 240 : 460);
    scene.add(dust.points);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setSize = () => {
      const w = wrapper.clientWidth || window.innerWidth;
      const h = wrapper.clientHeight || window.innerHeight;
      /* lower pixel ratio on phones keeps scrolling smooth */
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSize();
    window.addEventListener("resize", setSize);

    /* mouse parallax */
    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    /* visibility pause + only render while the hero is on screen */
    let running = true;
    let inView = true;
    const onVis = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { rootMargin: "120px 0px" }
    );
    io.observe(wrapper);

    const timer = new THREE.Timer();

    const driftDust = (dt: number) => {
      const arr = dust.positions;
      const speed = (reduced ? 0.15 : 0.7) * dt;
      for (let i = 0; i < arr.length; i += 3) {
        arr[i] += Math.sin(arr[i + 1] * 1.7 + arr[i + 2] * 0.5) * speed;
        arr[i + 2] -= speed * 2.6;
        if (arr[i + 2] < -3) {
          arr[i + 2] = 10;
          arr[i] = (Math.random() - 0.5) * 20;
          arr[i + 1] = Math.random() * 4.5;
        }
      }
      dust.points.geometry.attributes.position.needsUpdate = true;
    };

    const loop = () => {
      if (running && inView) {
        timer.update();
        const dt = Math.min(timer.getDelta(), 0.05);
        const t = timer.getElapsed();
        if (!reduced) driftDust(dt);

        /* gentle camera sway gives the dust real depth */
        const parX = reduced ? 0 : pointer.x;
        const parY = reduced ? 0 : pointer.y;
        camera.position.x += (parX * 1.1 - camera.position.x) * Math.min(1, dt * 3);
        camera.position.y += (1.2 + parY * 0.6 - camera.position.y) * Math.min(1, dt * 3);
        camera.lookAt(0, 1.2 + parY * 0.2, 0);
        dust.material.opacity = 0.42 + Math.sin(t * 0.8) * 0.06;

        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(loop);
    };
    let raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", setSize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      dust.points.geometry.dispose();
      dust.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
