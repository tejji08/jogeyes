"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus, Trash2, Upload, Save, ArrowLeft, ImageIcon, Loader2 } from "lucide-react";

type Item = Record<string, unknown>;

type Field = {
  key: string;
  label?: string;
  type: "text" | "textarea" | "image" | "select";
  options?: string[];
  hint?: string;
  big?: boolean;
};

type Schema = {
  label: string;
  kind: "list" | "single";
  singular?: string;
  fields: Field[];
  newItem?: () => Item;
};

const rid = () => "id-" + Math.random().toString(36).slice(2, 8);

const SCHEMAS: Record<string, Schema> = {
  profile: {
    label: "Profile",
    kind: "single",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "alias", label: "Site name / alias", type: "text" },
      { key: "role", label: "Role / title", type: "text", hint: "e.g. Photographer · Writer · Creator" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "pitch", label: "Pitch", type: "textarea", hint: "Short 'available for…' line, shown on the contact CTA" },
      { key: "bio", label: "Bio", type: "textarea", big: true },
      { key: "location", label: "Location", type: "text" },
      { key: "email", label: "Contact email", type: "text", hint: "Where inquiries are sent / shown. Required for the contact form." },
      { key: "youtubeUrl", label: "YouTube URL", type: "text" },
      { key: "instagramUrl", label: "Instagram URL", type: "text" },
      { key: "twitterUrl", label: "Twitter / X URL", type: "text" },
      { key: "githubUrl", label: "GitHub URL", type: "text" },
    ],
  },
  services: {
    label: "Services",
    kind: "list",
    singular: "service",
    newItem: () => ({ id: rid(), area: "photography", title: "", blurb: "" }),
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "area", label: "Area (sets icon)", type: "select", options: ["photography", "writing", "youtube", "other"] },
      { key: "blurb", label: "Description", type: "textarea" },
    ],
  },
  videos: {
    label: "YouTube",
    kind: "list",
    singular: "video",
    newItem: () => ({ id: rid(), youtubeId: "", title: "", thumbnail: "", description: "", views: "", date: "New", group: "gaming", subcategory: "" }),
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "youtubeId", label: "YouTube ID", type: "text", hint: "The code after youtu.be/ or watch?v=" },
      { key: "thumbnail", label: "Thumbnail", type: "image" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "group", label: "Group", type: "select", options: ["gaming", "guitar"] },
      { key: "subcategory", label: "Subcategory", type: "text", hint: "e.g. doom, minecraft, long-form" },
      { key: "date", label: "Date label", type: "text" },
    ],
  },
  music: {
    label: "Music",
    kind: "list",
    singular: "track",
    newItem: () => ({ id: rid(), title: "", description: "", releaseDate: "", duration: "—", genre: "", coverArt: "", audioUrl: "" }),
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "genre", label: "Genre", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "coverArt", label: "Cover art", type: "image" },
      { key: "audioUrl", label: "Audio URL", type: "text", hint: "Link to the mp3/audio file" },
      { key: "releaseDate", label: "Release date", type: "text" },
      { key: "duration", label: "Duration", type: "text" },
    ],
  },
  writing: {
    label: "Writing",
    kind: "list",
    singular: "post",
    newItem: () => ({ id: rid(), title: "", excerpt: "", content: "", tag: "story", views: 0, likes: 0, comments: 0, date: new Date().toISOString().slice(0, 10) }),
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "tag", label: "Type", type: "select", options: ["story", "poetry", "experimental"] },
      { key: "excerpt", label: "Excerpt", type: "textarea" },
      { key: "content", label: "Full text", type: "textarea", big: true },
      { key: "date", label: "Date", type: "text" },
    ],
  },
  photography: {
    label: "Photography",
    kind: "list",
    singular: "photo",
    newItem: () => ({ id: rid(), src: "", category: "landscapes" }),
    fields: [
      { key: "src", label: "Image", type: "image" },
      { key: "category", label: "Category", type: "select", options: ["animals", "landscapes", "still-life", "portraits"] },
    ],
  },
};

const TYPES = Object.keys(SCHEMAS);

