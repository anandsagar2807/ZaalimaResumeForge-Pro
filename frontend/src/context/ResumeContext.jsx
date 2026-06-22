import React, { createContext, useState, useContext } from 'react';

// Resume Schema Types
const initialResumeData = {
    personalInfo: {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
        portfolio: 'johndoe.com',
        summary: 'Experienced Software Engineer with a passion for building scalable web applications.'
    },
    education: [
        {
            id: 1,
            institution: 'University of Technology',
            degree: 'Bachelor of Computer Science',
            field: 'Computer Science',
            startDate: '2020-09',
            endDate: '2024-05',
            gpa: '3.8',
            description: 'Graduated with honors. Relevant coursework: Data Structures, Algorithms, Web Development.'
        }
    ],
    experience: [
        {
            id: 1,
            company: 'Tech Solutions Inc.',
            position: 'Frontend Developer',
            location: 'San Francisco, CA',
            startDate: '2023-06',
            endDate: 'Present',
            description: 'Developed responsive web applications using React and TypeScript. Collaborated with UX designers to implement pixel-perfect interfaces.'
        }
    ],
    skills: [
        { id: 1, name: 'React', category: 'Frontend', level: 'Advanced' },
        { id: 2, name: 'TypeScript', category: 'Frontend', level: 'Intermediate' },
        { id: 3, name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced' },
        { id: 4, name: 'Node.js', category: 'Backend', level: 'Intermediate' },
        { id: 5, name: 'Python', category: 'Backend', level: 'Intermediate' },
        { id: 6, name: 'Git', category: 'Tools', level: 'Advanced' }
    ],
    projects: [
        {
            id: 1,
            name: 'E-commerce Dashboard',
            description: 'Built a full-stack e-commerce dashboard with real-time analytics',
            technologies: ['React', 'Node.js', 'MongoDB'],
            link: 'https://github.com/username/ecommerce-dashboard'
        }
    ],
    selectedTemplate: 'modern',
    jobDescription: '',
    uploadedResume: null
};

// Create Context
export const ResumeContext = createContext();

// Provider Component
export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(initialResumeData);
    const [selectedTemplate, setSelectedTemplate] = useState('modern');
    const [hiddenSections, setHiddenSections] = useState([]);

    // Generic update function for top-level fields
    const updateResumeData = (updates) => {
        setResumeData(prev => ({
            ...prev,
            ...updates
        }));
    };

    // Update personal info
    const updatePersonalInfo = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [field]: value
            }
        }));
    };

    // Add education entry
    const addEducation = (education = {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: ''
    }) => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, { ...education, id: Date.now() }]
        }));
    };

    // Update education entry
    const updateEducation = (id, updatedEducation) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map(edu =>
                edu.id === id ? { ...edu, ...updatedEducation } : edu
            )
        }));
    };

    // Remove education entry
    const removeEducation = (id) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id)
        }));
    };

    // Add experience entry
    const addExperience = (experience = {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
    }) => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, { ...experience, id: Date.now() }]
        }));
    };

    // Update experience entry
    const updateExperience = (id, updatedExperience) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                exp.id === id ? { ...exp, ...updatedExperience } : exp
            )
        }));
    };

    // Remove experience entry
    const removeExperience = (id) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    // Add skill
    const addSkill = (skill = { name: '', category: 'Other', level: 'Beginner' }) => {
        setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, { ...skill, id: Date.now() }]
        }));
    };

    // Remove skill
    const removeSkill = (id) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill.id !== id)
        }));
    };

    // Add project
    const addProject = (project = {
        name: '',
        description: '',
        technologies: [],
        link: ''
    }) => {
        setResumeData(prev => ({
            ...prev,
            projects: [...prev.projects, { ...project, id: Date.now() }]
        }));
    };

    // Update project
    const updateProject = (id, updatedProject) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.map(proj =>
                proj.id === id ? { ...proj, ...updatedProject } : proj
            )
        }));
    };

    // Remove project
    const removeProject = (id) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.filter(proj => proj.id !== id)
        }));
    };

    // Set job description
    const setJobDescription = (description) => {
        setResumeData(prev => ({
            ...prev,
            jobDescription: description
        }));
    };

    // Set uploaded resume
    const setUploadedResume = (file) => {
        setResumeData(prev => ({
            ...prev,
            uploadedResume: file
        }));
    };

    // Set selected template
    const setTemplate = (templateId) => {
        setSelectedTemplate(templateId);
        setResumeData(prev => ({
            ...prev,
            selectedTemplate: templateId
        }));
    };

    // Reset resume data
    const resetResumeData = () => {
        setResumeData(initialResumeData);
        setSelectedTemplate('modern');
        setHiddenSections([]);
    };

    const value = {
        resumeData,
        selectedTemplate,
        hiddenSections,
        setHiddenSections,
        updateResumeData,
        updatePersonalInfo,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        setJobDescription,
        setUploadedResume,
        setTemplate,
        resetResumeData
    };

    return (
        <ResumeContext.Provider value={value}>
            {children}
        </ResumeContext.Provider>
    );
};

// Custom hook to use the context
export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};
