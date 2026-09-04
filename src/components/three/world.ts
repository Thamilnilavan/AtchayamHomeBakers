import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────
   Particles — warm golden dust drifting through the light
───────────────────────────────────────────────────────────── */

function makeSoftSprite(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,244,224,1)");
  g.addColorStop(0.4, "rgba(226,201,143,0.7)");
  g.addColorStop(1, "rgba(226,201,143,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export type DustField = {
  points: THREE.Points;
  material: THREE.PointsMaterial;
  positions: Float32Array;
};

export function buildDust(count: number): DustField {
  const sprite = makeSoftSprite();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = Math.random() * 4.5;
    positions[i * 3 + 2] = -3 + Math.random() * 13;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.07,
    map: sprite,
    color: 0xd9b577,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geo, mat);
  return { points, material: mat, positions };
}
