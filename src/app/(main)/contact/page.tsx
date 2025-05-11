import React from 'react';
// import MainAppLayout from '@/components/layouts/MainAppLayout'; // No longer needed here

export default function ContactPage() {
  return (
    // <MainAppLayout> // Wrapper removed
    <div>
      <h1>Contact Page</h1>
      {/*
        According to PRD 2.1.5 (Navigation Menu Selection):
        - Similar layout to About page.

        According to PRD 3.5 (Contact Page Content):
        - Contact form, office location, contact info, hours, social media.
      */}
      <p>Contact form and information will be displayed here.</p>
    </div>
    // </MainAppLayout> // Wrapper removed
  );
} 