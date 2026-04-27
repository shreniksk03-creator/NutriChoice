import { renderHook, act } from '@testing-library/react';
import { useMealContext, MealProvider } from '../context/MealContext';
import React from 'react';

// Mock localStorage
const localStorageMock = (function() {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('MealContext Calorie Logic', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should correctly calculate total calories', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MealProvider>{children}</MealProvider>
    );
    
    const { result } = renderHook(() => useMealContext(), { wrapper });

    expect(result.current.totalCalories).toBe(0);

    act(() => {
      result.current.addMeal({ name: 'Apple', calories: 95 });
    });

    expect(result.current.totalCalories).toBe(95);

    act(() => {
      result.current.addMeal({ name: 'Banana', calories: 105 });
    });

    expect(result.current.totalCalories).toBe(200);
  });
});
