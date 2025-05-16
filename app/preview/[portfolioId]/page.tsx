
import prisma from '@/lib/prisma';
import React from 'react';
import TemplateOne from '@/components/templates/TemplateOne';
import TemplateTwo from '@/components/templates/TemplateTwo';

interface Project {
  name: string;
  description: string;
}

interface PreviewPageProps {
  params: {
    portfolioId: string;
  };
}

async function getPortfolioById(portfolioId: string) {
  const id = parseInt(portfolioId, 10);
  if (isNaN(id)) return null;

  return prisma.portfolio.findUnique({
    where: { id },
  });
}

function parseArrayField(field: any): string[] {
  if (Array.isArray(field)) return field;
  if (typeof field === 'string') {
    try {
      const parsed = JSON.parse(field);
      if (Array.isArray(parsed)) return parsed;
      return field.split(',').map((s) => s.trim());
    } catch {
      return field.split(',').map((s) => s.trim());
    }
  }
  return [];
}

function parseObjectField(field: any): Record<string, string> {
  if (typeof field === 'object' && field !== null) return field;
  if (typeof field === 'string') {
    try {
      const parsed = JSON.parse(field);
      return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch {
      return {};
    }
  }
  return {};
}

function parseProjects(field: any): Project[] {
  if (Array.isArray(field)) {
    if (field.length > 0 && typeof field[0] === 'string') {
      return field.map((name) => ({ name, description: '' }));
    }
    return field as Project[];
  }

  if (typeof field === 'string') {
    try {
      const parsed = JSON.parse(field);
      if (Array.isArray(parsed)) {
        return parsed.map((p: any) => ({
          name: p.name || '',
          description: p.description || '',
        }));
      }
    } catch {
      return field.split(',').map((name) => ({ name: name.trim(), description: '' }));
    }
  }

  return [];
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { portfolioId } = params;
  const portfolio = await getPortfolioById(portfolioId);
  if (!portfolio) return <div>Portfolio not found</div>;

  const skills = parseArrayField(portfolio.skills);
  const projects = parseProjects(portfolio.projects);
  const socialLinks = parseObjectField(portfolio.socialLinks);

  const commonProps = {
    name: portfolio.name,
    title: portfolio.title,
    bio: portfolio.bio,
    skills,
    projects,
    socialLinks,
    content: portfolio.content || '',
    backgroundImage: portfolio.backgroundImage || 'none',
  };

  switch (portfolio.template) {
    case 'TemplateTwo':
      return <TemplateTwo portfolio={commonProps} />;
    case 'TemplateOne':
    default:
      return <TemplateOne portfolio={commonProps} />;
  }
}