export default function StudioPage() {
  const [active, setActive] = useState<string>("profile");
  const [store, setStore] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      const next: Record<string, unknown> = {};
      for (const t of TYPES) {
        try {
          const res = await fetch(`/api/studio?type=${t}`);
          const json = await res.json();
          next[t] = json.data;
        } catch {
          next[t] = SCHEMAS[t].kind === "list" ? [] : {};
        }
      }
      setStore(next);
      setLoading(false);
    })();
  }, []);

  const schema = SCHEMAS[active];
  const flash = (kind: "ok" | "err", text: string) => {
    setMsg({ kind, text });
    setTimeout(() => setMsg(null), 4000);
  };

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Upload failed");
    return json.url as string;
  }, []);

  function updateListField(index: number, key: string, value: unknown) {
    setStore((s) => {
      const arr = [...(s[active] as Item[])];
      arr[index] = { ...arr[index], [key]: value };
      return { ...s, [active]: arr };
    });
  }
  function updateSingleField(key: string, value: unknown) {
    setStore((s) => ({ ...s, [active]: { ...(s[active] as Item), [key]: value } }));
  }
  function addItem() {
    setStore((s) => ({ ...s, [active]: [...(s[active] as Item[]), schema.newItem!()] }));
  }
  function removeItem(index: number) {
    setStore((s) => {
      const arr = [...(s[active] as Item[])];
      arr.splice(index, 1);
      return { ...s, [active]: arr };
    });
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/studio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: active, data: store[active] }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");
      flash("ok", `Saved ${schema.label}. Your changes are live — the page will hot-reload.`);
    } catch (e) {
      flash("err", e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to site
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="aero-text">Studio</span>
            </h1>
            <p className="text-muted-foreground mt-1">Edit your site content and add pictures — no code needed.</p>
          </div>
        </div>

        {/* Type tabs */}
        <div className="glass rounded-2xl p-1.5 flex flex-wrap gap-1 mb-6">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active === t ? "glossy" : "text-muted-foreground hover:bg-white/60"
              }`}
            >
              {SCHEMAS[t].label}
            </button>
          ))}
        </div>

        {msg && (
          <div className={`mb-5 rounded-xl px-4 py-3 text-sm ${msg.kind === "ok" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
            {msg.text}
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground py-16 justify-center">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading content…
          </div>
        ) : schema.kind === "single" ? (
          <div className="glass rounded-2xl p-6 space-y-5">
            {schema.fields.map((f) => (
              <FieldInput
                key={f.key}
                field={f}
                value={(store[active] as Item)?.[f.key]}
                onChange={(v) => updateSingleField(f.key, v)}
                uploadImage={uploadImage}
                onError={(t) => flash("err", t)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {(store[active] as Item[]).map((item, i) => (
              <div key={(item.id as string) || i} className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {schema.singular} {i + 1}
                  </span>
                  <button
                    onClick={() => removeItem(i)}
                    className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
                <div className="space-y-4">
                  {schema.fields.map((f) => (
                    <FieldInput
                      key={f.key}
                      field={f}
                      value={item[f.key]}
                      onChange={(v) => updateListField(i, f.key, v)}
                      uploadImage={uploadImage}
                      onError={(t) => flash("err", t)}
                    />
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={addItem}
              className="w-full glass rounded-2xl py-4 flex items-center justify-center gap-2 text-primary font-medium hover:bg-white/70 transition-colors"
            >
              <Plus className="w-5 h-5" /> Add {schema.singular}
            </button>
          </div>
        )}

        {/* Sticky save bar */}
        {!loading && (
          <div className="mt-8 flex items-center justify-end gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 glossy rounded-xl px-6 py-3 font-medium disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save {schema.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
  uploadImage,
  onError,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
  uploadImage: (f: File) => Promise<string>;
  onError: (t: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const label = field.label || field.key;
  const str = (value as string) ?? "";

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">{label}</span>

      {field.type === "textarea" && (
        <textarea
          value={str}
          onChange={(e) => onChange(e.target.value)}
          rows={field.big ? 8 : 3}
          className="w-full rounded-xl bg-white/70 border border-white/80 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
        />
      )}

      {field.type === "text" && (
        <input
          value={str}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl bg-white/70 border border-white/80 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
        />
      )}

      {field.type === "select" && (
        <select
          value={str}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl bg-white/70 border border-white/80 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
        >
          {(field.options || []).map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      )}

      {field.type === "image" && (
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/60 border border-white/80 grid place-items-center shrink-0">
            {str ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={str} alt="" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <input
              value={str}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Paste an image URL, or upload →"
              className="w-full rounded-xl bg-white/70 border border-white/80 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
            <label className="inline-flex items-center gap-2 text-sm font-medium text-primary cursor-pointer hover:underline">
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {busy ? "Uploading…" : "Upload a picture"}
              <input type="file" accept="image/*" onChange={onFile} className="hidden" />
            </label>
          </div>
        </div>
      )}

      {field.hint && <span className="block text-xs text-muted-foreground mt-1">{field.hint}</span>}
    </label>
  );
}
