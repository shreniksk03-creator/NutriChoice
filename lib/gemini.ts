export interface GeminiRecommendation {
  suggestion: string;
  reasoning: string;
}

export async function getHealthRecommendations(meals: { name: string, calories: number }[]): Promise<GeminiRecommendation> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("GEMINI_API_KEY not found. Using mock data.");
    return getMockRecommendation(meals);
  }

  try {
    const mealList = meals.map(m => `${m.name} (${m.calories} kcal)`).join(', ');
    const prompt = `Analyze the following daily meal log and provide a short, healthy alternative or suggestion: ${mealList}. Format response as JSON with "suggestion" and "reasoning" keys.`;
    
    // We would normally use the Google Generative AI SDK here. 
    // Implementing standard fetch logic for production-readiness.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (textResponse) {
      try {
        // Strip markdown code block formatting if present
        const jsonStr = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr) as GeminiRecommendation;
      } catch (parseError) {
        return {
          suggestion: "Eat more vegetables.",
          reasoning: "The AI response was not in the expected JSON format."
        };
      }
    }
    
    throw new Error("Invalid response format from Gemini API");
  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    return {
      suggestion: "Service unavailable.",
      reasoning: "Could not fetch recommendations at this time."
    };
  }
}

function getMockRecommendation(meals: { name: string, calories: number }[]): GeminiRecommendation {
  if (meals.length === 0) {
    return {
      suggestion: "Start by logging your first meal!",
      reasoning: "I need to know what you eat to give recommendations."
    };
  }
  
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  
  if (totalCalories > 2000) {
    return {
      suggestion: "Consider lighter meals for the rest of the day.",
      reasoning: "You have exceeded 2000 calories. A salad or soup might be a good choice."
    };
  }

  const hasVeggie = meals.some(m => m.name.toLowerCase().includes('salad') || m.name.toLowerCase().includes('veg'));
  if (!hasVeggie) {
    return {
      suggestion: "Try adding a side of steamed spinach or a fresh salad.",
      reasoning: "Your diet is missing essential greens which provide important vitamins and fiber."
    };
  }

  return {
    suggestion: "You are doing great!",
    reasoning: "Your calorie intake is balanced and you're eating well."
  };
}
