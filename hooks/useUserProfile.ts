"use client";

import { useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  rollNumber: string;
  department: string;
  email: string;
}

const STORAGE_KEY = 'rit-permissions-profile';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse user profile", e);
      }
    }
  }, []);

  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
  };

  return { profile, saveProfile };
};
