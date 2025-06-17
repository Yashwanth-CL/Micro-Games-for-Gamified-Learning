/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { createContext, useState ,useEffect} from "react";
import Startprocess from "@/Components/Functions/StartProcess";
interface FileWithPreview extends File {
  preview: string;
}

interface CourseFormData {
  courseTitle: string;
  description: string;
  tags: string;
  targetAudience: string;
  thumbnail: File | null;
}

interface CourseContextType {
  courseTitle: string;
  setCourseTitle: (title: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  tags: string;
  setTags: (tags: string) => void;
  targetAudience: string;
  setTargetAudience: (audience: string) => void;
  thumbnail: File | null;
  setThumbnail: (file: File | null) => void;
  errors: Partial<Record<keyof CourseFormData, string>>;
  setErrors: (errors: Partial<Record<keyof CourseFormData, string>>) => void;
  files: FileWithPreview[];
  setFiles: (files: FileWithPreview[]) => void;
  selectedPolicy: string;
  setSelectedPolicy: (policy: string) => void;
  selectedControl: string;
  setSelectedControl: (control: string) => void;
  selectedFramework: string;
  setSelectedFramework: (framework: string) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  showPolicyModal: boolean;
  setShowPolicyModal: (show: boolean) => void;
  showControlModal: boolean;
  setShowControlModal: (show: boolean) => void;
  showFrameworkModal: boolean;
  setShowFrameworkModal: (show: boolean) => void;
  newPolicy: string;
  setNewPolicy: (policy: string) => void;
  newControl: string;
  setNewControl: (control: string) => void;
  newFramework: string;
  setNewFramework: (framework: string) => void;
  policies: string[];
  setPolicies: (policies: string[]) => void;
  controls: string[];
  setControls: (controls: string[]) => void;
  frameworks: string[];
  setFrameworks: (frameworks: string[]) => void;
  response?: ResponseData;
  setResponse: (response: ResponseData) => void;
  summary: any[];
  setSummary: (summary: any[]) => void;
  questions: any[];
  setQuestions: (questions: any[]) => void;
}

const CourseContext = createContext<CourseContextType>({
    courseTitle: '',
    setCourseTitle: () => {},
    description: '',
    setDescription: () => {},
    tags: '',
    setTags: () => {},
    targetAudience: '',
    setTargetAudience: () => {},
    thumbnail: null,
    setThumbnail: () => {},
    errors: {},
    setErrors: () => {},
    files: [],
    setFiles: () => {},
    selectedPolicy: '',
    setSelectedPolicy: () => {},
    selectedControl: '',
    setSelectedControl: () => {},
    selectedFramework: '',
    setSelectedFramework: () => {},
    isProcessing: false,
    setIsProcessing: () => {},
    showPolicyModal: false,
    setShowPolicyModal: () => {},
    showControlModal: false,
    setShowControlModal: () => {},
    showFrameworkModal: false,
    setShowFrameworkModal: () => {},
    newPolicy: '',
    setNewPolicy: () => {},
    newControl: '',
    setNewControl: () => {},
    newFramework: '',
    setNewFramework: () => {},
    policies: [],
    setPolicies: () => {},
    controls: [],
    setControls: () => {},
    frameworks: [],
    setFrameworks: () => {},
    response: undefined,
    setResponse: () => {},
    summary: [],
    setSummary: () => {},
    questions: [],
    setQuestions: () => {}
});

interface ResponseData {
    weekly_plan: WeeklyPlan[];
}

interface WeeklyPlan {
    topics: Topic[];
    week: number;
}

interface Topic {
    difficulty: string;
    questions: {
        answer: string;
        options: string[];
        question: string;
    }[];
    summary: string;
    topic_name: string;
}

function CourseContextProvider({ children }: { children: React.ReactNode }) {
  const [summary, setSummary] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('GRC, Compliance, Risk Management');
  const [targetAudience, setTargetAudience] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof CourseFormData, string>>>({});
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const [selectedControl, setSelectedControl] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [showControlModal, setShowControlModal] = useState(false);
  const [showFrameworkModal, setShowFrameworkModal] = useState(false);
  const [newPolicy, setNewPolicy] = useState('');
  const [newControl, setNewControl] = useState('');
  const [newFramework, setNewFramework] = useState('');
  const [policies, setPolicies] = useState(['Data Protection Policy', 'Information Security Policy', 'Acceptable Use Policy', 'Risk Management Policy', 'Compliance Policy']);
  const [controls, setControls] = useState(['Access Control', 'Change Management', 'Incident Response', 'Business Continuity', 'Vendor Management']);
  const [frameworks, setFrameworks] = useState(['ISO 27001', 'NIST Cybersecurity', 'SOC 2', 'GDPR', 'HIPAA']);
  const [response, setResponse] = useState<ResponseData>();
  useEffect(() => {
    Startprocess();
  }, [response]);
  return (
    <CourseContext.Provider value={{
      courseTitle,
      setCourseTitle,
      description,
      setDescription,
      tags,
      setTags,
      targetAudience,
      setTargetAudience,
      thumbnail,
      setThumbnail,
      errors,
      setErrors,
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
      response,
      setResponse,
      summary,
      setSummary,
      questions,
      setQuestions
    }}>
      {children}
    </CourseContext.Provider>
  )
}

export { CourseContext, CourseContextProvider };
