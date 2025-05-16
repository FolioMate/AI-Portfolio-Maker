"use client";

import { useRouter } from "next/navigation";

const templates = [
  {
    id: "templateOne",
    name: "Minimalist Portfolio",
    image: "/templates/template1.png",
  },
  {
    id: "templateTwo",
    name: "Creative Showcase",
    image: "/templates/template2.png", // ✅ Add your image in public/templates/
  },
];

const TemplatesPage = () => {
  const router = useRouter();

  const handleTemplateSelect = (templateId: string) => {
    localStorage.setItem("selectedTemplate", templateId);
    router.push("/portfolio-builder");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 pt-28 pb-6 px-4">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-3 px-3 py-2 pt-3 bg-white text-black rounded-lg shadow-md">
        Choose Your Portfolio Template
      </h1>

      {/* Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-lg p-4 border border-gray-300 cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105"
            onClick={() => handleTemplateSelect(template.id)}
          >
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-center text-lg font-semibold mt-4">{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
