// src/components/AttachedContentDisplay.tsx
import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

interface AttachedContentDisplayProps {
  files: (File & { preview: string })[] | undefined;
  isProcessing: boolean | undefined;
}

function AttachedContentDisplay({ files, isProcessing }: AttachedContentDisplayProps) {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" mb={2}>Attached Content</Typography>
      {files?.length === 0 ? (
        <Box
          sx={{
            border: '1px dashed',
            borderColor: 'grey.400',
            p: 2,
            borderRadius: '8px',
            mb: '15px',
            fontSize: '0.875rem',
            color: 'text.secondary',
          }}
        >
          <Typography>No content attached yet. Use the dropdowns above to select content.</Typography>
        </Box>
      ) : (
        files?.map((file, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              backgroundColor: 'info.light',
              borderLeft: '5px solid',
              borderColor: 'primary.main',
              borderRadius: '6px',
              mt: '10px',
            }}
          >
            <Typography variant="body1" fontWeight="bold">📄 {file.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {Math.round(file.size / 1024 / 1024 * 10) / 10}MB
            </Typography>
            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress variant="indeterminate" color="success" sx={{ height: 6, borderRadius: 3 }} />
                <Typography variant="caption" sx={{ mt: 1, color: 'text.primary' }}>
                  AI is processing your content...
                </Typography>
              </Box>
            )}
          </Box>
        ))
      )}
    </Box>
  );
}

export default AttachedContentDisplay;