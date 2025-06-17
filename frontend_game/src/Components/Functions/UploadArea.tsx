// src/components/UploadArea.tsx
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button } from '@mui/material';

interface UploadAreaProps {
  onDrop: (acceptedFiles: File[]) => void;
  isDragActive: boolean;
}

function UploadArea({ onDrop, isDragActive }: UploadAreaProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.400',
        borderRadius: '12px',
        p: { xs: 4, md: '40px 20px' },
        textAlign: 'center',
        backgroundColor: isDragActive ? 'primary.light' : 'grey.50',
        mb: '30px',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease-in-out, background-color 0.3s ease-in-out',
        '&:hover': {
          borderColor: 'primary.main',
        },
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: '10px' }}>📄</Typography>
      <Typography variant="body1">Drag and drop your files here</Typography>
      <Typography variant="body2" sx={{ mt: '5px' }}>or</Typography>
      <Button
        variant="contained"
        sx={{ mt: '10px', px: 2, py: 1, fontSize: '0.875rem' }}
      >
        📁 Browse Files
      </Button>
    </Box>
  );
}

export default UploadArea;