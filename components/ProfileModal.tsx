"use client";

import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/hooks/useUserProfile';
import { X, User, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfile: UserProfile | null;
  onSave: (profile: UserProfile) => void;
}

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Civil Engineering",
  "Electrical & Electronics Engineering",
  "Electronics & Communication Engineering",
  "Mechanical Engineering",
  "Architecture",
  "MCA"
];

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, initialProfile, onSave }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    rollNumber: '',
    department: DEPARTMENTS[0],
    email: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProfile) {
      setFormData(initialProfile);
    }
  }, [initialProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.endsWith('@rit.ac.in')) {
      setError('Email must match @rit.ac.in domain');
      return;
    }
    setError(null);
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="text-rit-primary" size={24} />
                  Student Profile
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2 border border-red-100">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rit-primary/20 focus:border-rit-primary outline-none transition-all"
                    placeholder="e.g. Adwaith Jayasankar"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                        <input
                            type="text"
                            required
                            value={formData.rollNumber}
                            onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rit-primary/20 focus:border-rit-primary outline-none transition-all"
                            placeholder="e.g. 23B1234"
                        />
                    </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rit-primary/20 focus:border-rit-primary outline-none transition-all bg-white"
                  >
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">RIT Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rit-primary/20 focus:border-rit-primary outline-none transition-all"
                    placeholder="official-mail@rit.ac.in"
                  />
                  <p className="text-xs text-gray-500 mt-1">Must end with @rit.ac.in</p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-rit-primary to-rit-dark hover:from-rit-dark hover:to-black text-white rounded-lg font-medium active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Check size={18} />
                    Save Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
