import { HTMLProps, ReactNode, useEffect, useRef } from "react";
import styles from "./mouse-trail.module.scss";
import { trails } from "../../utils";

export interface MouseTrailProps extends HTMLProps<HTMLCanvasElement> {
  children?: ReactNode;
}

/**
 * @example
 * ```tsx
 * <MouseTrail />
 * ```
 */
export const MouseTrail = ({ className, ...props }: MouseTrailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl");
    if (!gl || !canvas) return;
    const onResize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    onResize();
    trails(canvas, gl);
    addEventListener("resize", onResize);
    // skipcq: JS-0045
    return () => {
      removeEventListener("resize", onResize);
    };
  }, []);
  const cls = [styles.trail, className ?? ""].join(" ");
  return <canvas {...props} className={cls} data-testid="mouse-trail" ref={canvasRef} />;
};
