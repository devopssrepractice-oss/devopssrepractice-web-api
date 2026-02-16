'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import CodeBlock from '@/components/common/CodeBlock';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const CATEGORY_OPTIONS = [
  { label: 'Announcement', color: 'bg-primary-100 text-primary-700' },
  { label: 'Partnership', color: 'bg-emerald-100 text-emerald-700' },
  { label: 'Event', color: 'bg-amber-100 text-amber-700' },
  { label: 'Case Study', color: 'bg-cyan-100 text-cyan-700' },
  { label: 'Open Source', color: 'bg-purple-100 text-purple-700' },
  { label: 'Milestone', color: 'bg-pink-100 text-pink-700' },
];

const BLOCK_TYPES = [
  { type: 'paragraph', label: 'Paragraph', icon: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>
  ) },
  { type: 'heading', label: 'Heading', icon: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.243 4.493v7.5m0 0v7.514m0-7.514h10.5m0-7.5v7.5m0 0v7.514" /></svg>
  ) },
  { type: 'code', label: 'Code', icon: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25" /></svg>
  ) },
  { type: 'image', label: 'Image', icon: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
  ) },
  { type: 'quote', label: 'Quote', icon: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" /></svg>
  ) },
  { type: 'list', label: 'List', icon: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
  ) },
] as const;

const CODE_LANGUAGES = [
  'bash', 'yaml', 'json', 'typescript', 'javascript', 'python', 'go', 'hcl', 'dockerfile', 'sql', 'html', 'css', 'markdown',
];

interface ContentBlock {
  type: 'paragraph' | 'heading' | 'code' | 'image' | 'quote' | 'list';
  content: string;
  language?: string;
  level?: 2 | 3;
  url?: string;
  caption?: string;
  items?: string[];
}

interface NewsForm {
  slug: string;
  title: string;
  description: string;
  content: ContentBlock[];
  category: string;
  categoryColor: string;
  coverImage: string;
  published: boolean;
}

const emptyForm: NewsForm = {
  slug: '',
  title: '',
  description: '',
  content: [{ type: 'paragraph', content: '' }],
  category: 'Announcement',
  categoryColor: 'bg-primary-100 text-primary-700',
  coverImage: '',
  published: false,
};

