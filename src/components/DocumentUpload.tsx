import React, { useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

export function DocumentUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [apiResponse, setApiResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setLoading(true);
      const fileType = file.name.split('.').pop() || '';
      
      // Convert FileReader to Promise
      const getFileContent = () => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result?.toString() || '');
          reader.onerror = (e) => reject(e);
          
          if (fileType === 'txt') {
            reader.readAsText(file);
          } else {
            reader.readAsBinaryString(file);
          }
        });
      };
  
      // Wait for file content
      const fileContent = await getFileContent();
      const base64Content = btoa(fileContent as string);
  
      // Make API call
      const response = await fetch('https://bizi-rgdl.onrender.com/document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileType,
          fileContent: base64Content,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error processing document:', error);
    } finally {
      setLoading(false);
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
                Support for PDF,  and TXT (Max 15MB)
              </p>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploadedFile(file);
                    handleFileUpload(file);
                  }
                }}
                id="file-upload"
              />
              <button
                className="btn-primary"
                onClick={() =>
                  document.getElementById('file-upload')?.click()
                }
              >
                Select File
              </button>
            </div>
          </div>

          {uploadedFile && (
            <div className="card mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-accent" />
                  {uploadedFile && <span className="font-medium">{uploadedFile.name}</span>}
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
          {loading && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900/70 z-50">
              <p>Loading...</p>
            </div>
          )}
          {apiResponse && !loading && (
            <div className="grid  gap-6">
              <div className="card md:col-span-2">
                <h3 className="text-xl font-semibold mb-2">
                  Detailed Summary
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p>{apiResponse.summary}</p>
                </div>
              </div>
              <div className="card md:col-span-2">
                <h3 className="text-xl font-semibold mb-2">
                  Key Points
                </h3>
                <ul>
                  {apiResponse.keyPoints.map((point: string, index: number) => (
                    <li key={index}>• {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}