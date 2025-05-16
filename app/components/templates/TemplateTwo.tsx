import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Project {
  name: string;
  description: string;
}

interface PortfolioProps {
  portfolio: {
    name: string;
    title?: string;
    bio?: string;
    skills?: string[];
    projects?: Project[];
    socialLinks?: Record<string, string>;
    content?: string;
    backgroundImage?: string;
  };
}

export default function TemplateTwo({ portfolio }: PortfolioProps) {
  const {
    name,
    title,
    bio,
    skills = [],
    projects = [],
    socialLinks = {},
    content,
    backgroundImage,
  } = portfolio;

  // Map simple keys to image URLs
  const backgroundPresets: Record<string, string> = {
    bg4: '/backgrounds/bg4.jpg',
    bg5: '/backgrounds/bg5.jpg',
    bg6: '/backgrounds/bg6.jpg',
  };

  // Resolve background image URL from key or raw string
  const resolvedBackgroundImage =
    backgroundImage && backgroundPresets[backgroundImage]
      ? backgroundPresets[backgroundImage]
      : backgroundImage || '';

  const backgroundStyle: React.CSSProperties = resolvedBackgroundImage
    ? {
        backgroundImage: `url("${resolvedBackgroundImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {
        backgroundColor: '#ffffff',
      };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={backgroundStyle}
    >
      <div className="w-full max-w-4xl bg-white bg-opacity-40 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">{name}</h1>
          {title && <h2 className="text-xl text-gray-600 mt-2">{title}</h2>}
        </div>

        {bio && (
          <p className="text-gray-700 text-lg text-center mb-6">{bio}</p>
        )}

        {skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Skills</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="border p-4 rounded-lg shadow-sm bg-white"
                >
                  <h4 className="text-lg font-bold text-purple-700">
                    {project.name}
                  </h4>
                  <p className="text-gray-700 text-sm mt-1">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {content && (
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              More About Me
            </h3>
            <ReactMarkdown
              className="text-gray-700 whitespace-pre-wrap"
              remarkPlugins={[remarkGfm]}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}

        {(socialLinks.github ||
          socialLinks.linkedin ||
          socialLinks.instagram ||
          socialLinks.youtube) && (
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              Connect with me
            </h3>
            <div className="flex justify-center gap-4">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  LinkedIn
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  Instagram
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
