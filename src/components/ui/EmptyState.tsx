interface EmptyStateProps {
  message: string;
}

/** Honest placeholder for sections with no admin-entered content yet — never fabricated copy. */
export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center text-sm text-chrome-500">
      {message}
    </div>
  );
}
