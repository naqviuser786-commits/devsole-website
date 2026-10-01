import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { api, ApiRequestError } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import type { SocialLinkItem } from '@/types/content';

const PLATFORMS = [
  'email',
  'whatsapp',
  'linkedin',
  'instagram',
  'facebook',
  'tiktok',
  'youtube',
  'github',
  'x',
  'discord',
];

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white focus-visible:outline-energy-bright';

export function SocialLinksPage() {
  const [links, setLinks] = useState<SocialLinkItem[] | null>(null);
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await api.get<SocialLinkItem[]>('/social-links?all=1');
      setLinks(data);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Failed to load social links.');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await api.post('/social-links', { platform, url, active: true, order: links?.length ?? 0 });
      setUrl('');
      await load();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Failed to add link.');
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(link: SocialLinkItem) {
    await api.patch(`/social-links/${link.id}`, { active: !link.active });
    load();
  }

  async function remove(link: SocialLinkItem) {
    if (!window.confirm(`Remove the ${link.platform} link?`)) return;
    await api.delete(`/social-links/${link.id}`);
    load();
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-white">Social links</h1>
      <p className="mt-1 text-sm text-chrome-500">Only active links with a URL appear on the public site.</p>

      <form onSubmit={handleAdd} className="mt-8 flex flex-wrap items-end gap-3">
        <div>
          <label className="mb-1.5 block text-xs text-chrome-500" htmlFor="platform">
            Platform
          </label>
          <select
            id="platform"
            className={inputClass}
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="mb-1.5 block text-xs text-chrome-500" htmlFor="url">
            URL
          </label>
          <input
            id="url"
            type="url"
            required
            placeholder="https://…"
            className={inputClass}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={saving} className="!px-5 !py-2 text-xs">
          Add
        </Button>
      </form>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-8 space-y-2">
        {links === null ? (
          <p className="text-sm text-chrome-500">Loading…</p>
        ) : links.length === 0 ? (
          <p className="text-sm text-chrome-500">No social links added yet.</p>
        ) : (
          links.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium capitalize text-white">{link.platform}</p>
                <p className="text-xs text-chrome-500">{link.url}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleActive(link)}
                  className={`rounded-full px-3 py-1 text-xs ${
                    link.active ? 'bg-energy/20 text-energy-bright' : 'bg-white/5 text-chrome-500'
                  }`}
                >
                  {link.active ? 'Active' : 'Inactive'}
                </button>
                <button
                  type="button"
                  onClick={() => remove(link)}
                  className="text-xs font-medium text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
