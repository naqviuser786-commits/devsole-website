import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-blue-600 disabled:opacity-50 disabled:pointer-events-none active:translate-y-0';

const variants: Record<Variant, string> = {
  primary:
    'bg-slate-900 hover:bg-slate-800 text-white shadow-xs hover:-translate-y-0.5',
  ghost:
    'border border-slate-200 bg-white text-slate-800 shadow-2xs hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5',
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