'use client'; // Required because we are using hooks (useState)

import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader'; // Adjust path if needed
import InstagramCardPreview from '../components/InstagramCardPreview'; // Adjust path if needed

export default function Home() {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleImagesUpload = (files: File[]) => {
    setUploadedImages(files);
  };

  return (
    // Using flex column layout for simplicity, adjust styling as needed
    <div className="flex flex-col items-center min-h-screen p-8" style={{ backgroundColor: 'var(--dreamy-light-pink)'}}>
        {/* You can add a cute header/title here */}
         <h1 className="text-3xl font-bold my-6" style={{ color: 'var(--dreamy-purple)', textShadow: '2px 2px 4px var(--dreamy-violet)'}}>
           Insta Card Maker 🌸
        </h1>

        <main className="flex flex-col items-center w-full">
            {/* Image Uploader Component */}
            <ImageUploader onImagesUpload={handleImagesUpload} maxImages={4} />

            {/* Instagram Card Preview Component */}
            {/* This will only render when images are uploaded */}
            <InstagramCardPreview imageFiles={uploadedImages} />
        </main>

       {/* Optional: Add a footer */}
       <footer className="mt-auto py-4 text-center" style={{ color: 'var(--dreamy-violet)'}}>
            Made with ✨ by AI
       </footer>
    </div>
  );
}
