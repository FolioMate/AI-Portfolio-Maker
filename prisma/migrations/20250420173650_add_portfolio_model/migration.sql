-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "tagline" TEXT,
    "bio" TEXT NOT NULL,
    "skills" TEXT[],
    "projects" JSONB,
    "testimonials" TEXT,
    "youtubeEmbed" TEXT,
    "socialLinks" JSONB,
    "experience" TEXT,
    "contact" JSONB NOT NULL,
    "education" JSONB,
    "workExperience" JSONB,
    "certifications" TEXT[],
    "objective" TEXT,
    "portfolioText" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
