import { Component, type ErrorInfo, type ReactNode } from 'react';
import { siteSettings } from '@/data/siteData';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('DEVSOLE Soft application error caught:', error, info.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 sm:px-6 text-center text-slate-800">
          <div className="w-full max-w-md rounded-2xl border border-slate-200/90 bg-slate-50/70 p-8 shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h1 className="mt-4 font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Something went unexpected
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              An unexpected interface issue occurred. Please refresh the session to continue or reach out to our desk.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors"
              >
                <span>Reload Page</span>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </button>

              <a
                href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20hit%20an%20unexpected%20interface%20issue%20on%20the%20website.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
              >
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;