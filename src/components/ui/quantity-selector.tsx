'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
  className = ''
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className={`flex items-center border border-gray-300 rounded-md ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        className="h-10 w-10 p-0 hover:bg-gray-100 disabled:opacity-50"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <Input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        className="h-10 w-16 text-center border-0 focus:ring-0 focus:border-0"
      />
      
      <Button
        variant="ghost"
        size="sm"
        className="h-10 w-10 p-0 hover:bg-gray-100 disabled:opacity-50"
        onClick={handleIncrement}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

// components/ui/loading-spinner.tsx
