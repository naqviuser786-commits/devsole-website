import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('DEVSOLE app crashed:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-navy-950 px-6 text-center text-chrome-300">
          <h1 className="font-display text-2xl font-semibold text-white">Something went wrong.</h1>
          <p className="mt-2 max-w-sm text-sm text-chrome-500">
            Please refresh the page. If this keeps happening, let us know.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
