const handleGeneratePortfolio = async () => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Generate a portfolio introduction for a developer." }] }],
        }),
      }
    );

    const data = await response.json();

    if (data && data.candidates) {
      console.log("Generated Portfolio:", data.candidates[0].content.parts[0].text);
    } else {
      console.log("No response from Gemini API.");
    }

    router.push("/templates");
  } catch (err) {
    console.error("Error generating portfolio:", err);
    setError("Failed to generate portfolio. Please try again.");
  } finally {
    setLoading(false);
  }
};
