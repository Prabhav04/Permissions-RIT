"use client";

import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaFilePdf, FaSpinner } from 'react-icons/fa';

const PDFExporter = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    const element = document.getElementById('letter-canvas');
    if (!element) {
      alert('Could not find letter content');
      return;
    }

    setIsGenerating(true);

    try {
      // Use higher scale for better quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      
      // A4 dimensions in mm
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('permission-letter.pdf');
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
