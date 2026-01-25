"use client";

import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaFilePdf, FaSpinner } from 'react-icons/fa';

const PDFExporter = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    const originalElement = document.getElementById('letter-canvas');
    if (!originalElement) {
      alert('Could not find letter content');
      return;
    }

    setIsGenerating(true);

    try {
      // 1. Create a clone to render at 100% scale (A4) purely for capture
      // This alleviates issues with mobile scaling, transforms, or screen-specific layout quirks
      const clone = originalElement.cloneNode(true) as HTMLElement;
      
      // 2. Setup a temporary container off-screen
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '-10000px';
      container.style.left = '-10000px';
      container.style.zIndex = '-1000';
      // Force A4 width/layout context
      container.style.width = '210mm'; 
      container.style.minHeight = '297mm';
      
      // Append clone to container
      container.appendChild(clone);
      document.body.appendChild(container);

      // 3. Capture the clone
      // scale: 2 provides 2x resolution (good for retina/print), significantly better than default
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        // Fix for some font rendering issues
        onclone: (clonedDoc) => {
            // The cloned element is the root of the clone, which IS 'letter-canvas'
            // We just need to make sure we are styling the root container we appended
            if (clone) {
                clone.style.margin = '0 auto';
                clone.style.boxShadow = 'none';
                clone.style.transform = 'none'; 
            }
        }
      });

      // 4. Generate PDF
      // Use JPEG instead of PNG to drastically reduce file size (10MB -> ~500KB)
      const quality = 0.75; // 0.75 offers good compromise between text sharpness and size
      const imgData = canvas.toDataURL('image/jpeg', quality);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate height ratio to prevent stretching if content is shorter than A4
      const imgProps = pdf.getImageProperties(imgData);
      const ratio = imgProps.width / imgProps.height;
      const calculatedHeight = pdfWidth / ratio;

      // Only stretch if it's very close to A4, otherwise keep aspect ratio
      // But for this use-case (A4 letter), usually fitting to width is best.
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, calculatedHeight);
      pdf.save('permission-letter.pdf');

      // 5. Cleanup
      document.body.removeChild(container);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="flex items-center gap-2 bg-gradient-to-r from-rit-primary to-rit-dark hover:from-rit-dark hover:to-black text-white px-4 py-2 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium text-sm shadow-md hover:shadow-lg"
    >
      {isGenerating ? <FaSpinner className="animate-spin" /> : <FaFilePdf />}
      <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
    </button>
  );
};

export default PDFExporter;
