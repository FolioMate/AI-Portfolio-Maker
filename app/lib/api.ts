// lib/api.ts
export const getPortfolioData = async (portfolioId: string) => {
    const response = await fetch(`/api/portfolio/${portfolioId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch portfolio");
    }
    return response.json();
  };
  