function normaliseContent(raw: any[]): ContentBlock[] {
  if (!raw?.length) return [{ type: 'paragraph', content: '' }];
  return raw.map((item) =>
    typeof item === 'string' ? { type: 'paragraph' as const, content: item } : (item as ContentBlock)
  );
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function NewsEditorPage() {
  const { authFetch } = useAuth();
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';

  const [form, setForm] = useState<NewsForm>({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [addMenuIdx, setAddMenuIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!isNew) {
      authFetch(`${API_URL}/api/admin/news/${params.id}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.success) {
            setForm({
              slug: d.data.slug || '',
              title: d.data.title || '',
              description: d.data.description || '',
              content: normaliseContent(d.data.content || []),
              category: d.data.category || 'Announcement',
              categoryColor: d.data.categoryColor || 'bg-primary-100 text-primary-700',
              coverImage: d.data.coverImage || '',
              published: d.data.published || false,
            });
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [isNew, params.id]);

  const selectCategory = (opt: typeof CATEGORY_OPTIONS[0]) => {
    setForm((f) => ({ ...f, category: opt.label, categoryColor: opt.color }));
  };

  // ---- Block operations ----
  const addBlock = (type: string, atIndex: number) => {
    const newBlock: ContentBlock = { type: type as ContentBlock['type'], content: '' };
    if (type === 'heading') newBlock.level = 2;
    if (type === 'code') newBlock.language = 'bash';
    if (type === 'list') newBlock.items = [''];
    setForm((f) => {
      const content = [...f.content];
      content.splice(atIndex, 0, newBlock);
      return { ...f, content };
    });
    setAddMenuIdx(null);
  };

  const removeBlock = (index: number) => {
    setForm((f) => {
      const content = f.content.filter((_, i) => i !== index);
      return { ...f, content: content.length ? content : [{ type: 'paragraph', content: '' }] };
    });
  };

  const moveBlock = (index: number, dir: -1 | 1) => {
    setForm((f) => {
      const content = [...f.content];
      const target = index + dir;
      if (target < 0 || target >= content.length) return f;
      [content[index], content[target]] = [content[target], content[index]];
      return { ...f, content };
    });
  };

  const updateBlock = (index: number, patch: Partial<ContentBlock>) => {
    setForm((f) => {
      const content = [...f.content];
      content[index] = { ...content[index], ...patch };
      return { ...f, content };
    });
  };

  const addListItem = (blockIdx: number) => {
    setForm((f) => {
      const content = [...f.content];
      const block = { ...content[blockIdx] };
      block.items = [...(block.items || []), ''];
      content[blockIdx] = block;
      return { ...f, content };
    });
  };

  const removeListItem = (blockIdx: number, itemIdx: number) => {
    setForm((f) => {
      const content = [...f.content];
      const block = { ...content[blockIdx] };
      block.items = (block.items || []).filter((_, i) => i !== itemIdx);
      content[blockIdx] = block;
      return { ...f, content };
    });
  };

  const updateListItem = (blockIdx: number, itemIdx: number, value: string) => {
    setForm((f) => {
      const content = [...f.content];
      const block = { ...content[blockIdx] };
      block.items = [...(block.items || [])];
      block.items[itemIdx] = value;
      content[blockIdx] = block;
      return { ...f, content };
    });
  };

  const save = async () => {
    if (!form.title.trim() || !form.slug.trim()) return;
    setSaving(true);
    try {
      const url = isNew ? `${API_URL}/api/admin/news` : `${API_URL}/api/admin/news/${params.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await authFetch(url, { method, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) router.push('/admin/news');
    } catch {
      // handle error
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
            <div className="h-5 bg-slate-200 rounded w-1/3 mb-4" />
            <div className="h-10 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/news" className="text-sm text-slate-500 hover:text-primary-600 transition-colors">
            &larr; Back to News
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">{isNew ? 'New News Item' : 'Edit News Item'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
            className={`relative w-12 h-6 rounded-full transition-colors ${form.published ? 'bg-primary-600' : 'bg-slate-300'}`}>
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-6' : ''}`} />
          </button>
          <span className="text-sm text-slate-500">{form.published ? 'Published' : 'Draft'}</span>
          <button onClick={save} disabled={saving || !form.title.trim() || !form.slug.trim()}
            className="px-5 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {saving ? 'Saving…' : isNew ? 'Create' : 'Update'}
          </button>
        </div>
      </div>

      {/* Title + Slug */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-4">
        <input value={form.title}
          onChange={(e) => {
            const title = e.target.value;
            setForm((f) => ({ ...f, title, ...(isNew || !f.slug ? { slug: slugify(title) } : {}) }));
          }}
          className="w-full text-2xl font-bold text-slate-900 border-0 outline-none placeholder-slate-300 mb-2" placeholder="News item title…" />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400">Slug:</span>
          <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
            className="flex-1 text-slate-500 border-0 outline-none font-mono text-sm" placeholder="news-item-slug" />
        </div>
      </div>

      {/* Description (excerpt) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Description / Excerpt</label>
        <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Brief summary for the news listing…" rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-slate-900 resize-none" />
      </div>

      {/* Cover Image */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Cover Image</label>
        <div className="flex items-center gap-2">
          <input value={form.coverImage} onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
            placeholder="https://images.unsplash.com/…" className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm text-slate-700" />
          {form.coverImage && (
            <button type="button" onClick={() => setForm((f) => ({ ...f, coverImage: '' }))}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </div>
        {form.coverImage && (
          <div className="mt-3 rounded-lg overflow-hidden border border-slate-200">
            <img src={form.coverImage} alt="Cover preview" className="w-full max-h-48 object-cover" />
          </div>
        )}
      </div>

      {/* Category */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-3">Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((opt) => (
            <button key={opt.label} type="button" onClick={() => selectCategory(opt)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                form.category === opt.label ? `${opt.color} ring-2 ring-offset-2 ring-primary-500` : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Blocks */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-4">Content</label>
        <div className="space-y-3">
          {form.content.map((block, index) => (
            <div key={index} className="group relative border border-slate-100 rounded-xl p-4 hover:border-slate-200 transition-colors">
              {/* Block toolbar */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-slate-400">{BLOCK_TYPES.find((b) => b.type === block.type)?.icon}</span>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{block.type}</span>
                {block.type === 'heading' && (
                  <select value={block.level || 2} onChange={(e) => updateBlock(index, { level: Number(e.target.value) as 2 | 3 })}
                    className="ml-2 text-xs border border-slate-200 rounded px-1.5 py-0.5 text-slate-600">
                    <option value={2}>H2</option>
                    <option value={3}>H3</option>
                  </select>
                )}
                {block.type === 'code' && (
                  <select value={block.language || 'bash'} onChange={(e) => updateBlock(index, { language: e.target.value })}
                    className="ml-2 text-xs border border-slate-200 rounded px-1.5 py-0.5 text-slate-600 font-mono">
                    {CODE_LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                )}
                <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button type="button" onClick={() => moveBlock(index, -1)} disabled={index === 0}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 transition-colors" title="Move up">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
                  </button>
                  <button type="button" onClick={() => moveBlock(index, 1)} disabled={index === form.content.length - 1}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 transition-colors" title="Move down">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </button>
                  <button type="button" onClick={() => removeBlock(index)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors" title="Remove block">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                  </button>
                </div>
              </div>

              {/* Block content editors */}
              {(block.type === 'paragraph' || block.type === 'quote') && (
                <textarea value={block.content} onChange={(e) => updateBlock(index, { content: e.target.value })}
                  rows={block.type === 'quote' ? 2 : 3}
                  className={`w-full px-2 py-1 border-0 outline-none text-sm resize-none ${block.type === 'quote' ? 'italic text-slate-600 border-l-4 border-l-primary-300 pl-4' : 'text-slate-700'}`}
                  placeholder={block.type === 'quote' ? 'Enter a quote…' : 'Write your content…'} />
              )}
              {block.type === 'heading' && (
                <input type="text" value={block.content} onChange={(e) => updateBlock(index, { content: e.target.value })}
                  className={`w-full px-2 py-1 border-0 outline-none font-bold text-slate-900 ${block.level === 3 ? 'text-lg' : 'text-xl'}`}
                  placeholder="Heading text…" />
              )}
              {block.type === 'code' && (
                <div>
                  <div className="flex gap-1 mb-2">
                    <button type="button" onClick={() => updateBlock(index, { caption: '' })}
                      className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                        block.caption !== '__preview__' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-700'
                      }`}>Write</button>
                    <button type="button" onClick={() => updateBlock(index, { caption: '__preview__' })}
                      className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                        block.caption === '__preview__' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-700'
                      }`}>Preview</button>
                  </div>
                  {block.caption === '__preview__' ? (
                    block.content.trim() ? (
                      <CodeBlock code={block.content} language={block.language} className="!my-0" />
                    ) : (
                      <div className="px-4 py-6 bg-slate-50 rounded-lg text-center text-slate-400 text-sm">No code to preview</div>
                    )
                  ) : (
                    <textarea value={block.content} onChange={(e) => updateBlock(index, { content: e.target.value })}
                      rows={6} spellCheck={false}
                      className="w-full px-3 py-2 bg-slate-900 text-green-400 font-mono text-sm rounded-lg border-0 outline-none resize-y"
                      placeholder="// Paste your code here…" />
                  )}
                </div>
              )}
              {block.type === 'image' && (
                <div className="space-y-2">
                  <input type="text" value={block.url || ''} onChange={(e) => updateBlock(index, { url: e.target.value, content: e.target.value })}
                    placeholder="Image URL" className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-slate-700" />
                  <input type="text" value={block.caption || ''} onChange={(e) => updateBlock(index, { caption: e.target.value })}
                    placeholder="Caption (optional)" className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-slate-500" />
                  {block.url && (
                    <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                      <img src={block.url} alt={block.caption || 'Preview'} className="w-full max-h-48 object-cover" />
                    </div>
                  )}
                </div>
              )}
              {block.type === 'list' && (
                <div className="space-y-1.5">
                  <input type="text" value={block.content} onChange={(e) => updateBlock(index, { content: e.target.value })}
                    placeholder="List heading (optional)" className="w-full px-2 py-1 text-sm font-medium text-slate-700 border-0 outline-none" />
                  {(block.items || ['']).map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-2 pl-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <input type="text" value={item} onChange={(e) => updateListItem(index, itemIdx, e.target.value)}
                        placeholder={`Item ${itemIdx + 1}`} className="flex-1 px-2 py-1 text-sm text-slate-700 border-0 outline-none" />
                      <button type="button" onClick={() => removeListItem(index, itemIdx)}
                        className="p-0.5 text-slate-300 hover:text-red-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addListItem(index)}
                    className="text-xs text-primary-600 hover:text-primary-700 pl-2 mt-1">+ Add item</button>
                </div>
              )}

              {/* Add block between */}
              <div className="relative flex justify-center mt-3 -mb-2">
                <button type="button" onClick={() => setAddMenuIdx(addMenuIdx === index + 1 ? null : index + 1)}
                  className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 hover:bg-primary-100 hover:text-primary-600 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </button>
                {addMenuIdx === index + 1 && (
                  <div className="absolute top-8 z-20 bg-white border border-slate-200 rounded-xl shadow-lg p-2 flex gap-1">
                    {BLOCK_TYPES.map((bt) => (
                      <button key={bt.type} type="button" onClick={() => addBlock(bt.type, index + 1)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                        title={bt.label}>
                        {bt.icon} {bt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Bottom add block toolbar */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
            {BLOCK_TYPES.map((bt) => (
              <button key={bt.type} type="button" onClick={() => addBlock(bt.type, form.content.length)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-50 text-slate-500 hover:bg-primary-50 hover:text-primary-700 transition-colors border border-slate-100">
                {bt.icon} {bt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
