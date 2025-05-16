"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Only keep the Minimalist Portfolio template
const templates = [
  { id: 1, name: "Minimalist Portfolio", image: "/templates/template1.png" },
];

export default function TemplatePreviewPage() {
  const { id } = useParams();
  const router = useRouter();
  const template = templates.find((t) => t.id === Number(id));

  if (!template) {
    return <div className="text-center text-red-500 text-xl mt-10">❌ Template not found!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      {/* ✅ Template Name */}
      <h1 className="text-3xl font-semibold text-purple-700 mb-6">{template.name}</h1>

      {/* ✅ Template Image */}
      <div className="flex justify-center">
        <Image
          src={template.image}
          alt={template.name}
          width={600}
          height={400}
          className="rounded-lg shadow-lg border-2 border-gray-300"
        />
      </div>

      {/* ✅ Buttons */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
        {/* 🔹 Back to Templates */}
        <Link href="/templates">
          <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
            🔙 Back to Templates
          </button>
        </Link>

        {/* 🔹 Use This Template */}
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          onClick={() => router.push(`/portfolio-builder?template=${id}`)}
        >
          ✅ Use This Template
        </button>
      </div>
    </div>
  );
}
