import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-energy-bright disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-energy-soft to-energy text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5',
  ghost:
    'border border-chrome-700/70 bg-white/[0.03] text-chrome-100 backdrop-blur hover:border-energy/60 hover:bg-white/[0.06]',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', className = '', ...props },
  ref,
) {
  return <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props} />;
});

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
}

export function ButtonLink({ variant = 'primary', className = '', ...props }: ButtonLinkProps) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
