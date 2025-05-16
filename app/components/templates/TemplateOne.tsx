'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Project {
  name: string;
  description: string;
}

interface TemplateOneProps {
  portfolio: {
    name: string;
    title: string;
    bio?: string;
    skills: string[];
    projects: Project[];  // <-- Project objects, NOT string[]
    socialLinks: {
      email?: string;
      linkedin?: string;
      github?: string;
    };
    content?: string;
    backgroundImage?: string;
  };
}

const TemplateOne: React.FC<TemplateOneProps> = ({ portfolio }) => {
  const { 
    name, 
    title, 
    bio, 
    skills, 
    projects, 
    socialLinks, 
    content, 
    backgroundImage 
  } = portfolio;

  const cardBackgroundStyle: React.CSSProperties = {
    backgroundImage: backgroundImage && backgroundImage !== 'none' 
      ? `url(/backgrounds/${backgroundImage}.jpg)` 
      : undefined,
    backgroundColor: backgroundImage === 'none' || !backgroundImage ? '#ffffff' : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const LinkRenderer = ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-blue-600 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );

  return (
    <div className="min-h-screen py-12 pt-28 px-4 font-sans bg-gray-800 flex justify-center items-start">
      <Card className="rounded-2xl overflow-hidden max-w-3xl w-full">
        <div
          className="p-6 rounded-2xl text-black"
          style={cardBackgroundStyle}
        >
          <CardHeader>
            <CardTitle className="text-center text-3xl text-purple-600">{name}</CardTitle>
            <p className="text-center font-semibold">{title}</p>
            {bio && <p className="text-center">{bio}</p>}
          </CardHeader>

          <CardContent className="space-y-6 text-black bg-white/70 rounded-lg p-4 mt-4">
            {content && (
              <section>
                <h2 className="text-xl font-semibold text-purple-600 mb-2">
                  Professional Summary
                </h2>
                <ReactMarkdown
                  className="prose prose-sm max-w-none"
                  remarkPlugins={[remarkGfm]}
                  components={{ a: LinkRenderer }}
                >
                  {content}
                </ReactMarkdown>
              </section>
            )}

            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-purple-600 mb-2">Skills</h2>
                <ul className="list-disc list-inside">
                  {skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-purple-600 mb-2">Projects</h2>
                <ul className="list-disc list-inside">
                  {projects.map((project, index) => (
                    <li key={index}>
                      <h4 className="font-semibold">{project.name}</h4>
                      <p>{project.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h2 className="text-xl font-semibold text-purple-600 mb-2">Contact</h2>
              {socialLinks.email && (
                <p>
                  Email:{' '}
                  <a href={`mailto:${socialLinks.email}`} className="text-blue-600 underline">
                    {socialLinks.email}
                  </a>
                </p>
              )}
              {socialLinks.github && (
                <p>
                  GitHub:{' '}
                  <a
                    href={socialLinks.github}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {socialLinks.github}
                  </a>
                </p>
              )}
              {socialLinks.linkedin && (
                <p>
                  LinkedIn:{' '}
                  <a
                    href={socialLinks.linkedin}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {socialLinks.linkedin}
                  </a>
                </p>
              )}
            </section>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default TemplateOne;
