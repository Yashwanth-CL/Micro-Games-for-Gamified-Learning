// src/components/PolicyControlFrameworkSection.tsx
import React from 'react';
import { Box, Typography, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel } from '@mui/material';

interface PolicyControlFrameworkSectionProps {
  selectedPolicy: string | undefined;
  setSelectedPolicy: ((value: string) => void) | undefined;
  policies: string[] | undefined;
  showPolicyModal: boolean | undefined;
  setShowPolicyModal: ((value: boolean) => void) | undefined;
  newPolicy: string | undefined;
  setNewPolicy: ((value: string) => void) | undefined;
  handleAddPolicy: () => void;

  selectedControl: string | undefined;
  setSelectedControl: ((value: string) => void) | undefined;
  controls: string[] | undefined;
  showControlModal: boolean | undefined;
  setShowControlModal: ((value: boolean) => void) | undefined;
  newControl: string | undefined;
  setNewControl: ((value: string) => void) | undefined;
  handleAddControl: () => void;

  selectedFramework: string | undefined;
  setSelectedFramework: ((value: string) => void) | undefined;
  frameworks: string[] | undefined;
  showFrameworkModal: boolean | undefined;
  setShowFrameworkModal: ((value: boolean) => void) | undefined;
  newFramework: string | undefined;
  setNewFramework: ((value: string) => void) | undefined;
  handleAddFramework: () => void;
}

function PolicyControlFrameworkSection({
  selectedPolicy, setSelectedPolicy, policies, showPolicyModal, setShowPolicyModal, newPolicy, setNewPolicy, handleAddPolicy,
  selectedControl, setSelectedControl, controls, showControlModal, setShowControlModal, newControl, setNewControl, handleAddControl,
  selectedFramework, setSelectedFramework, frameworks, showFrameworkModal, setShowFrameworkModal, newFramework, setNewFramework, handleAddFramework,
}: PolicyControlFrameworkSectionProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: '30px' }}>
      {/* Policies */}
      <Box sx={{ flex: 1, backgroundColor: 'grey.50', border: '1px solid', borderColor: 'grey.300', borderRadius: '8px', p: 3, position: 'relative' }}>
        <Typography variant="h6" sx={{ mb: '10px', fontSize: '1rem' }}>📘 Policies</Typography>
        <FormControl fullWidth size="small">
          <InputLabel id="select-policy-label">Select Policy</InputLabel>
          <Select
            labelId="select-policy-label"
            value={selectedPolicy || ''}
            onChange={(e) => setSelectedPolicy?.(e.target.value)}
            label="Select Policy"
          >
            <MenuItem value="">Choose a policy</MenuItem>
            {policies?.map((policy, index) => (
              <MenuItem key={index} value={policy}>{policy}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={() => setShowPolicyModal?.(true)}
          sx={{ position: 'absolute', top: 15, right: 15, minWidth: 0, padding: '4px 8px', borderRadius: '50%', border: '1px solid', borderColor: 'grey.400', backgroundColor: 'white', '&:hover': { backgroundColor: 'grey.100' } }}
        >
          ＋
        </Button>
      </Box>

      {/* Controls */}
      <Box sx={{ flex: 1, backgroundColor: 'grey.50', border: '1px solid', borderColor: 'grey.300', borderRadius: '8px', p: 3, position: 'relative' }}>
        <Typography variant="h6" sx={{ mb: '10px', fontSize: '1rem' }}>🛡️ Controls</Typography>
        <FormControl fullWidth size="small">
          <InputLabel id="select-control-label">Select Control</InputLabel>
          <Select
            labelId="select-control-label"
            value={selectedControl || ''}
            onChange={(e) => setSelectedControl?.(e.target.value)}
            label="Select Control"
          >
            <MenuItem value="">Choose a control</MenuItem>
            {controls?.map((control, index) => (
              <MenuItem key={index} value={control}>{control}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={() => setShowControlModal?.(true)}
          sx={{ position: 'absolute', top: 15, right: 15, minWidth: 0, padding: '4px 8px', borderRadius: '50%', border: '1px solid', borderColor: 'grey.400', backgroundColor: 'white', '&:hover': { backgroundColor: 'grey.100' } }}
        >
          ＋
        </Button>
      </Box>

      {/* Frameworks */}
      <Box sx={{ flex: 1, backgroundColor: 'grey.50', border: '1px solid', borderColor: 'grey.300', borderRadius: '8px', p: 3, position: 'relative' }}>
        <Typography variant="h6" sx={{ mb: '10px', fontSize: '1rem' }}>📚 Frameworks</Typography>
        <FormControl fullWidth size="small">
          <InputLabel id="select-framework-label">Select Framework</InputLabel>
          <Select
            labelId="select-framework-label"
            value={selectedFramework || ''}
            onChange={(e) => setSelectedFramework?.(e.target.value)}
            label="Select Framework"
          >
            <MenuItem value="">Choose a framework</MenuItem>
            {frameworks?.map((framework, index) => (
              <MenuItem key={index} value={framework}>{framework}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={() => setShowFrameworkModal?.(true)}
          sx={{ position: 'absolute', top: 15, right: 15, minWidth: 0, padding: '4px 8px', borderRadius: '50%', border: '1px solid', borderColor: 'grey.400', backgroundColor: 'white', '&:hover': { backgroundColor: 'grey.100' } }}
        >
          ＋
        </Button>
      </Box>

      {/* Policy Modal */}
      <Dialog open={showPolicyModal || false} onClose={() => setShowPolicyModal?.(false)}>
        <DialogTitle>Add New Policy</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter policy name"
            type="text"
            fullWidth
            variant="outlined"
            value={newPolicy || ''}
            onChange={(e) => setNewPolicy?.(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPolicyModal?.(false)}>Cancel</Button>
          <Button onClick={handleAddPolicy} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Control Modal */}
      <Dialog open={showControlModal || false} onClose={() => setShowControlModal?.(false)}>
        <DialogTitle>Add New Control</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter control name"
            type="text"
            fullWidth
            variant="outlined"
            value={newControl || ''}
            onChange={(e) => setNewControl?.(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowControlModal?.(false)}>Cancel</Button>
          <Button onClick={handleAddControl} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Framework Modal */}
      <Dialog open={showFrameworkModal || false} onClose={() => setShowFrameworkModal?.(false)}>
        <DialogTitle>Add New Framework</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter framework name"
            type="text"
            fullWidth
            variant="outlined"
            value={newFramework || ''}
            onChange={(e) => setNewFramework?.(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFrameworkModal?.(false)}>Cancel</Button>
          <Button onClick={handleAddFramework} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PolicyControlFrameworkSection;