'use client'; // Because we're using a hook (useNavigation)

import React from 'react';
import { useNavigation } from '@/context/NavigationContext';
// import MainAppLayout from '@/components/layouts/MainAppLayout'; // No longer needed here

const buildings = [
  { id: 'building-1', name: 'Modern Villa', thumbnail: '/placeholder-thumb.jpg' },
  { id: 'building-2', name: 'Urban Tower', thumbnail: '/placeholder-thumb.jpg' },
  { id: 'building-3', name: 'Eco Friendly Hub', thumbnail: '/placeholder-thumb.jpg' },
];

export default function HomePage() {
  const { navigateToBuilding } = useNavigation();

  return (
    // <MainAppLayout> // Wrapper removed
    <div>
      <h1>Home Page (Project Grid)</h1>
      {/*
        According to PRD 2.1.2:
        - Home page occupies left 50% of screen
        - Navigation menu slides in from right, occupying right 50% of screen
        - URL changes to "/home"

        According to PRD 3.1:
        - Grid of project thumbnails (minimum 4, expandable)
      */}
      <p>This page will display the grid of building thumbnails.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '2rem' }}>
        {buildings.map((building) => (
          <div 
            key={building.id} 
            onClick={() => navigateToBuilding(building.id)}
            style={{
              border: '1px solid #ccc', 
              padding: '1rem', 
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            {/* In a real app, use Next/Image for thumbnails */}
            <img src={building.thumbnail} alt={building.name} style={{ maxWidth: '100px', height: 'auto', marginBottom: '0.5rem' }}/>
            <h4>{building.name}</h4>
          </div>
        ))}
      </div>
    </div>
    // </MainAppLayout> // Wrapper removed
  );
} 