"use client";

import { useState, useEffect } from 'react';
import { db } from '@/firebase.config';
import { doc, onSnapshot, setDoc, increment, getDoc } from 'firebase/firestore';

const STATS_DOC = doc(db, 'site-stats', 'visitor-count');
const SESSION_KEY = 'rit-visitor-counted';

export const useVisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Increment count only once per browser session
    const alreadyCounted = sessionStorage.getItem(SESSION_KEY);

    const recordVisit = async () => {
      if (!alreadyCounted) {
        try {
          // setDoc with merge:true creates document if it doesn't exist
          await setDoc(STATS_DOC, { count: increment(1) }, { merge: true });
          sessionStorage.setItem(SESSION_KEY, 'true');
        } catch (error) {
          console.error('Failed to record visit:', error);
        }
      }
    };

    recordVisit();

    // Subscribe to live count
    const unsubscribe = onSnapshot(STATS_DOC, (snap) => {
      if (snap.exists()) {
        setCount(snap.data().count ?? 0);
      } else {
        setCount(0);
      }
    }, (error) => {
      console.error('Failed to subscribe to visitor count:', error);
    });

    return () => unsubscribe();
  }, []);

  return { count };
};
