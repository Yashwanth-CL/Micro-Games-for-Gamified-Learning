// src/components/UploadContent.tsx
"use client"
import { CourseContext } from '@/Context/CourceDetails';
import React, { useContext, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import { Box, Typography, Button, CircularProgress } from '@mui/material'; // Import CircularProgress for loading indicator

// Import the new components
import UploadArea from '@/Components/Functions/UploadArea';
import PolicyControlFrameworkSection from '@/Components/Functions/PolicyControlFrameworkSection';
import AttachedContentDisplay from '@/Components/Functions/AttachedContentDisplay';

function UploadContent() {
  const {
    setResponse,
    files,
    setFiles,
    selectedPolicy,
    setSelectedPolicy,
    selectedControl,
    setSelectedControl,
    selectedFramework,
    setSelectedFramework,
    isProcessing,
    setIsProcessing,
    showPolicyModal,
    setShowPolicyModal,
    showControlModal,
    setShowControlModal,
    showFrameworkModal,
    setShowFrameworkModal,
    newPolicy,
    setNewPolicy,
    newControl,
    setNewControl,
    newFramework,
    setNewFramework,
    policies,
    setPolicies,
    controls,
    setControls,
    frameworks,
    setFrameworks,
    response // Keeping response for console.log, but not directly used in UI now
  } = useContext(CourseContext) ?? {};

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles?.(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, [setFiles, setIsProcessing]);

  const { isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  const handleDiscard = () => {
    setFiles?.([]);
    setSelectedPolicy?.('');
    setSelectedControl?.('');
    setSelectedFramework?.('');
    setIsProcessing?.(false);
  };

  const handleAddPolicy = () => {
    if (newPolicy?.trim()) {
      setPolicies?.([...(policies ?? []), newPolicy]);
      setNewPolicy?.('');
      setShowPolicyModal?.(false);
    }
  };

  const handleAddControl = () => {
    if (newControl?.trim()) {
      setControls?.([...(controls ?? []), newControl]);
      setNewControl?.('');
      setShowControlModal?.(false);
    }
  };

  const handleAddFramework = () => {
    if (newFramework?.trim()) {
      setFrameworks?.([...(frameworks ?? []), newFramework]);
      setNewFramework?.('');
      setShowFrameworkModal?.(false);
    }
  };

  const [isUploading, setIsUploading] = React.useState(false); // New state for API call loading

  async function Process() {
    if (!files || files.length === 0) {
      alert("Please upload a file before processing.");
      return;
    }

    setIsUploading(true); // Start API call loading
    setIsProcessing?.(true); // Keep processing animation on during API call

    const formData = new FormData();
    formData.append("file", files[0]); // Only sending one file
    formData.append("hours_per_week", "2"); // Optional form field - consider making this dynamic

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/analyze-course/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponse?.(res.data);
      console.log("Success:", res.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false); // Stop API call loading
      setIsProcessing?.(false); // Stop processing animation
    }
  }

  useEffect(() => {
    console.log("Current Response:", response);
    // You might want to do something with the response here, e.g., navigate or display generated content
  }, [response]);

  return (
    <Box
      sx={{
        p: { xs: 2, md: '30px' },
        width: '90vw',
        backgroundColor: '#f9fbfc',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          p: { xs: 2, md: '30px' },
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}
      >
        <Typography variant="h5" component="h2" sx={{ m: 0, fontSize: { xs: '1.25rem', md: '1.375rem' }, fontWeight: 600, color: '#333' }}>
          Upload Learning Content
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
          Upload your Files to generate AI-powered learning cards and questions
        </Typography>

        {/* Upload Area Component */}
        <UploadArea onDrop={onDrop} isDragActive={isDragActive} />
        {/* Policy, Control, Framework Section Component */}
        <PolicyControlFrameworkSection
          selectedPolicy={selectedPolicy}
          setSelectedPolicy={setSelectedPolicy}
          policies={policies}
          showPolicyModal={showPolicyModal}
          setShowPolicyModal={setShowPolicyModal}
          newPolicy={newPolicy}
          setNewPolicy={setNewPolicy}
          handleAddPolicy={handleAddPolicy}
          selectedControl={selectedControl}
          setSelectedControl={setSelectedControl}
          controls={controls}
          showControlModal={showControlModal}
          setShowControlModal={setShowControlModal}
          newControl={newControl}
          setNewControl={setNewControl}
          handleAddControl={handleAddControl}
          selectedFramework={selectedFramework}
          setSelectedFramework={setSelectedFramework}
          frameworks={frameworks}
          showFrameworkModal={showFrameworkModal}
          setShowFrameworkModal={setShowFrameworkModal}
          newFramework={newFramework}
          setNewFramework={setNewFramework}
          handleAddFramework={handleAddFramework}
        />

        {/* Attached Content Display Component */}
        <AttachedContentDisplay files={files} isProcessing={isProcessing} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2, mt: '30px' }}>
          <Button
            variant="outlined"
            onClick={handleDiscard}
            sx={{
              width: { xs: '100%', md: 'auto' },
              px: 2,
              py: 1,
              fontSize: '0.875rem',
              borderColor: 'grey.400',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            🗑️ Discard Changes
          </Button>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, width: { xs: '100%', md: 'auto' } }}>
            <Button
              variant="contained"
              onClick={Process}
              disabled={isUploading} // Disable button during upload
              sx={{
                width: { xs: '100%', md: 'auto' },
                px: 2,
                py: 1,
                fontSize: '0.875rem',
              }}
            >
              {isUploading ? <CircularProgress size={24} color="inherit" /> : '🚀 Generate Course'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UploadContent;