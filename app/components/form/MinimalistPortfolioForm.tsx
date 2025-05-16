'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import Input from '../ui/input';

export default function MinimalistPortfolioForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    skills: '',
    projects: '',
    email: '',
    github: '',
    linkedin: '',
    backgroundImage: 'none', // NEW
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!session?.user) {
      toast.error('You must be logged in to create a portfolio.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/generatePortfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          name: formData.name,
          title: formData.title,
          bio: formData.bio || '',
          skills: formData.skills ? formData.skills.split(',').map((s) => s.trim()) : [],
          projects: formData.projects ? formData.projects.split(',').map((p) => p.trim()) : [],
          socialLinks: {
            email: formData.email || '',
            github: formData.github || '',
            linkedin: formData.linkedin || '',
          },
          github: formData.github || '',
          linkedin: formData.linkedin || '',
          backgroundImage: formData.backgroundImage,
          template: 'minimalist',
          content: '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate portfolio');
      }

      const { portfolio } = await response.json();
      router.push(`/preview/${portfolio.id}`);
    } catch (error) {
      console.error('Error generating portfolio:', error);
      toast.error('Failed to generate portfolio. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10 mb-20">
      <CardHeader>
        <CardTitle>Minimalist Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="shadow-sm"
          />
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="shadow-sm"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Short Bio"
            className="w-full border border-gray-300 p-2 rounded-md shadow-sm"
          />

          <Input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills (comma separated)"
            className="shadow-sm"
          />

          <Input
            name="projects"
            value={formData.projects}
            onChange={handleChange}
            placeholder="Projects (comma separated)"
            className="shadow-sm"
          />

          {/* Social Links Inputs in flex row */}
         <div className="flex flex-col md:flex-row gap-4">
           <Input
             name="email"
             type="email"
             value={formData.email}
             onChange={handleChange}
             placeholder="Email"
             className="w-full md:w-1/2 shadow-sm"
          />
           <Input
             name="github"
             value={formData.github}
             onChange={handleChange}
              placeholder="GitHub URL"
             className="w-full md:w-1/2"
           />
          </div>


          <div className="flex gap-4">
            <Input
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn URL"
              className="flex-[0_0_60%]"
            />
            {/* Empty div for alignment, if needed */}
            <div className="flex-[0_0_40%]" />
          </div>

          {/* Visual Background Image Selector */}
          <div>
            <p className="font-medium mb-2">Select Background</p>
            <div className="flex gap-4">
              {['none', 'bg1', 'bg2', 'bg3'].map((bg) => (
                <label key={bg} className="cursor-pointer">
                  <input
                    type="radio"
                    name="backgroundImage"
                    value={bg}
                    checked={formData.backgroundImage === bg}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div
                    className={`w-20 h-14 border-2 rounded-lg transition ${
                      formData.backgroundImage === bg
                        ? 'border-purple-600 ring-2 ring-purple-400'
                        : 'border-gray-300'
                    }`}
                    style={{
                      backgroundImage: bg === 'none' ? 'none' : `url(/backgrounds/${bg}.jpg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: bg === 'none' ? '#ffffff' : undefined,
                    }}
                  />
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-purple-600 py-3 text-white font-semibold shadow hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Generating...' : 'Generate Portfolio'}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
