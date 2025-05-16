"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const resources = [
  { id: 1, title: "How to Create a Portfolio with AI", link: "/resources/how-to-create-portfolio", category: "AI" },
  { id: 2, title: "Best SEO Tips for Portfolios", link: "/resources/best-seo-tips", category: "SEO" },
];

const ResourcesPage = () => {
  return (
    <div className="min-h-screen bg-gray-800 p-8 pt-28 text-gray-900">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Resources & Guides</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105">
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={resource.link}
                className="text-indigo-500 hover:underline"
              >
                Read More →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
