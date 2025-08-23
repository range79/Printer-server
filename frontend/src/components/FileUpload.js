import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import fileService from '../api/fileService';

const FileUpload = ({ onFileUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true);
    
    try {
      for (const file of acceptedFiles) {
        await fileService.uploadFile(file);
        setUploadedFiles(prev => [...prev, file.name]);
        toast.success(`${file.name} uploaded successfully!`);
      }
      
      if (onFileUploaded) {
        onFileUploaded();
      }
    } catch (error) {
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const clearUploadedFiles = () => {
    setUploadedFiles([]);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-900'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-3 rounded-full ${
            isDragActive ? 'bg-primary-100 dark:bg-primary-900/40' : 'bg-gray-100 dark:bg-gray-800'
          }`}>
            <Upload className={`w-8 h-8 ${
              isDragActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
            }`} />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {isDragActive ? 'Drop files here' : 'Upload files'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Drag & drop files here, or click to select files
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Supports PDF, DOC, and DOCX files only
            </p>
          </div>
        </div>
      </div>

      {uploading && (
        <div className="flex items-center justify-center space-x-2 text-primary-600 dark:text-primary-400">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 dark:border-primary-400"></div>
          <span>Uploading...</span>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recently Uploaded</h3>
            <button
              onClick={clearUploadedFiles}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-2">
            {uploadedFiles.map((fileName, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <File className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{fileName}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
