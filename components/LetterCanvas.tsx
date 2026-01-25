"use client";

import React, { useRef, useEffect } from 'react';
import { clsx } from 'clsx';

interface LetterCanvasProps {
  content: string;
  setContent: (content: string) => void;
  readOnly?: boolean;
}

const LetterCanvas: React.FC<LetterCanvasProps> = ({ content, setContent, readOnly = false }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync content updates from parent (e.g. template change) without breaking cursor on local edits
  useEffect(() => {
    if (contentRef.current) {
        // Only update DOM if the new content prop is effectively different from current DOM.
        // This prevents cursor jumping when the update is just a reflection of the user's typing.
        if (contentRef.current.innerHTML !== content) {
            contentRef.current.innerHTML = content;
        }
    }
  }, [content]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
  };
  

  /* logic to handle height adjustment for mobile scaling */
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 640) setScale(0.45);
      else if (width < 768) setScale(0.65);
      else if (width < 1024) setScale(0.80);
      else setScale(1);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="w-full h-[70vh] flex justify-center">
      {/* Mobile Scale Wrapper */}
      <div 
        className="transform origin-top transition-transform duration-200 ease-out"
        style={{ 
          transform: `scale(${scale})`,
          marginBottom: scale < 1 ? `${-300 * (1 - scale)}px` : '0px'
        }}
      >
        <div 
            ref={containerRef}
            className={clsx(
            "bg-white mx-auto print:shadow-none print:mx-0",
            "w-[210mm] min-h-[297mm]", // A4 Dimensions
            "p-[25mm]", // Standard margins (approx 1 inch)
            "text-black text-[12pt] font-serif leading-relaxed",
            "shadow-lg border border-gray-200", 
            "focus-within:ring-0",
            "flex flex-col"
            )}
            id="letter-canvas"
        >
            {/* Dedicated Date Section */}
            <div className="mb-4 flex justify-end">
            <div 
                contentEditable
                suppressContentEditableWarning
                className="outline-none border-none min-w-[100px] text-right"
            >
                Date: {new Date().toLocaleDateString('en-GB')}
            </div>
            </div>

            {/* Main Content Body */}
            <div
            ref={contentRef}
            contentEditable={!readOnly}
            onInput={handleInput}
            className="letter-content w-full flex-1 outline-none"
            data-placeholder="Start typing your permission letter here..."
            suppressContentEditableWarning={true}
            />
        </div>
      </div>
    </div>
  );
};

export default LetterCanvas;
