import { useEffect, useState, type FormEvent } from 'react';
import { api, ApiRequestError } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import type { SiteSettings as SiteSettingsType } from '@/types/content';

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-chrome-700 focus-visible:outline-energy-bright';
const labelClass = 'mb-1.5 block text-xs text-chrome-500';

type FormState = Omit<SiteSettingsType, 'id'>;

const EMPTY: FormState = {
  companyName: 'DEVSOLE',
  logoUrl: '',
  wordmarkUrl: '',
  heroHeading: '',
  heroSubtitle: '',
  ctaText: '',
  email: '',
  phone: '',
  whatsapp: '',
  address: '',
  favicon: '',
  seoDefaultTitle: '',
  seoDefaultDescription: '',
};

export function SiteSettingsPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api
      .get<SiteSettingsType>('/site-settings')
      .then((settings) => {
        const { id: _id, ...rest } = settings;
        setForm((prev) => ({ ...prev, ...rest }));
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await api.patch('/site-settings', form);
      setSaved(true);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-chrome-500">Loading…</p>;

  const fields: Array<{ key: keyof FormState; label: string; type?: string }> = [
    { key: 'companyName', label: 'Company name' },
    { key: 'heroHeading', label: 'Hero heading' },
    { key: 'heroSubtitle', label: 'Hero subtitle' },
    { key: 'ctaText', label: 'Hero CTA text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Phone' },
    { key: 'whatsapp', label: 'WhatsApp number' },
    { key: 'address', label: 'Address' },
    { key: 'seoDefaultTitle', label: 'Default SEO title' },
    { key: 'seoDefaultDescription', label: 'Default SEO description' },
  ];

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-white">Site settings</h1>
      <p className="mt-1 text-sm text-chrome-500">
        Drives the hero copy, footer contact info, and default SEO tags across the public site.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            <label className={labelClass} htmlFor={field.key}>
              {field.label}
            </label>
            <input
              id={field.key}
              type={field.type ?? 'text'}
              className={inputClass}
              value={form[field.key] ?? ''}
              onChange={(e) => update(field.key, e.target.value)}
            />
          </div>
        ))}

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center gap-4 pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save settings'}
          </Button>
          {saved && <span className="text-sm text-energy-bright">Saved.</span>}
        </div>
      </form>
    </div>
  );
}
