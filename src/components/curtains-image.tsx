"use client";

import { useEffect, useRef, useState } from "react";
import type { Curtains as CurtainsType, Plane as PlaneType } from "curtainsjs";

const vertexShader = `
precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uTextureMatrix0;
uniform float uHover;
uniform vec2 uMouse;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

void main() {
  vec3 vertexPosition = aVertexPosition;
  vec2 uv = aTextureCoord;
  float distanceToMouse = distance(uv, uMouse);
  float falloff = 1.0 - smoothstep(0.0, 0.58, distanceToMouse);
  vec2 direction = normalize(uv - uMouse + vec2(0.0001));

  vertexPosition.xy += direction * 0.018 * falloff * uHover;
  vertexPosition.z += falloff * 0.06 * uHover;

  vVertexPosition = vertexPosition;
  vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
  gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
}
`;

const fragmentShader = `
precision mediump float;

uniform sampler2D uSampler0;
uniform float uTime;
uniform float uHover;
uniform vec2 uMouse;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

void main() {
  vec2 uv = vTextureCoord;
  float distanceToMouse = distance(uv, uMouse);
  float falloff = 1.0 - smoothstep(0.0, 0.7, distanceToMouse);
  float ripple = sin(distanceToMouse * 44.0 - uTime * 2.1) * 0.0045 * uHover * falloff;
  uv += normalize(uv - uMouse + vec2(0.0001)) * ripple;

  float shift = 0.0028 * uHover * falloff;
  vec4 color = texture2D(uSampler0, uv);
  color.r = texture2D(uSampler0, uv + vec2(shift, 0.0)).r;
  color.b = texture2D(uSampler0, uv - vec2(shift, 0.0)).b;

  float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(color.rgb, vec3(luma) * vec3(1.04, 1.0, 0.94), 0.12 * uHover);

  float vignette = smoothstep(1.15, 0.3, distance(uv, vec2(0.5)));
  color.rgb *= mix(1.0, 0.84 + 0.16 * vignette, uHover * 0.55);

  gl_FragColor = color;
}
`;

export function CurtainsImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const readyRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let curtains: CurtainsType | undefined;
    let plane: PlaneType | undefined;
    let hoverTarget = 0;
    let removeListeners: (() => void) | undefined;

    const setup = async () => {
      try {
        const { Curtains, Plane } = await import("curtainsjs");
        if (disposed) return;

        curtains = new Curtains({
          container,
          pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
          autoResize: true,
          watchScroll: false,
          preserveDrawingBuffer: true,
        });

        plane = new Plane(curtains, image, {
          vertexShader,
          fragmentShader,
          widthSegments: 24,
          heightSegments: 24,
          uniforms: {
            uHover: { name: "uHover", type: "1f", value: 0 },
            uTime: { name: "uTime", type: "1f", value: 0 },
            uMouse: { name: "uMouse", type: "2f", value: [0.5, 0.5] },
          },
        });

        let probeFrames = 0;

        plane.onRender(() => {
          if (!plane || disposed) return;
          const time = plane.uniforms.uTime;
          const hover = plane.uniforms.uHover;
          time.value = (time.value as number) + 0.016;
          hover.value =
            (hover.value as number) + (hoverTarget - (hover.value as number)) * 0.065;

          // Only reveal the canvas once it has produced a real frame. If WebGL
          // fails or the texture is blank, the static image remains underneath.
          if (!readyRef.current && probeFrames < 90) {
            probeFrames += 1;
            const gl = plane.gl;
            if (!gl || gl.drawingBufferWidth < 2 || gl.drawingBufferHeight < 2) return;

            try {
              const pixel = new Uint8Array(4);
              let brightest = 0;
              const points = [
                [0.5, 0.5],
                [0.35, 0.42],
                [0.65, 0.48],
                [0.42, 0.68],
                [0.62, 0.72],
                [0.5, 0.3],
              ];

              for (const [x, y] of points) {
                gl.readPixels(
                  Math.floor(gl.drawingBufferWidth * x),
                  Math.floor(gl.drawingBufferHeight * y),
                  1,
                  1,
                  gl.RGBA,
                  gl.UNSIGNED_BYTE,
                  pixel,
                );
                brightest = Math.max(
                  brightest,
                  pixel[0] + pixel[1] + pixel[2],
                );
              }

              if (brightest > 24) {
                readyRef.current = true;
                setReady(true);
              }
            } catch {
              // Keep the image fallback if the pixel probe is unavailable.
            }
          }
        });

        const onEnter = () => {
          hoverTarget = 1;
        };
        const onLeave = () => {
          hoverTarget = 0;
        };
        const onMove = (event: MouseEvent) => {
          if (!plane) return;
          const rect = container.getBoundingClientRect();
          plane.uniforms.uMouse.value = [
            (event.clientX - rect.left) / rect.width,
            1 - (event.clientY - rect.top) / rect.height,
          ];
        };

        container.addEventListener("mouseenter", onEnter);
        container.addEventListener("mouseleave", onLeave);
        container.addEventListener("mousemove", onMove, { passive: true });

        removeListeners = () => {
          container.removeEventListener("mouseenter", onEnter);
          container.removeEventListener("mouseleave", onLeave);
          container.removeEventListener("mousemove", onMove);
        };
      } catch {
        // Keep the static image as the graceful fallback.
      }
    };

    void setup();

    return () => {
      disposed = true;
      removeListeners?.();
      plane?.remove();
      curtains?.dispose();
    };
  }, []);

  return (
    <div className="curtains-wrap" data-cursor="view" data-cursor-label="View case">
      <div
        ref={containerRef}
        className={`curtains-canvas ${ready ? "is-ready" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={ready ? "curtains-source" : "curtains-fallback"}
        />
      </div>
    </div>
  );
}
