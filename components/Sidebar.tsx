"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, ChevronRight } from 'lucide-react';
import { templates } from '@/lib/templates';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (content: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onSelectTemplate }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-2xl border-r border-gray-100 flex flex-col"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white text-gray-900">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <FileText className="text-rit-primary" size={20} />
                Templates
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    onSelectTemplate(template.content);
                    onClose();
                  }}
                  className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-rit-primary hover:bg-rit-light/50 transition-all group shadow-sm bg-white"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-900 group-hover:text-rit-primary transition-colors">
                      {template.name}
                    </span>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-rit-primary transition-colors mt-1" />
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {template.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-center text-gray-500">
              Permissions RIT © {new Date().getFullYear()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
