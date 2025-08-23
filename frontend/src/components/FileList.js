import React, { useState } from 'react';
import { File, Printer, Trash2, Eye, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import fileService from '../api/fileService';

const FileList = ({ files, onFileDeleted, loading }) => {
  const [deletingFile, setDeletingFile] = useState(null);
  const [printingFile, setPrintingFile] = useState(null);

  const handleDelete = async (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setDeletingFile(fileId);
      try {
        await fileService.deleteFile(fileId);
        toast.success('File deleted successfully');
        if (onFileDeleted) {
          onFileDeleted();
        }
      } catch (error) {
        toast.error('Failed to delete file');
      } finally {
        setDeletingFile(null);
      }
    }
  };

  const handlePrint = async (fileId) => {
    setPrintingFile(fileId);
    try {
      await fileService.printFile(fileId);
      toast.success('File sent to printer');
    } catch (error) {
      toast.error('Failed to print file');
    } finally {
      setPrintingFile(null);
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      default:
        return '📁';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-12">
        <File className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No files found</h3>
        <p className="text-gray-500 dark:text-gray-400">Upload some files to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <div
          key={file.id}
          className="card hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900/20 transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <span className="text-2xl">{getFileIcon(file.name)}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {file.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ID: {file.id}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Mobile: Dropdown menu */}
              <div className="md:hidden relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
                <div className="dropdown-menu">
                  <button
                    onClick={() => handlePrint(file.id)}
                    disabled={printingFile === file.id}
                    className="dropdown-item"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{printingFile === file.id ? 'Printing...' : 'Print'}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(file.id)}
                    disabled={deletingFile === file.id}
                    className="dropdown-item-danger"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{deletingFile === file.id ? 'Deleting...' : 'Delete'}</span>
                  </button>
                </div>
              </div>

              {/* Desktop: Individual buttons */}
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => handlePrint(file.id)}
                  disabled={printingFile === file.id}
                  className="btn-secondary text-xs flex items-center space-x-1"
                  title="Print file"
                >
                  <Printer className="w-4 h-4" />
                  <span>{printingFile === file.id ? 'Printing...' : 'Print'}</span>
                </button>
                
                <button
                  onClick={() => handleDelete(file.id)}
                  disabled={deletingFile === file.id}
                  className="btn-danger text-xs flex items-center space-x-1"
                  title="Delete file"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{deletingFile === file.id ? 'Deleting...' : 'Delete'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileList;
