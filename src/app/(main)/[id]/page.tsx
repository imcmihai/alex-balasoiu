import React from 'react';
import MainAppLayout from '@/components/layouts/MainAppLayout';

interface BuildingDetailPageProps {
  params: { id: string }; // Next.js passes dynamic route params here
}

export default function BuildingDetailPage({ params }: BuildingDetailPageProps) {
  return (
    <MainAppLayout>
      <div>
        <h1>Building Detail Page: {params.id}</h1>
        {/*
          According to PRD 2.1.3:
          - Building detail page slides in from left
          - Building detail covers ~90% of home page area (within left 50% of screen)
          - ~10% of home page remains visible on far left
          - URL changes to "/building/[building-id]"

          According to PRD 3.2:
          - Hero image, project title, details, description etc.
        */}
        <p>Details for building ID: {params.id} will be shown here.</p>
      </div>
    </MainAppLayout>
  );
} 