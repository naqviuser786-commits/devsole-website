import { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Touch screens (mobile/tablet) par disable karein
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check karein kya mouse kisi clickable element par hai
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer')
      );
      setIsHovered(isInteractive);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth 60fps Trailing Physics Loop
    let animationFrameId: number;
    const render = () => {
      // Linear Interpolation (Lerp) for smooth trailing
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* 1. Sharp Center Core Dot */}
      <div
        ref={dotRef}
        className="fixed -left-1 -top-1 h-2 w-2 rounded-full bg-energy-bright shadow-[0_0_10px_#00f0ff] transition-opacity duration-150"
        style={{
          opacity: isHovered ? 0.4 : 1,
        }}
      />

      {/* 2. Fluid Trailing Neon Ring */}
      <div
        ref={ringRef}
        className={`fixed -left-4 -top-4 rounded-full border transition-all duration-300 ease-out ${
          isHovered
            ? 'h-14 w-14 -left-7 -top-7 border-energy-bright bg-energy-bright/10 shadow-[0_0_25px_rgba(0,240,255,0.4)] backdrop-blur-[1px]'
            : isClicked
            ? 'h-6 w-6 -left-3 -top-3 border-energy-bright bg-energy-bright/30'
            : 'h-8 w-8 border-energy-bright/60 bg-transparent shadow-[0_0_12px_rgba(0,240,255,0.2)]'
        }`}
      />
    </div>
  );
}