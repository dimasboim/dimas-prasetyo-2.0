'use client';

import { useEffect, useState } from 'react';

export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.views === 'number') setViews(data.views);
      })
      .catch(() => {});
  }, []);

  if (views === null) return null;

  return <span className="view-counter">{views.toLocaleString()} views</span>;
}
