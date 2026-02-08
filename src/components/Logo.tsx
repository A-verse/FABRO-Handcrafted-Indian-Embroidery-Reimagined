import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl',
  };

  const colorClasses = {
    light: 'text-ivory',
    dark: 'text-charcoal',
  };

  return (
    <Link href="/" className="group">
      <div className="relative">
        {/* Main Logo Text */}
        <h1
          className={`font-serif font-bold tracking-wider ${sizeClasses[size]} ${colorClasses[variant]} transition-all duration-300`}
        >
          FABRO
        </h1>
        
        {/* Subtle Thread Detail - Decorative Underline */}
        <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted-gold to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Tagline - Optional, only on larger sizes */}
        {size === 'lg' && (
          <p className={`text-xs tracking-widest mt-2 ${variant === 'light' ? 'text-ivory/70' : 'text-charcoal/60'}`}>
            Hand-embroidered. Heart-approved.
          </p>
        )}
      </div>
    </Link>
  );
}
