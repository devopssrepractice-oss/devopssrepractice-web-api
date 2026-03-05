'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import CodeBlock from '@/components/common/CodeBlock';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const TAG_OPTIONS = [
  { label: 'Kubernetes', color: 'bg-primary-100 text-primary-700' },
  { label: 'GitOps', color: 'bg-purple-100 text-purple-700' },
  { label: 'IaC', color: 'bg-emerald-100 text-emerald-700' },
  { label: 'SRE', color: 'bg-amber-100 text-amber-700' },
  { label: 'Observability', color: 'bg-pink-100 text-pink-700' },
  { label: 'CI/CD', color: 'bg-cyan-100 text-cyan-700' },
  { label: 'Security', color: 'bg-red-100 text-red-700' },
  { label: 'Cloud', color: 'bg-indigo-100 text-indigo-700' },
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

interface PostForm {
  slug: string;
  title: string;
  excerpt: string;
  content: ContentBlock[];
  tag: string;
  tagColor: string;
  readTime: string;
  coverImage: string;
  published: boolean;
}

const emptyForm: PostForm = {
  slug: '',
  title: '',
  excerpt: '',
  content: [{ type: 'paragraph', content: '' }],
  tag: 'Kubernetes',
  tagColor: 'bg-primary-100 text-primary-700',
  readTime: '5 min read',
  coverImage: '',
  published: false,
};

/** Normalise legacy string[] content into ContentBlock[] */
function normaliseContent(raw: any[]): ContentBlock[] {
  if (!raw?.length) return [{ type: 'paragraph', content: '' }];
  return raw.map((item) =>
    typeof item === 'string' ? { type: 'paragraph' as const, content: item } : (item as ContentBlock)
  );
}

