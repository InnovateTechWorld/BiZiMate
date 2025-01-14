import React, { useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

export function DocumentUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <section className="py-20" id="upload">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Document Analysis</h2>
          
          <div 
            className={`card border-2 border-dashed ${
              isDragging ? 'border-accent' : 'border-gray-700'
            } transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <Upload className="w-12 h-12 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Drop your document here
              </h3>
              <p className="text-gray-400 mb-4">
                Support for PDF, DOCX, and TXT (Max 10MB)
              </p>
              <button className="btn-primary">
                Select File
              </button>
            </div>
          </div>

          {uploadedFile && (
            <div className="card mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-accent" />
                  <span className="font-medium">{uploadedFile.name}</span>
                </div>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => setUploadedFile(null)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}