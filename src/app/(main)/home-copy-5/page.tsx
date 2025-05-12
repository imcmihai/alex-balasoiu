'use client'; // Because we're using a hook (useNavigation)

import React from 'react';
import { useNavigation } from '@/context/NavigationContext';
import styles from './page.module.css'; // This will need to be created or aliased if specific
import Image from 'next/image';
import img1 from "../../../../public/phpic.jpg";
import img2 from "../../../../public/phpic.jpg";
import img3 from "../../../../public/phpic.jpg";

const buildings = [
  { id: 'building-1', name: 'Modern Villa', thumbnail: img1 },
  { id: 'building-2', name: 'Urban Tower', thumbnail: img2 },
  { id: 'building-3', name: 'Eco Friendly Hub', thumbnail: img3 },
];

export default function HomeCopy5Page() { // Changed function name
  const { navigateToBuilding } = useNavigation();

  return (
    <div>
      <h1>Home Page Copy 5 (Project Grid)</h1> {/* Changed title */}
      <p>This page will display the grid of building thumbnails.</p>
      
      <div className={styles.gridContainer}>
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
            <Image src={building.thumbnail} alt={building.name}  className={styles.buildingThumbnail}/>
            <h4>{building.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
} 