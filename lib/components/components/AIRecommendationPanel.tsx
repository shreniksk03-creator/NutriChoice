'use client';
import React from 'react';
import { useMealContext } from '@/context/MealContext';

export default function AIRecommendationPanel() {
  const { recommendations, loading } = useMealContext();

  return (
    <div className="card shadow-sm border-success">
      <div className="card-body">
        <h5 className="card-title text-success mb-3">AI Smart Suggestions</h5>
        {loading ? (
          <div className="d-flex align-items-center">
            <div className="spinner-border spinner-border-sm text-success me-2" role="status"></div>
            <span>Analyzing your nutrition...</span>
          </div>
        ) : (
          <div className="recommendation-content">
            {recommendations ? (
              <p className="card-text" style={{ whiteSpace: 'pre-line' }}>{recommendations}</p>
            ) : (
              <p className="text-muted">Log a meal to see personalized AI advice!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
