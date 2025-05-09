import React from 'react';

interface FormProps {
  summary: string;
}

export const Summary = ({ summary}: FormProps) => {

  return (
    <div className="w-[600px] h-[450px] p-6 -ml-0 mt-8 rounded-lg shadow-lg bg-white mt-20" >
      <div className="py-1">
      </div>
      <div className="bg-transparent rounded-lg h-[400px] overflow-y-auto">
        <p className="text-gray-700 text-md">{summary}</p>
      </div>
    </div>


  );
};
