"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, ChevronRight, Clock, Trash2, File } from 'lucide-react';
import { templates } from '@/lib/templates';
import { RecentWork } from '@/app/page';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (content: string) => void;
  recentWorks?: RecentWork[];
  onSelectRecentWork?: (work: RecentWork) => void;
  onDeleteRecentWork?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate,
  recentWorks = [],
  onSelectRecentWork,
  onDeleteRecentWork
}) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'recent'>('recent');

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
                Menu
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex p-2 gap-2 border-b border-gray-100 bg-gray-50/50">
                <button
                    onClick={() => setActiveTab('recent')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'recent' 
                        ? 'bg-white text-rit-primary shadow-sm ring-1 ring-gray-100' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <Clock size={16} />
                    Recent
                </button>
                <button
                    onClick={() => setActiveTab('templates')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'templates' 
                        ? 'bg-white text-rit-primary shadow-sm ring-1 ring-gray-100' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <File size={16} />
                    Templates
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/30">
              {activeTab === 'templates' ? (
                  /* Templates List */
                  templates.map((template) => (
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
                  ))
              ) : (
                  /* Recent Works List */
                  <div className="space-y-3">
                    {recentWorks.length === 0 ? (
                        <div className="text-center py-10 px-4">
                            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                                <Clock size={24} />
                            </div>
                            <h3 className="text-gray-900 font-medium mb-1">No recent works</h3>
                            <p className="text-xs text-gray-500">
                                Save your letters to access them later from here.
                            </p>
                        </div>
                    ) : (
                        recentWorks.map((work) => (
                            <div
                              key={work.id}
                              className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-rit-primary bg-white shadow-sm group relative"
                            >
                                <button
                                    onClick={() => {
                                        if (onSelectRecentWork) onSelectRecentWork(work);
                                    }}
                                    className="w-full text-left"
                                >
                                    <h4 className="font-semibold text-gray-900 group-hover:text-rit-primary transition-colors pr-8">
                                        {work.name}
                                    </h4>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(work.lastModified).toLocaleString()}
                                    </p>
                                </button>
                                
                                {onDeleteRecentWork && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteRecentWork(work.id);
                                        }}
                                        className="absolute top-3 right-3 p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                  </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-white text-xs text-center text-gray-500">
              Permissions RIT © {new Date().getFullYear()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
