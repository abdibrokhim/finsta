'use client';

import React, { useEffect, useState } from 'react';

interface InstagramCardPreviewProps {
  imageFiles: File[];
}

interface ImagePreview {
  id: string;
  src: string;
  alt: string;
}

const InstagramCardPreview: React.FC<InstagramCardPreviewProps> = ({ imageFiles }) => {
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  useEffect(() => {
    const newPreviews: ImagePreview[] = [];
    let counter = 0;
    imageFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
            newPreviews.push({
              id: `${file.name}-${Date.now()}-${counter++}`, // Basic unique ID
              src: reader.result as string,
              alt: file.name
            });
            // Update state only when all files are processed for this batch
            if (newPreviews.length === imageFiles.length) {
                 setImagePreviews(newPreviews);
            }
        };
        reader.readAsDataURL(file);
    });

    // Cleanup function to revoke object URLs if they were used (though FileReader is used here)
     return () => {
       // If using URL.createObjectURL, revoke here:
       // imagePreviews.forEach(p => URL.revokeObjectURL(p.src));
     };
  }, [imageFiles]); // Rerun when imageFiles change

  // Determine grid layout based on number of images
  const getGridCols = (count: number) => {
    if (count <= 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count === 3) return 'grid-cols-3'; // Or maybe a 2+1 layout? Let's stick to simple grid for now.
    return 'grid-cols-2'; // For 4 images, a 2x2 grid
  };

 const getGridRows = (count: number) => {
    if (count <= 2) return 'grid-rows-1';
    return 'grid-rows-2'; // For 3 or 4 images
  };


  if (imagePreviews.length === 0) {
    return null; // Don't render anything if no images are uploaded yet
  }

  return (
    <div className="w-full max-w-xl mx-auto my-8 p-6"
         style={{
            backgroundColor: 'var(--dreamy-pink)', // Base card color
            borderRadius: '2rem', // Extra cute corners
            boxShadow: '0 6px 20px rgba(167, 123, 202, 0.4)', // Enhanced shadow
            border: '2px solid var(--dreamy-violet)'
         }}
    >
      <h3 style={{ color: 'var(--dreamy-purple)', marginBottom: '1.5rem', fontSize: '1.3rem', fontWeight: 'bold', textAlign: 'center' }}>
        Your Insta Storyboard! 💖
      </h3>
      <div className={`grid ${getGridCols(imagePreviews.length)} ${getGridRows(imagePreviews.length)} gap-4 aspect-[4/5]`} // Instagram portrait-ish aspect ratio
           style={{ backgroundColor: 'var(--dreamy-light-pink)', padding: '1rem', borderRadius: '1rem' }} // Inner container styling
      >
        {imagePreviews.map((image, index) => (
          <div key={image.id} className="relative overflow-hidden" style={{ borderRadius: '0.75rem', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
            <img
              src={image.src}
              alt={image.alt}
              className="absolute top-0 left-0 w-full h-full object-cover" // Fill the container
            />
             {/* Optional: Add cute overlay elements later? e.g., little hearts, sparkles */}
             {/* <div className="absolute top-1 right-1 text-xs" style={{ color: 'var(--dreamy-purple)', backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '2px 4px', borderRadius: '4px' }}>
                {index + 1}
             </div> */}
          </div>
        ))}
         {/* Fill empty grid cells if needed for layout consistency (e.g., 3 images in a 2x2 grid) */}
        {imagePreviews.length === 3 && (
             <div className="bg-transparent" style={{ borderRadius: '0.75rem' }}></div> // Placeholder
        )}
      </div>
       {/* Maybe add download/share buttons later? */}
       {/* <button style={{...}}>Download Storyboard</button> */}
    </div>
  );
};

export default InstagramCardPreview;
