import { useState, useEffect } from "react";

interface AnimatedSvgProps {
  width?: number;
  height?: number;
  color?: string;
  duration?: number;
  svgUrl: string;
  mouseMoveSensitivity?: number;
}

const AnimatedSvg: React.FC<AnimatedSvgProps> = ({
  width = 100,
  height = 100,
  duration = 5,
  svgUrl,
  mouseMoveSensitivity = 50,
}) => {
  const [rotation, setRotation] = useState(0);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse position relative to viewport center
      const x = (event.clientX - window.innerWidth / 2) / mouseMoveSensitivity;
      const y = (event.clientY - window.innerHeight / 2) / mouseMoveSensitivity;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseMoveSensitivity]);

  useEffect(() => {
    let animationId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Calculate rotation based on elapsed time and duration
      const newRotation =
        (360 * (elapsed % (duration * 1000))) / (duration * 1000);
      setRotation(newRotation);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [duration]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(svgUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load SVG: ${response.statusText}`);
        }
        return response.text();
      })
      .then((data) => {
        setSvgContent(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load SVG:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [svgUrl]);

  if (isLoading) {
    return <div>Loading SVG...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="animated-svg"
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      <div
        style={{
          width,
          height,
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "center",
          fill: "#000",
        }}
        dangerouslySetInnerHTML={{ __html: svgContent || "" }}
      />
    </div>
  );
};

export default AnimatedSvg;
