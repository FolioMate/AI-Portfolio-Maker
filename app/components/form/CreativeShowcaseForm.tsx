'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import Input from '../ui/input';

interface Project {
  name: string;
  description: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

const backgroundPresets = [
  { label: 'None', value: 'none' },
  { label: 'Background 1', value: '/backgrounds/bg4.jpg' },
  { label: 'Background 2', value: '/backgrounds/bg5.jpg' },
  { label: 'Background 3', value: '/backgrounds/bg6.jpg' },
];

export default function CreativeShowcaseForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    github: '',
    linkedin: '',
    backgroundImage: 'none',
    creativeTagline: '',
    bio: '',
    skills: '',
  });

  const [projects, setProjects] = useState<Project[]>([{ name: '', description: '' }]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([{ platform: '', url: '' }]);
  const [youtubeLinks, setYoutubeLinks] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const addProject = () => setProjects([...projects, { name: '', description: '' }]);
  const removeProject = (index: number) => setProjects(projects.filter((_, i) => i !== index));

  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...socialLinks];
    newLinks[index][field] = value;
    setSocialLinks(newLinks);
  };

  const addSocialLink = () => setSocialLinks([...socialLinks, { platform: '', url: '' }]);
  const removeSocialLink = (index: number) => setSocialLinks(socialLinks.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!session?.user) {
      toast.error('You must be logged in to create a portfolio.');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        userId: (session.user as any).id,
        name: formData.name,
        title: formData.title,
        email: formData.email,
        github: formData.github,
        linkedin: formData.linkedin,
        backgroundImage: formData.backgroundImage || 'none',
        creativeTagline: formData.creativeTagline,
        bio: formData.bio,
        skills: formData.skills
          ? formData.skills.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        projects: projects.filter((p) => p.name.trim() && p.description.trim()),
        youtubeLinks: youtubeLinks
          ? youtubeLinks.split(',').map((y) => y.trim()).filter(Boolean)
          : [],
        socialLinks: socialLinks.reduce((acc, link) => {
          if (link.platform.trim() && link.url.trim()) {
            acc[link.platform.toLowerCase()] = link.url;
          }
          return acc;
        }, {} as Record<string, string>),
        template: 'creative',
      };

      const response = await fetch('/api/generatePortfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to generate portfolio');

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
    <Card className="max-w-3xl mx-auto mt-12 mb-20 shadow-lg border border-gray-200 bg-white">
      <CardHeader className="border-b border-gray-200 pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Creative Showcase Portfolio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
            <Input name="title" value={formData.title} onChange={handleChange} placeholder="Professional Title" required />
            <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email (optional)" type="email" />
            <Input name="github" value={formData.github} onChange={handleChange} placeholder="GitHub URL (optional)" type="url" />
            <Input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn URL (optional)" type="url" />
          </div>

          <Input name="creativeTagline" value={formData.creativeTagline} onChange={handleChange} placeholder="Creative Tagline" required />

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Creative Bio"
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[140px] resize-none"
            required
          />

          <Input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills (comma separated, e.g., HTML, CSS, JavaScript)"
          />

          <div>
            <label className="block text-lg font-semibold mb-3">Projects</label>
            <div className="space-y-4">
              {projects.map((project, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
                  <Input placeholder="Project Name" value={project.name} onChange={(e) => handleProjectChange(idx, 'name', e.target.value)} required />
                  <Input placeholder="Description" value={project.description} onChange={(e) => handleProjectChange(idx, 'description', e.target.value)} required />
                  {projects.length > 1 && (
                    <button type="button" onClick={() => removeProject(idx)} className="text-red-600 hover:text-red-800 rounded p-1.5" title="Remove project">
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={addProject} className="mt-3 inline-block rounded bg-purple-600 px-5 py-2 text-white font-semibold shadow hover:bg-purple-700 transition">
              + Add Project
            </button>
          </div>

          <Input
            name="youtubeLinks"
            value={youtubeLinks}
            onChange={(e) => setYoutubeLinks(e.target.value)}
            placeholder="YouTube Links (comma separated, optional)"
          />

          <div>
            <label className="block text-lg font-semibold mb-3 mt-6">Social Links</label>
            <div className="space-y-4">
              {socialLinks.map((link, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
                  <Input placeholder="Platform (e.g., Instagram)" value={link.platform} onChange={(e) => handleSocialLinkChange(idx, 'platform', e.target.value)} required />
                  <Input placeholder="URL" value={link.url} onChange={(e) => handleSocialLinkChange(idx, 'url', e.target.value)} required />
                  {socialLinks.length > 1 && (
                    <button type="button" onClick={() => removeSocialLink(idx)} className="text-red-600 hover:text-red-800 rounded p-1.5" title="Remove social link">
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={addSocialLink} className="mt-3 inline-block rounded bg-purple-600 px-5 py-2 text-white font-semibold shadow hover:bg-purple-700 transition">
              + Add Social Link
            </button>
          </div>

          <div>
            <p className="font-medium mb-2">Select Background</p>
            <div className="flex flex-wrap gap-4">
              {backgroundPresets.map((bg) => (
                <label key={bg.value} className="cursor-pointer flex flex-col items-center text-sm">
                  <input
                    type="radio"
                    name="backgroundImage"
                    value={bg.value}
                    checked={formData.backgroundImage === bg.value}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div
                    className={`w-20 h-12 border-2 rounded-lg ${
                      formData.backgroundImage === bg.value ? 'border-purple-600' : 'border-gray-300'
                    }`}
                    style={{
                      backgroundImage: bg.value !== 'none' ? `url(${bg.value})` : 'none',
                      backgroundColor: bg.value === 'none' ? '#fff' : 'transparent',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <span className="mt-1">{bg.label}</span>
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
