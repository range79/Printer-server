import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import Pagination from './components/Pagination';
import fileService from './api/fileService';

function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('files');
  const [isConnected, setIsConnected] = useState(false);

  // Check backend connection
  const checkConnection = async () => {
    try {
      const connected = await fileService.checkConnection();
      setIsConnected(connected);
    } catch (error) {
      setIsConnected(false);
    }
  };

  // Check connection on mount and periodically
  useEffect(() => {
    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchFiles = async (page = 0) => {
    if (!isConnected) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fileService.getAllFiles(page);
      setFiles(response.content || []);
      setTotalPages(response.totalPages || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch files:', error);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [isConnected]);

  const handleFileUploaded = () => {
    fetchFiles(currentPage);
  };

  const handleFileDeleted = () => {
    fetchFiles(currentPage);
  };

  const handlePageChange = (page) => {
    fetchFiles(page);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderContent = () => {
    // Show connection error if backend is not connected
    if (!isConnected) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Backend Connection Failed</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Unable to connect to the printer server backend. Please check if the backend is running.
          </p>
          <button
            onClick={checkConnection}
            className="btn-primary"
          >
            Retry Connection
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'upload':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Upload Files</h2>
              <p className="text-gray-600 dark:text-gray-400">Upload documents and images to your printer server</p>
            </div>
            <FileUpload onFileUploaded={handleFileUploaded} />
          </div>
        );
      
      case 'files':
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Files</h2>
                <p className="text-gray-600 dark:text-gray-400">Manage and print your uploaded files</p>
              </div>
              <button
                onClick={() => setActiveTab('upload')}
                className="btn-primary"
              >
                Upload New File
              </button>
            </div>
            
            <FileList 
              files={files} 
              onFileDeleted={handleFileDeleted}
              loading={loading}
            />
            
            {!loading && files.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} isConnected={isConnected} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile tab navigation */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('files')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'files'
                    ? 'bg-white dark:bg-gray-900 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Files
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'upload'
                    ? 'bg-white dark:bg-gray-900 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Upload
              </button>
            </div>
          </div>

          {/* Desktop tab navigation */}
          <div className="hidden lg:block mb-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('files')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'files'
                    ? 'border-primary-500 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                Files
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'upload'
                    ? 'border-primary-500 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                Upload
              </button>
            </nav>
          </div>

          {/* Main content */}
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
