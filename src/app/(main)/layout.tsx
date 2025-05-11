'use client';

import React from 'react';
import MainAppLayout from '@/components/layouts/MainAppLayout';

export default function MainPagesLayout({ children }: { children: React.ReactNode }) {
  // This layout wraps all pages within the (main) route group.
  // MainAppLayout will handle the 50/50 split, navigation menu, and page content animations.
  return <MainAppLayout>{children}</MainAppLayout>;
} 