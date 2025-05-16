'use client';

import { useEffect, useState } from 'react';
import MinimalistPortfolioForm from '@/components/form/MinimalistPortfolioForm';
import CreativeShowcaseForm from '@/components/form/CreativeShowcaseForm';

export default function PortfolioBuilderPage() {
  const [template, setTemplate] = useState<string | null>(null);

  useEffect(() => {
    const storedTemplate = localStorage.getItem('selectedTemplate');
    setTemplate(storedTemplate || 'templateOne'); // default to minimalist
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Build Your Portfolio</h1>

      {template === 'templateOne' && <MinimalistPortfolioForm />}
      {template === 'templateTwo' && <CreativeShowcaseForm />}
    </main>
  );
}
