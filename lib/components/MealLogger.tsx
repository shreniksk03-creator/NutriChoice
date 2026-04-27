'use client';
import React, { useState } from 'react';
import { useMealContext } from '@/context/MealContext';

export default function MealLogger() {
  const [meal, setMeal] = useState('');
  const { addMeal } = useMealContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meal.trim()) return;
    addMeal(meal);
    setMeal('');
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Log Your Meal</h5>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="What did you eat? (e.g., Chicken Biryani)"
              value={meal}
              onChange={(e) => setMeal(e.target.value)}
              aria-label="Meal input"
            />
            <button className="btn btn-primary" type="submit">Log Meal</button>
          </div>
        </form>
      </div>
    </div>
  );
}
