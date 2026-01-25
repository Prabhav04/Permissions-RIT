"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LetterCanvas from '@/components/LetterCanvas';
import FormattingToolbar from '@/components/FormattingToolbar';
import PDFExporter from '@/components/PDFExporter';
import Sidebar from '@/components/Sidebar';
import { Menu } from 'lucide-react';
import { templates } from '@/lib/templates';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { useRef } from 'react';
import { User, Save } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import ProfileModal from '@/components/ProfileModal';

function EditorContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { profile, saveProfile } = useUserProfile();
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Ref to track if internal content update is happening to avoid auto-save triggering improperly on load
  const isInitializing = useRef(true);

  const [content, setContent] = useState<string>(`
    <p><strong>To,</strong></p>
    <p>The Principal,</p>
    <p>Rajiv Gandhi Institute of Technology,</p>
    <p>Kottayam.</p>
    <br/>
    <p><strong>Subject: Request for Permission...</strong></p>
    <br/>
    <p>Respected Sir/Madam,</p>
    <p>I am writing to request permission for...</p>
    <br/>
    <p>Thanking You,</p>
    <p>Yours Faithfully,</p>
    <p>[Your Name]</p>
  `);

  // Auto-Fill Function
  const autoFillProfile = (text: string) => {
    if (!profile) return text;
    return text
      .replace(/\[Your Name\]/g, profile.name)
      .replace(/\[Roll Number\]/g, profile.rollNumber)
      .replace(/\[Department\]/g, profile.department)
      .replace(/\[Representative Name\]/g, profile.name)
      .replace(/\[Class Representative\]/g, `${profile.rollNumber} - ${profile.department}`);
  };

  // Load Draft on Startup
  useEffect(() => {
    const savedDraft = localStorage.getItem('rit-permissions-draft');
    if (savedDraft) {
        setContent(savedDraft);
        setLastSaved(new Date());
    }
    // Set initializing to false after initial check logic
    setTimeout(() => { isInitializing.current = false; }, 500);
  }, []);

  // Auto-Save Effect
  useEffect(() => {
    if (isInitializing.current) return;

    const timer = setTimeout(() => {
        localStorage.setItem('rit-permissions-draft', content);
        setLastSaved(new Date());
    }, 1000); // Debounce save every 1s of inactivity

    return () => clearTimeout(timer);
  }, [content]);

  // Handle Template Selection with Auto-Fill
  useEffect(() => {
    if (templateId) {
      const template = templates.find(t => t.id === templateId);
      if (template) {
        const filledContent = autoFillProfile(template.content);
        setContent(filledContent);
      }
    }
  }, [templateId, profile]); // Re-run if profile changes too

  const handleTemplateSelect = (templateContent: string) => {
    setContent(autoFillProfile(templateContent));
  };

  // Onboarding Hint
  const [showMenuHint, setShowMenuHint] = useState(false);

  useEffect(() => {
    // Check if user has seen hint (or session based)
    const hasSeenHint = sessionStorage.getItem('hasSeenMenuHint');
    if (!hasSeenHint) {
        // Show hint after a small delay
        const showTimer = setTimeout(() => {
            setShowMenuHint(true);
            
            // Auto dismiss after 5 seconds of showing
            const hideTimer = setTimeout(() => {
                setShowMenuHint(false);
                // Optional: mark as seen so it doesn't pop up again this session if auto-closed
                // sessionStorage.setItem('hasSeenMenuHint', 'true'); 
            }, 3500);
            return () => clearTimeout(hideTimer);
        }, 1500);
        return () => clearTimeout(showTimer);
    }
  }, []);

  const dismissHint = () => {
    setShowMenuHint(false);
    sessionStorage.setItem('hasSeenMenuHint', 'true');
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#02183D,_#2B476C)] flex flex-col relative text-gray-900">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onSelectTemplate={handleTemplateSelect} 
      />

      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
        initialProfile={profile}
        onSave={saveProfile}
      />

      {/* Header / Toolbar Area */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 no-print shadow-sm relative">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4 relative">
              <button 
                onClick={() => {
                    setIsSidebarOpen(true);
                    dismissHint();
                }}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-rit-primary transition-colors"
                title="Open Templates"
              >
                <Menu size={24} />
              </button>
              
              {/* Coach Mark / Tooltip */}
              {showMenuHint && (
                <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-12 top-1/2 -transform-y-1/2 bg-rit-primary text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap z-50 animate-bounce cursor-pointer"
                    onClick={dismissHint}
                >
                    <span>👈 Click for Templates!</span>
                </motion.div>
              )}
              <h1 className="text-lg font-bold text-gray-900 hidden sm:block">
                Permissions <span className="text-rit-primary">RIT</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-3 ">
               {lastSaved && (
                   <span className="text-xs text-gray-400 hidden md:block flex items-center gap-1">
                       <Save size={12} />
                       Saved
                   </span>
               )}
               <button
                  onClick={() => setIsProfileOpen(true)}
                  className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-all flex items-center gap-2"
                  title="Student Profile"
               >
                  <User size={18} />
                  <span className="text-sm font-medium hidden md:inline">
                      {profile ? profile.name.split(' ')[0] : 'Profile'}
                  </span>
               </button>
               <PDFExporter />
            </div>
          </div>
        </div>
      </header>

      {/* Floating Toolbar Container */}
      <div className="sticky top-20 z-20 flex justify-center px-4 mb-4 pointer-events-none no-print">
         <div className="pointer-events-auto shadow-sm bg-white rounded-lg">
           <FormattingToolbar />
         </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-4 md:p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-[210mm] mx-auto pb-2 md:pb-20"
        >
           <LetterCanvas content={content} setContent={setContent} />
        </motion.div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <EditorContent />
    </Suspense>
  );
}
