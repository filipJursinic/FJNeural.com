interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizes = {
    sm: { height: 80 },
    md: { height: 140 },
    lg: { height: 138 }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex items-center">
      <img
        src="/FJNeuralLogotip.png"
        style={{ height: `${currentSize.height}px` }}
        className="object-contain"
      />
    </div>
  );
}
