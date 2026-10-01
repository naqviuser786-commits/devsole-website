import { useCallback, useEffect, useState } from 'react';
import { api, ApiRequestError } from '@/lib/api';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export function Messages() {
  const [messages, setMessages] = useState<ContactMessage[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await api.get<ContactMessage[]>('/contact');
      setMessages(data);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Failed to load messages.');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function markRead(id: string) {
    await api.patch(`/contact/${id}/read`);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-white">Contact messages</h1>
      <p className="mt-1 text-sm text-chrome-500">Submitted through the public contact form.</p>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-8 space-y-4">
        {messages === null ? (
          <p className="text-sm text-chrome-500">Loading…</p>
        ) : messages.length === 0 ? (
          <p className="text-sm text-chrome-500">No messages yet.</p>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border p-5 ${
                m.read ? 'border-white/5 bg-white/[0.02]' : 'border-energy/30 bg-energy/5'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-white">
                    {m.name} <span className="font-normal text-chrome-500">· {m.email}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-chrome-600">
                    {new Date(m.createdAt).toLocaleString()}
                    {m.company && ` · ${m.company}`}
                    {m.service && ` · ${m.service}`}
                    {m.budget && ` · ${m.budget}`}
                  </p>
                </div>
                {!m.read && (
                  <button
                    type="button"
                    onClick={() => markRead(m.id)}
                    className="rounded-full border border-energy/40 px-3 py-1 text-xs font-medium text-energy-bright hover:bg-energy/10"
                  >
                    Mark as read
                  </button>
                )}
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-chrome-300">{m.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
