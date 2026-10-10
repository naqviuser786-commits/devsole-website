interface EmptyStateProps {
  message: string;
}

/** Honest placeholder for sections with no dynamic content yet */
export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-10 text-center text-xs sm:text-sm text-slate-500 font-medium">
      {message}
    </div>
  );
}

export default EmptyState;