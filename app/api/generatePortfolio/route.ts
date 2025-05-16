import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generatePortfolio } from '../../utils/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body); // Debugging

    const {
      userId,
      name,
      title,
      bio = '',
      skills = [],
      projects = [],
      socialLinks = {},
      github = '',
      linkedin = '',
      email = '',
      template = 'minimalist',
      creativeTagline = '',
      youtubeLinks = [],
      backgroundImage = 'none',
    } = body;

    if (!userId || !name || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const aiContent = await generatePortfolio({
      template,
      name,
      title,
      bio,
      skills,
      projects,
      email,
      github,
      linkedin,
      socialLinks,
      creativeTagline,
      youtubeLinks,
    });

    const newPortfolio = await prisma.portfolio.create({
      data: {
        user: {
          connect: { id: userId },
        },
        name,
        title: template === 'creative' ? creativeTagline || title : title,
        bio,
        skills,          // ✅ No JSON.stringify
        projects,        // ✅ No JSON.stringify
        socialLinks,     // ✅ No JSON.stringify
        github,
        linkedin,
        template,
        content: aiContent,
        backgroundImage,
      },
    });

    return NextResponse.json({ portfolio: newPortfolio }, { status: 200 });
  } catch (error: any) {
    console.error('Portfolio creation error:', error);
    return NextResponse.json(
      { message: 'Error creating portfolio', error: error.message },
      { status: 500 }
    );
  }
}
