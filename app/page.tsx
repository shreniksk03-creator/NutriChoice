import MealLogger from '@/components/MealLogger';
import AIRecommendationPanel from '@/components/AIRecommendationPanel';

export default function Home() {
  return (
    <div className="row g-4">
      <div className="col-lg-6">
        <section aria-labelledby="meal-logger-heading">
          <h2 id="meal-logger-heading" className="h4 mb-3 text-high-contrast">Log Your Meal</h2>
          <MealLogger />
        </section>
      </div>
      <div className="col-lg-6">
        <section aria-labelledby="ai-panel-heading">
          <h2 id="ai-panel-heading" className="h4 mb-3 text-high-contrast">Smart AI Advisor</h2>
          <AIRecommendationPanel />
        </section>
      </div>
    </div>
  );
}
