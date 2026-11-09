declare module "curtainsjs" {
  export interface CurtainsParams {
    container: HTMLElement | string;
    pixelRatio?: number;
    autoResize?: boolean;
    watchScroll?: boolean;
    production?: boolean;
    preserveDrawingBuffer?: boolean;
  }

  export interface PlaneParams {
    vertexShader?: string;
    fragmentShader?: string;
    uniforms?: Record<string, { name: string; type: string; value: unknown }>;
    widthSegments?: number;
    heightSegments?: number;
    alwaysDraw?: boolean;
    imageCover?: boolean;
  }

  export class Curtains {
    constructor(params: CurtainsParams);
    dispose(): void;
    onError(callback: (error?: unknown) => void): void;
    onReady(callback: () => void): void;
  }

  export class Plane {
    constructor(curtains: Curtains, element: HTMLElement, params?: PlaneParams);
    uniforms: Record<string, { name: string; type: string; value: unknown }>;
    gl?: WebGLRenderingContext | WebGL2RenderingContext;
    onReady(callback: () => void): void;
    onRender(callback: () => void): void;
    updatePosition(): void;
    remove(): void;
  }
}
