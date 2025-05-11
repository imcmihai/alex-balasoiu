'use client'; // Needs to be a client component to use hooks

import React from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { useParams } from 'next/navigation'; // Import useParams
// import MainAppLayout from '@/components/layouts/MainAppLayout'; // No longer needed here

// We no longer need BuildingDetailPageProps if we use the hook
// interface BuildingDetailPageProps {
//   params: { id: string }; 
// }

const arrowWidgetStyles: React.CSSProperties = {
  position: 'fixed', // Fixed to the viewport, but constrained by its parent's (panel) overflow if any
  // To position relative to the panel, the panel (.buildingDetailPanel) would need position: relative
  // and this arrow would be position: absolute.
  // For now, let's try fixed and adjust if it bleeds out of the panel too much.
  // Or, more robustly, style it within the panel's own scrollable content.
  right: 'calc(50% + 20px)', // 50% to get to the edge of the main screen, then offset. This needs refinement.
  // A better way: position it relative to its *panel*. Let's assume panel context for now.
  // This will be styled via CSS module for better scoping and parent relativity.
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  padding: '10px 15px',
  borderRadius: '50% 0 0 50%', // Rounded on the left
  cursor: 'pointer',
  zIndex: 10, // Ensure it's above page content within the panel
  fontSize: '24px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function BuildingDetailPage() { // Removed props
  const params = useParams(); // Use the hook
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;

  const { closeBuildingDetail, activeBuildingId } = useNavigation();

  // This page component is rendered when activeBuildingId matches params.id
  // and currentView is 'buildingDetail'

  if (!activeBuildingId || activeBuildingId !== id) {
    // This state should ideally not happen if routing and context are in sync,
    // but as a safeguard, don't render if not the active detail view.
    return null; 
  }

  return (
    // <MainAppLayout> // Wrapper removed
    <div style={{ padding: '2rem', position: 'relative', height: '100%' }}> {/* Added position relative for potential absolute children like the arrow */}
      <h1>Building Detail Page: {id}</h1>
      {/*
        According to PRD 2.1.3:
        - Building detail page slides in from left
        - Building detail covers ~90% of home page area (within left 50% of screen)
        - ~10% of home page remains visible on far left
        - URL changes to "/building/[building-id]"

        According to PRD 3.2:
        - Hero image, project title, details, description etc.
      */}
      <p>Details for building ID: {id} will be shown here.</p>
      <p>Lots of content to make this scrollable...</p>
      {[...Array(30)].map((_, i) => <p key={i}>More content line {i + 1}</p>)}

      {/* Back Arrow Widget */}
      {/* For robust positioning, this should ideally be styled with its parent .buildingDetailPanel in mind. */}
      {/* Let's refine its position using CSS modules if this fixed approach is problematic. */}
      <button 
        onClick={closeBuildingDetail} 
        title="Go back to Home"
        style={{
          position: 'absolute', // Positioned relative to the div above
          right: '10px', // Adjust as needed, from the right edge of the panel
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          border: 'none',
          padding: '15px 10px',
          borderRadius: '8px 0 0 8px', 
          cursor: 'pointer',
          zIndex: 100, // Ensure it's above other content within this page
          fontSize: '20px',
          lineHeight: 0.8,
        }}
      >
        &larr; {/* Left arrow HTML entity */}
      </button>
    </div>
    // </MainAppLayout> // Wrapper removed
  );
} 