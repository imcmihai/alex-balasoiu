import React from 'react';
// import MainAppLayout from '@/components/layouts/MainAppLayout'; // No longer needed here

export default function AboutPage() {
  return (
    // <MainAppLayout> // Wrapper removed
    <div>
      <h1>About Page</h1>
      {/*
        According to PRD 2.1.5 (Navigation Menu Selection):
        - Selected content renders in left 50% of screen
        - Navigation menu remains visible (right 50% of screen)
        - URL changes to "/[page-name]"

        According to PRD 3.3 (About Page Content):
        - Company history, mission, team, approach, awards.
      */}
      <p>Information about the company will be displayed here.</p>
    </div>
    // </MainAppLayout> // Wrapper removed
  );
} 