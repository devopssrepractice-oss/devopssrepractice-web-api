'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  date: string;
  published: boolean;
}

export default function NewsListPage() {
  const { authFetch } = useAuth();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = () => {
    authFetch(`${API_URL}/api/admin/news`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setItems(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const togglePublish = async (item: NewsItem) => {
    await authFetch(`${API_URL}/api/admin/news/${item.id}/publish`, {
      method: 'PATCH',
      body: JSON.stringify({ published: !item.published }),
    });
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this news item permanently?')) return;
    await authFetch(`${API_URL}/api/admin/news/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">News Items</h1>
          <p className="text-slate-500 mt-1">{items.length} total items</p>
        </div>
        <Link
          href="/admin/news/new"
          className="px-4 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          + New Item
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse">
              <div className="h-5 bg-slate-200 rounded w-2/3 mb-3" />
              <div className="h-4 bg-slate-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500 mb-4">No news items yet</p>
          <Link href="/admin/news/new" className="text-primary-600 font-medium hover:text-primary-700">
            Create your first news item
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <Link href={`/admin/news/${item.id}`} className="font-medium text-slate-900 hover:text-primary-600 transition-colors">
                      {item.title}
                    </Link>
                    <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${item.categoryColor}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => togglePublish(item)}
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                        item.published
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      }`}
                    >
                      {item.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/news/${item.id}`}
                        className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
