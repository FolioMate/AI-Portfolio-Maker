// app/lib/parsers.ts

export function parseProjectsField(projectsField: string | null): { name: string; description: string }[] {
  try {
    const parsed = JSON.parse(projectsField || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) => typeof item === 'object' && 'name' in item && 'description' in item
    ) as { name: string; description: string }[];
  } catch {
    return [];
  }
}

export function parseArrayField(field: string | null): string[] {
  try {
    const parsed = JSON.parse(field || '[]');
    if (Array.isArray(parsed)) return parsed.filter(item => typeof item === 'string');
    return [];
  } catch {
    return [];
  }
}
