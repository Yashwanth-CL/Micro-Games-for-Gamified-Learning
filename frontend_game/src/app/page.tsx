/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CourseDetails from '@/Components/CourseDetails';
import UploadContent from '@/Components/UploadContent';
import Header from '@/Components/header';
import AiContent from '@/Components/AiContent';
import MicroGames from '@/Components/MicroGames';
import Assessment from '@/Components/Assessment';
import Publish from '@/Components/Publish';

const steps = ['Course Details', 'Upload Content', 'AI Content', 'Micro-Games', 'Assessment', 'Publish'];

const HorizontalLinearStepper: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [skipped, setSkipped] = React.useState<Set<number>>(new Set<number>());

  const isStepOptional = (step: number): boolean => {
    return step === 1;
  };

  const isStepSkipped = (step: number): boolean => {
    return skipped.has(step);
  };

  const handleNext = (): void => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = (): void => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = (): void => {
    setActiveStep(0);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CourseDetails />;
      case 1:
        return <UploadContent />;
      case 2:
        return <AiContent />;
      case 3:
        return <MicroGames/>
      case 4:
        return <Assessment/>
      case 5:
        return <Publish/>;
      default:
        return null;
    }
  };

  return (
    <>    <div className="w-full border-b border-[#e0e0e0] bg-white font-sans">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl text-[#222] m-0">Design Your Course</h1>
          <span className="text-sm px-2.5 py-1 border border-[#d0d0d0] rounded-full text-[#555] bg-[#f5f5f5]">Draft</span>
        </div>
        <div className="flex gap-2.5">
          <button className={`text-sm px-3 py-2 border border-[#ccc] rounded-md bg-white cursor-pointer hover:bg-[#f0f0f0] ${activeStep === steps.length - 1 ? 'block' : 'none'}`} style={{display:activeStep === steps.length - 1 ? 'block' : 'none'}}>👁️ Preview</button>
          <button className={`          text-sm px-3 py-2 border border-[#ccc] rounded-md bg-white cursor-pointer hover:bg-[#f0f0f0] ${activeStep === steps.length - 1 ? 'block' : 'none'}`} style={{display:activeStep === steps.length - 1 ? 'block' : 'none'}}>📝 Save Draft</button>
          <button className={`          text-sm px-3 py-2 rounded-md bg-[#0d6efd] text-white border-none cursor-pointer hover:bg-[#0b5ed7] `} style={{display:activeStep === steps.length - 1 ? 'block' : 'none'}} >✅ Publish Course</button>
        </div>
      </div>
    </div><Box sx={{ width: '100%' }} className="flex flex-col m-auto items-center">
      <Stepper activeStep={activeStep} className='w-[88vw]'>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean; } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          
          
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box className=' flex justify-center w-[100%]'>
            {renderStepContent(activeStep)}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box></>
  );
};

export default HorizontalLinearStepper;
