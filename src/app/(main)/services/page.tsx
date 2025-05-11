import React from 'react';
// import MainAppLayout from '@/components/layouts/MainAppLayout'; // No longer needed here

export default function ServicesPage() {
  return (
    // <MainAppLayout> // Wrapper removed
    <div>
      <h1>Services Page</h1>
      {/*
        According to PRD 2.1.5 (Navigation Menu Selection):
        - Similar layout to About page.

        According to PRD 3.4 (Services Page Content):
        - Overview of services, categories, process, collaboration.
      */}
      <p>Details about services offered will be displayed here.</p>
    </div>
    // </MainAppLayout> // Wrapper removed
  );
} 