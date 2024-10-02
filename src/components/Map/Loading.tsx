import React from 'react';

export default function Loading() {
  return (
    <div className="h-full w-full md:m-2 box-border backdrop-blur-sm md:border-4 md:border-pink-600 md:rounded-2xl flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-600"></div>
    </div>
  );
}