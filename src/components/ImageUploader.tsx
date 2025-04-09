'use client';

import React, { useState, useCallback, ChangeEvent, DragEvent } from 'react';

interface ImageUploaderProps {
  onImagesUpload: (files: File[]) => void;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesUpload, maxImages = 4 }) => {
  const [dragIsOver, setDragIsOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileProcessing = (files: FileList | null) => {
    setError(null);
    if (!files) return;

    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      setError("No image files selected. Please upload PNG, JPG, GIF, etc.");
      return;
    }

    if (imageFiles.length > maxImages) {
      setError(`You can only upload up to ${maxImages} images.`);
      onImagesUpload(imageFiles.slice(0, maxImages)); // Upload only the allowed number
    } else {
       onImagesUpload(imageFiles);
    }
  };

  const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragIsOver(false);
    handleFileProcessing(event.dataTransfer.files);
  }, [maxImages, onImagesUpload]); // Added dependencies

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragIsOver(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragIsOver(false);
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileProcessing(event.target.files);
     // Reset file input to allow uploading the same file again
    event.target.value = '';
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto my-8">
       <h2 style={{ color: 'var(--dreamy-purple)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Upload Your Insta Pics! ✨
      </h2>
      <label
        htmlFor="dropzone-file"
        onDrop={(e)=>handleDrop}
        onDragOver={(e)=>handleDragOver}
        onDragLeave={(e)=>handleDragLeave}
        style={{
          border: `3px dashed ${dragIsOver ? 'var(--dreamy-purple)' : 'var(--dreamy-lavender)'}`,
          backgroundColor: dragIsOver ? 'var(--dreamy-pink)' : 'var(--dreamy-light-pink)',
          transition: 'all 0.3s ease-in-out',
          borderRadius: '1.5rem', // Cuter rounded corners
          boxShadow: '0 4px 15px rgba(167, 123, 202, 0.3)', // Soft shadow
        }}
        className="flex flex-col items-center justify-center w-full h-64 cursor-pointer hover:bg-opacity-80"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          <svg // Cute Cloud Icon (example)
            className="w-10 h-10 mb-4"
            style={{ color: 'var(--dreamy-violet)'}}
            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--dreamy-purple)'}}>
            <span >Click to upload</span> or drag and drop
          </p>
          <p className="text-xs" style={{ color: 'var(--dreamy-violet)'}}>
            SVG, PNG, JPG or GIF (MAX. {maxImages} images)
          </p>
        </div>
        <input
           id="dropzone-file"
           type="file"
           className="hidden"
           accept="image/*"
           multiple
           onChange={handleFileChange}
         />
      </label>
      {error && (
        <p className="mt-4 text-sm" style={{ color: '#dc2626' /* Red for error */, fontWeight: 'bold'}}>
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
