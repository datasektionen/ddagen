import React, { useState, useRef, FC, useEffect } from 'react';

/*
  Heads up fellow developers,
  This component is mostly made using chat gpt-4o 
  because I was to tired to write it myself.

  This might explain (never really read through it all) if the tailwind code is abosulte garbage
*/

interface MultiRangeSliderProps {
    header: String;
    min: number;
    max: number;
    step?: number;
    onChange: (minValue: number, maxValue: number) => void;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({header, min, max, step = 1, onChange }) => {
    

  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const rangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (minValue !== min || maxValue !== max) {
      onChange(minValue, maxValue);
    }
  }, [minValue, maxValue]);

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

  const handleMouseMove = (e: MouseEvent, type: 'min' | 'max') => {
    if (!rangeRef.current) return;

    const rect = rangeRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const value = min + Math.round((percent * (max - min)) / step) * step;

    if (type === 'min') {
      setMinValue(Math.min(value, maxValue));
    } else {
      setMaxValue(Math.max(value, minValue));
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMoveMin);
    document.removeEventListener('mousemove', handleMouseMoveMax);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMoveMin = (e: MouseEvent) => handleMouseMove(e, 'min');
  const handleMouseMoveMax = (e: MouseEvent) => handleMouseMove(e, 'max');

  const handleMouseDown = (type: 'min' | 'max') => {
    document.addEventListener('mousemove', type === 'min' ? handleMouseMoveMin : handleMouseMoveMax);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const minPercent = getPercent(minValue);
  const maxPercent = getPercent(maxValue);

  return (
    <div className="relative w-full">
      <div className="flex justify-between text-white mb-4">
        <span>{min}</span>
        <span>{header}</span>
        <span>{max}</span>
      </div>
      <div className="relative w-full h-2 bg-gray/50 rounded-lg" ref={rangeRef}>
        <div
          className="absolute h-2 bg-cerise rounded-lg transition-all duration-300 ease-out"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        ></div>
        <div
          className="absolute top-0 w-8 h-8 bg-cerise border-2 select-none border-cerise rounded-full cursor-pointer flex items-center justify-center text-white text-md transition-all duration-300 ease-out"
          style={{
            left: `${minPercent}%`,
            transform: `translate(${minValue === maxValue ? '-50%, -50%' : '-50%, -50%'})`,
          }}
          onMouseDown={() => handleMouseDown('min')}
        >
          {Math.round(minValue)}
        </div>
        <div
          className="absolute top-0 w-8 h-8 bg-cerise border-2 select-none border-cerise rounded-full cursor-pointer flex items-center justify-center text-white text-md transition-all duration-300 ease-out"
          style={{
            left: `${maxPercent}%`,
            transform: `translate(${minValue === maxValue ? '50%, -50%' : '-50%, -50%'})`,
            zIndex: maxValue === minValue ? 5 : 3,
          }}
          onMouseDown={() => handleMouseDown('max')}
        >
          {Math.round(maxValue)}
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;

/**
  
import React, { useState, useRef, FC } from 'react';

interface MultiRangeSliderProps {
  min: number;
  max: number;
  step?: number;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({ min, max, step = 1 }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const rangeRef = useRef<HTMLDivElement>(null);

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

  const handleMouseMove = (e: MouseEvent, type: 'min' | 'max') => {
    if (!rangeRef.current) return;

    const rect = rangeRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const value = min + Math.round((percent * (max - min)) / step) * step;

    if (type === 'min') {
      setMinValue(Math.min(value, maxValue));
    } else {
      setMaxValue(Math.max(value, minValue));
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMoveMin);
    document.removeEventListener('mousemove', handleMouseMoveMax);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMoveMin = (e: MouseEvent) => handleMouseMove(e, 'min');
  const handleMouseMoveMax = (e: MouseEvent) => handleMouseMove(e, 'max');

  const handleMouseDown = (type: 'min' | 'max') => {
    document.addEventListener('mousemove', type === 'min' ? handleMouseMoveMin : handleMouseMoveMax);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const minPercent = getPercent(minValue);
  const maxPercent = getPercent(maxValue);

  return (
    <div className="relative w-full pt-10">
      <div className="flex justify-between text-white mb-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <div className="relative w-full h-2 bg-gray-300 rounded-lg" ref={rangeRef}>
        <div
          className="absolute h-2 bg-cerise rounded-lg transition-all duration-300 ease-out"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        ></div>
        <div
          className="absolute top-0 w-8 h-8 bg-cerise border-2 border-cerise rounded-full cursor-pointer flex items-center justify-center text-white text-xs transition-all duration-300 ease-out"
          style={{
            left: `${minPercent}%`,
            transform: `translate(${minValue === maxValue ? '-50%, -50%' : '-50%, -50%'})`,
          }}
          onMouseDown={() => handleMouseDown('min')}
        >
          {Math.round(minValue)}
        </div>
        <div
          className="absolute top-0 w-8 h-8 bg-cerise border-2 border-cerise rounded-full cursor-pointer flex items-center justify-center text-white text-xs transition-all duration-300 ease-out"
          style={{
            left: `${maxPercent}%`,
            transform: `translate(${minValue === maxValue ? '50%, -50%' : '-50%, -50%'})`,
            zIndex: maxValue === minValue ? 5 : 3,
          }}
          onMouseDown={() => handleMouseDown('max')}
        >
          {Math.round(maxValue)}
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;

*/