export default function PostEditorPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  const router = useRouter();
  const { authFetch } = useAuth();
  const [form, setForm] = useState<PostForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [showAddMenu, setShowAddMenu] = useState<number | null>(null);

  useEffect(() => {
    if (isNew) return;
    authFetch(`${API_URL}/api/admin/posts/${params.id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setForm({
            slug: d.data.slug,
            title: d.data.title,
            excerpt: d.data.excerpt,
            content: normaliseContent(d.data.content),
            tag: d.data.tag,
            tagColor: d.data.tagColor,
            readTime: d.data.readTime,
            coverImage: d.data.coverImage || '',
            published: d.data.published,
          });
        }
      })
      .catch(() => setError('Failed to load post'))
      .finally(() => setLoading(false));
  }, [params.id]);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({ ...prev, title, slug: isNew ? generateSlug(title) : prev.slug }));
  };

  const handleTagSelect = (tag: string) => {
    const option = TAG_OPTIONS.find((t) => t.label === tag);
    setForm((prev) => ({ ...prev, tag, tagColor: option?.color || prev.tagColor }));
  };

  /* ---- Block operations ---- */
  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    setForm((prev) => {
      const content = [...prev.content];
      content[index] = { ...content[index], ...updates };
      return { ...prev, content };
    });
  };

  const addBlock = (type: ContentBlock['type'], afterIndex: number) => {
    const newBlock: ContentBlock = { type, content: '' };
    if (type === 'heading') newBlock.level = 2;
    if (type === 'code') newBlock.language = 'bash';
    if (type === 'list') newBlock.items = [''];
    setForm((prev) => {
      const content = [...prev.content];
      content.splice(afterIndex + 1, 0, newBlock);
      return { ...prev, content };
    });
    setShowAddMenu(null);
    setActiveBlock(afterIndex + 1);
  };

  const removeBlock = (index: number) => {
    if (form.content.length <= 1) return;
    setForm((prev) => ({ ...prev, content: prev.content.filter((_, i) => i !== index) }));
    setActiveBlock(null);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= form.content.length) return;
    setForm((prev) => {
      const content = [...prev.content];
      [content[index], content[newIndex]] = [content[newIndex], content[index]];
      return { ...prev, content };
    });
    setActiveBlock(newIndex);
  };

  /* ---- List item operations ---- */
  const updateListItem = (blockIndex: number, itemIndex: number, value: string) => {
    setForm((prev) => {
      const content = [...prev.content];
      const items = [...(content[blockIndex].items || [])];
      items[itemIndex] = value;
      content[blockIndex] = { ...content[blockIndex], items };
      return { ...prev, content };
    });
  };

  const addListItem = (blockIndex: number) => {
    setForm((prev) => {
      const content = [...prev.content];
      const items = [...(content[blockIndex].items || []), ''];
      content[blockIndex] = { ...content[blockIndex], items };
      return { ...prev, content };
    });
  };

  const removeListItem = (blockIndex: number, itemIndex: number) => {
    setForm((prev) => {
      const content = [...prev.content];
      const items = (content[blockIndex].items || []).filter((_, i) => i !== itemIndex);
      if (items.length === 0) items.push('');
      content[blockIndex] = { ...content[blockIndex], items };
      return { ...prev, content };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const url = isNew ? `${API_URL}/api/admin/posts` : `${API_URL}/api/admin/posts/${params.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const payload = {
        ...form,
        content: form.content.filter((b) => b.content.trim() || (b.items && b.items.some((i) => i.trim()))),
      };
      const res = await authFetch(url, { method, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Save failed'); return; }
      router.push('/admin/posts');
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts" className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">{isNew ? 'New Blog Post' : 'Edit Blog Post'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className={`relative w-10 h-5 rounded-full transition-colors ${form.published ? 'bg-primary-600' : 'bg-slate-300'}`}>
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="sr-only" />
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-5' : ''}`} />
            </div>
            <span className="text-sm font-medium text-slate-600">{form.published ? 'Published' : 'Draft'}</span>
          </label>
          <button onClick={handleSubmit} disabled={saving}
            className="px-5 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors">
            {saving ? 'Saving…' : isNew ? 'Create' : 'Save'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Cover Image + Title */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {form.coverImage && (
            <div className="relative h-48 bg-slate-100">
              <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
              <button type="button" onClick={() => setForm({ ...form, coverImage: '' })}
                className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <input type="text" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                placeholder="Cover image URL (optional)"
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-slate-700" />
            </div>
            <input type="text" required value={form.title} onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full text-2xl font-bold text-slate-900 border-0 outline-none placeholder-slate-300 mb-2" placeholder="Post title…" />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400 font-mono">/blog/</span>
              <input type="text" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="flex-1 px-2 py-1 rounded border border-slate-200 focus:border-primary-500 outline-none text-slate-700 font-mono text-sm" placeholder="url-slug" />
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Excerpt</label>
          <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2}
            className="w-full px-0 py-1 border-0 outline-none text-slate-700 resize-none" placeholder="Brief summary visible on listing pages…" />
        </div>

        {/* Meta: Tag + Read Time */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tag</label>
              <select value={form.tag} onChange={(e) => handleTagSelect(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-slate-700 text-sm">
                {TAG_OPTIONS.map((t) => <option key={t.label} value={t.label}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Read Time</label>
              <input type="text" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-slate-700 text-sm" placeholder="5 min read" />
            </div>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Content Blocks</label>
            <span className="text-xs text-slate-400">{form.content.length} block{form.content.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="space-y-3">
            {form.content.map((block, index) => (
              <div key={index}
                className={`group relative border rounded-xl transition-all ${activeBlock === index ? 'border-primary-300 shadow-sm ring-1 ring-primary-100' : 'border-slate-200 hover:border-slate-300'}`}
                onClick={() => setActiveBlock(index)}>
                {/* Block toolbar */}
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{BLOCK_TYPES.find((b) => b.type === block.type)?.icon}</span>
                    <span className="text-xs font-medium text-slate-500 capitalize">{block.type}</span>
                    {block.type === 'heading' && (
                      <select value={block.level || 2} onChange={(e) => updateBlock(index, { level: Number(e.target.value) as 2 | 3 })}
                        className="text-xs border border-slate-200 rounded px-1.5 py-0.5 text-slate-600 bg-white">
                        <option value={2}>H2</option><option value={3}>H3</option>
                      </select>
                    )}
                    {block.type === 'code' && (
                      <select value={block.language || 'bash'} onChange={(e) => updateBlock(index, { language: e.target.value })}
                        className="text-xs border border-slate-200 rounded px-1.5 py-0.5 text-slate-600 bg-white">
                        {CODE_LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => moveBlock(index, 'up')} disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
                    </button>
                    <button type="button" onClick={() => moveBlock(index, 'down')} disabled={index === form.content.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </button>
                    <div className="w-px h-4 bg-slate-200 mx-0.5" />
                    <button type="button" onClick={() => removeBlock(index)}
                      className="p-1 text-slate-400 hover:text-red-500">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                    </button>
                  </div>
                </div>

                {/* Block content */}
                <div className="p-3">
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
                        className="text-xs text-primary-600 hover:text-primary-700 font-medium pl-6">+ Add item</button>
                    </div>
                  )}
                </div>

                {/* Add block button (between blocks) */}
                <div className="relative flex justify-center -mb-1.5">
                  <div className="absolute -bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={(e) => { e.stopPropagation(); setShowAddMenu(showAddMenu === index ? null : index); }}
                      className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-primary-600 bg-white border border-primary-200 rounded-full shadow-sm hover:bg-primary-50 transition-colors">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                      Add
                    </button>
                  </div>
                  {showAddMenu === index && (
                    <div className="absolute -bottom-12 z-20 flex gap-1 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5">
                      {BLOCK_TYPES.map((bt) => (
                        <button key={bt.type} type="button" onClick={(e) => { e.stopPropagation(); addBlock(bt.type as ContentBlock['type'], index); }}
                          className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-primary-600 hover:bg-primary-50 transition-colors" title={bt.label}>
                          {bt.icon}
                          <span className="text-[10px] font-medium">{bt.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add block toolbar (bottom) */}
          <div className="mt-5 flex items-center justify-center">
            <div className="flex gap-1 bg-slate-50 rounded-xl p-1.5">
              {BLOCK_TYPES.map((bt) => (
                <button key={bt.type} type="button" onClick={() => addBlock(bt.type as ContentBlock['type'], form.content.length - 1)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-primary-600 hover:bg-white hover:shadow-sm transition-all" title={`Add ${bt.label}`}>
                  {bt.icon}
                  <span className="text-xs font-medium hidden sm:inline">{bt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex items-center justify-between pt-2">
          <Link href="/admin/posts" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Cancel</Link>
          <button type="submit" disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors">
            {saving ? 'Saving…' : isNew ? 'Create Post' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
