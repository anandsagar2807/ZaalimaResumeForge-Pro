import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
    Upload, FileText, Briefcase, GraduationCap, Code,
    Award, Download, Eye, Save, Sparkles, ChevronLeft,
    Plus, Trash2, MapPin, Mail, Phone, Link as LinkIcon,
    Linkedin, Github, ExternalLink, Trash,
    Crown, Lock, AlertCircle, Edit3, Maximize2, Minimize2
} from 'lucide-react';
import ResumePreview from '../components/ResumePreview';
import { aiService } from '../services/aiService';
import { useToast } from '../context/ToastContext';

const ResumeBuilderPage = () => {
    const { templateId } = useParams();
    const navigate = useNavigate();
    const { user, isPro, isFree, isAuthenticated } = useAuth();
    const toast = useToast();
    const {
        resumeData,
        selectedTemplate,
        setTemplate,
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
        setUploadedResume
    } = useResume();

    const [activeSection, setActiveSection] = useState('personal');
    const [jdText, setJdText] = useState(resumeData.jobDescription || '');
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    // AI Match Assistant state
    const [jdAnalysis, setJdAnalysis] = useState(null);
    const [atsResult, setAtsResult] = useState(null);
    const [analyzingJD, setAnalyzingJD] = useState(false);
    const [optimizing, setOptimizing] = useState(false);
    const [aiError, setAiError] = useState('');
    // When true, the left editor panel is hidden and the live preview expands to
    // fill the entire viewport — dedicating the full screen to the preview.
    const [previewOnlyMode, setPreviewOnlyMode] = useState(false);

    useEffect(() => {
        if (templateId && templateId !== selectedTemplate) {
            setTemplate(templateId);
        }
    }, [templateId, selectedTemplate, setTemplate]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const incomingJD = params.get('jd');
        if (incomingJD && incomingJD.trim()) {
            setJobDescription(incomingJD);
            setJdText(incomingJD);
        }
    }, [setJobDescription]);

    // Form sections config
    const sections = [
        { id: 'personal', label: 'Personal Info', icon: <FileText className="w-5 h-5" /> },
        { id: 'education', label: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
        { id: 'experience', label: 'Experience', icon: <Briefcase className="w-5 h-5" /> },
        { id: 'skills', label: 'Skills', icon: <Code className="w-5 h-5" /> },
        { id: 'projects', label: 'Projects', icon: <Award className="w-5 h-5" /> },
    ];

    // Build a plain-text corpus of the current resume for AI analysis
    const getResumeCorpus = () => {
        const p = resumeData.personalInfo || {};
        const parts = [
            p.fullName || '',
            p.title || '',
            p.summary || '',
            'EXPERIENCE',
            ...(resumeData.experience || []).map((exp) =>
                `${exp.position || ''} | ${exp.company || ''} | ${exp.startDate || ''} - ${exp.endDate || ''}\n${exp.description || ''}`
            ),
            'EDUCATION',
            ...(resumeData.education || []).map((edu) =>
                `${edu.degree || ''} ${edu.field ? `in ${edu.field}` : ''} | ${edu.institution || ''} | ${edu.startDate || ''} - ${edu.endDate || ''}`
            ),
            'SKILLS',
            (resumeData.skills || []).map((s) => s.name).join(', '),
            'PROJECTS',
            ...(resumeData.projects || []).map((pr) =>
                `${pr.name || ''}\n${pr.description || ''}\n${(pr.technologies || []).join(', ')}`
            ),
        ];
        return parts.filter(Boolean).join('\n');
    };

    // AI Actions — wired to the real backend AI service
    const handleAnalyzeJD = async () => {
        if (!jdText.trim()) {
            toast.error('Please paste a job description first.');
            return;
        }
        setAnalyzingJD(true);
        setAiError('');
        setJdAnalysis(null);
        setJobDescription(jdText);
        try {
            const result = await aiService.analyzeJD(jdText);
            setJdAnalysis(result);
            toast.success('Job description analyzed successfully!');
        } catch (err) {
            const msg = err?.response?.data?.error || err?.message || 'Failed to analyze job description.';
            setAiError(msg);
            toast.error(msg);
        } finally {
            setAnalyzingJD(false);
        }
    };

    const handleOptimizeResume = async () => {
        if (!jdText.trim()) {
            toast.error('Please paste a job description first.');
            return;
        }
        setOptimizing(true);
        setAiError('');
        setAtsResult(null);
        setJobDescription(jdText);
        try {
            const resumeText = getResumeCorpus();
            const result = await aiService.getATSScore(resumeText, jdText);
            setAtsResult(result);
            // Auto-add missing skills that the AI flagged, so the resume
            // immediately reflects the optimization.
            const missing = result?.missingKeywords || [];
            if (Array.isArray(missing) && missing.length > 0) {
                const existing = new Set((resumeData.skills || []).map((s) => s.name.toLowerCase()));
                let added = 0;
                missing.forEach((kw) => {
                    const name = String(kw).trim();
                    if (name && !existing.has(name.toLowerCase())) {
                        addSkill({ name, category: 'AI Suggested' });
                        existing.add(name.toLowerCase());
                        added += 1;
                    }
                });
                if (added > 0) {
                    toast.success(`Optimization complete! Added ${added} suggested skill${added > 1 ? 's' : ''} from the JD.`);
                } else {
                    toast.success('Optimization complete! Your resume already covers the key keywords.');
                }
            } else {
                toast.success('Optimization complete! No missing keywords detected.');
            }
        } catch (err) {
            const msg = err?.response?.data?.error || err?.message || 'Failed to optimize resume.';
            setAiError(msg);
            toast.error(msg);
        } finally {
            setOptimizing(false);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedResume(file);
            alert(`File "${file.name}" uploaded. Extracting data...`);
        }
    };

    const getExportFileName = (extension) => {
        const safeName = (resumeData.personalInfo.fullName || 'resume').trim().replace(/\s+/g, '_');
        return `${safeName}.${extension}`;
    };

    const downloadBlob = (blob, fileName) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const getResumeElementForExport = () => {
        const exportNodes = Array.from(document.querySelectorAll('[data-resume-export="true"]'));
        const visibleNode = exportNodes.find((node) => node.offsetParent !== null);

        return visibleNode || exportNodes[exportNodes.length - 1] ||
            document.querySelector('.resume-preview-container') ||
            document.querySelector('.w-\\[8\\.5in\\]');
    };

    const generateClientPdf = async () => {
        const resumeElement = getResumeElementForExport();
        if (!resumeElement) {
            throw new Error('Resume preview not found');
        }

        const canvas = await html2canvas(resumeElement, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
            heightLeft -= pageHeight;
        }

        pdf.save(getExportFileName('pdf'));
    };

    // PDF Export Functionality
    const handleDownloadPDF = async () => {
        const resumeElement = getResumeElementForExport();
        if (!resumeElement) {
            alert('Resume preview not found');
            return;
        }

        // Show watermark notice for free users
        if (isFree()) {
            const confirmed = window.confirm(
                '⚠️ Free Plan Notice: Your PDF will include a "ResumeForge Pro" watermark.\n\n' +
                'Upgrade to Pro for clean, watermark-free PDFs and premium templates.\n\n' +
                'Click OK to continue with watermark, or Cancel to upgrade.'
            );
            if (!confirmed) {
                navigate('/pricing');
                return;
            }
        }

        // Try backend PDF first, then fallback to client-side PDF generation.
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
            };

            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        * { box-sizing: border-box; }
                        body { margin: 0; padding: 0; background: #fff; }
                    </style>
                </head>
                <body>${resumeElement.innerHTML}</body>
                </html>
            `;

            const response = await fetch(`${apiUrl}/resume/pdf`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ htmlContent }),
            });

            if (!response.ok) {
                throw new Error(`Backend PDF generation failed with status ${response.status}`);
            }

            const blob = await response.blob();
            downloadBlob(blob, getExportFileName('pdf'));
        } catch (error) {
            console.warn('Backend PDF failed, using client-side fallback:', error);
            try {
                await generateClientPdf();
            } catch (fallbackError) {
                console.error('Client-side PDF export error:', fallbackError);
                alert('Failed to generate PDF. Please try again.');
            }
        }
    };

    const handleDownloadTXT = () => {
        const lines = [
            resumeData.personalInfo.fullName || 'Your Name',
            `${resumeData.personalInfo.email || ''} ${resumeData.personalInfo.phone || ''}`.trim(),
            resumeData.personalInfo.location || '',
            '',
            'SUMMARY',
            resumeData.personalInfo.summary || '',
            '',
            'EXPERIENCE',
            ...resumeData.experience.map((exp) => `${exp.position} | ${exp.company} | ${exp.startDate} - ${exp.endDate}\n${exp.description}`),
            '',
            'EDUCATION',
            ...resumeData.education.map((edu) => `${edu.degree} ${edu.field ? `in ${edu.field}` : ''} | ${edu.institution} | ${edu.startDate} - ${edu.endDate}`),
            '',
            'SKILLS',
            resumeData.skills.map((skill) => skill.name).join(', '),
        ].join('\n');

        const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = getExportFileName('txt');
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleDownloadDOC = () => {
        const resumeElement = document.querySelector('.resume-preview-container') || document.querySelector('.w-\\[8\\.5in\\]');
        if (!resumeElement) {
            alert('Resume preview not found');
            return;
        }

        const html = `
            <html>
            <head><meta charset="utf-8"></head>
            <body>${resumeElement.innerHTML}</body>
            </html>
        `;

        const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = getExportFileName('doc');
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleDownloadByFormat = async (format) => {
        if (format === 'pdf') await handleDownloadPDF();
        if (format === 'txt') handleDownloadTXT();
        if (format === 'doc') handleDownloadDOC();
        setShowDownloadModal(false);
    };

    // ✨ PREMIUM FEATURE: Optimize Bullet Points
    const optimizeBulletPoint = (text) => {
        const actionVerbs = ['Developed', 'Implemented', 'Designed', 'Led', 'Optimized', 'Built', 'Created', 'Managed', 'Improved', 'Engineered'];
        const metrics = [' by 25%', ' for 10K+ users', ' reducing load time by 40%', ' increasing efficiency', ' improving performance'];

        if (!text || text.length < 20) return text;

        // Start with action verb
        if (!actionVerbs.some(v => text.startsWith(v))) {
            const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
            text = randomVerb + ' ' + text.charAt(0).toLowerCase() + text.slice(1);
        }

        // Add quantifiable metric if missing
        if (!text.match(/\d+%|\d+\+|\d+/)) {
            const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
            text = text.trim().replace(/\.$/, '') + randomMetric + '.';
        }

        return text;
    };

    // ✨ PREMIUM FEATURE: Auto-Save
    useEffect(() => {
        const autoSaveInterval = setInterval(() => {
            localStorage.setItem('resumeDraft', JSON.stringify(resumeData));
        }, 30000); // Auto save every 30 seconds

        return () => clearInterval(autoSaveInterval);
    }, [resumeData]);

    // Render active section form
    const renderForm = () => {
        const inputClass = "input-premium text-sm py-2.5";
        const labelClass = "block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5";

        switch (activeSection) {
            case 'personal':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>
                                    <span className="text-slate-700 text-sm font-bold">Full Name</span>
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={resumeData.personalInfo.fullName}
                                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                                    className={inputClass}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className={labelClass}>
                                    <span className="text-slate-700 text-sm font-bold">Email</span>
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={resumeData.personalInfo.email}
                                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                                    className={inputClass}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className={labelClass}>
                                    <span className="text-slate-700 text-sm font-bold">Phone</span>
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={resumeData.personalInfo.phone}
                                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                                    className={inputClass}
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                            <div>
                                <label className={labelClass}>
                                    <span className="text-slate-700 text-sm font-bold">Location</span>
                                </label>
                                <input
                                    type="text"
                                    value={resumeData.personalInfo.location}
                                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                                    className={inputClass}
                                    placeholder="City, State"
                                />
                            </div>
                            <div>
                                <label className={labelClass}>
                                    <span className="text-slate-700 text-sm font-bold">LinkedIn</span>
                                </label>
                                <input
                                    type="text"
                                    value={resumeData.personalInfo.linkedin}
                                    onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                                    className={inputClass}
                                    placeholder="linkedin.com/in/username"
                                />
                            </div>
                            <div>
                                <label className={labelClass}>
                                    <span className="text-slate-700 text-sm font-bold">GitHub / Portfolio</span>
                                </label>
                                <input
                                    type="text"
                                    value={resumeData.personalInfo.github}
                                    onChange={(e) => updatePersonalInfo('github', e.target.value)}
                                    className={inputClass}
                                    placeholder="github.com/username"
                                />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>
                                <span className="text-slate-700 text-sm font-bold">Professional Summary</span>
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <textarea
                                value={resumeData.personalInfo.summary}
                                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                                className={`${inputClass} h-32 resize-none`}
                                placeholder="Briefly describe your professional background and key achievements..."
                            />
                        </div>
                    </div>
                );
            case 'education':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {resumeData.education.map((edu) => (
                            <div key={edu.id} className="p-6 border border-slate-100 rounded-2xl relative group bg-slate-50/30">
                                <button
                                    onClick={() => removeEducation(edu.id)}
                                    className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Institution</label>
                                        <input
                                            type="text"
                                            value={edu.institution}
                                            onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                                            className={inputClass}
                                            placeholder="University Name"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Degree</label>
                                        <input
                                            type="text"
                                            value={edu.degree}
                                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                            className={inputClass}
                                            placeholder="Bachelor of Science"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Field of Study</label>
                                        <input
                                            type="text"
                                            value={edu.field}
                                            onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                                            className={inputClass}
                                            placeholder="Computer Science"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Start Date</label>
                                        <input
                                            type="text"
                                            value={edu.startDate}
                                            onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                                            className={inputClass}
                                            placeholder="MM/YYYY"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>End Date</label>
                                        <input
                                            type="text"
                                            value={edu.endDate}
                                            onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                                            className={inputClass}
                                            placeholder="MM/YYYY or Present"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addEducation()}
                            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50/30 transition-all flex items-center justify-center gap-2 font-bold text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Education
                        </button>
                    </div>
                );
            case 'experience':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {resumeData.experience.map((exp) => (
                            <div key={exp.id} className="p-6 border border-slate-100 rounded-2xl relative group bg-slate-50/30">
                                <button
                                    onClick={() => removeExperience(exp.id)}
                                    className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                                    <div>
                                        <label className={labelClass}>Company</label>
                                        <input
                                            type="text"
                                            value={exp.company}
                                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                            className={inputClass}
                                            placeholder="Company Name"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Position</label>
                                        <input
                                            type="text"
                                            value={exp.position}
                                            onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                                            className={inputClass}
                                            placeholder="Software Engineer"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Start Date</label>
                                        <input
                                            type="text"
                                            value={exp.startDate}
                                            onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                                            className={inputClass}
                                            placeholder="MM/YYYY"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>End Date</label>
                                        <input
                                            type="text"
                                            value={exp.endDate}
                                            onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                                            className={inputClass}
                                            placeholder="MM/YYYY or Present"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Description</label>
                                        <textarea
                                            value={exp.description}
                                            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                                            className={`${inputClass} h-32 resize-none`}
                                            placeholder="Describe your responsibilities and achievements..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addExperience()}
                            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50/30 transition-all flex items-center justify-center gap-2 font-bold text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Experience
                        </button>
                    </div>
                );
            case 'skills':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex flex-wrap gap-2">
                            {resumeData.skills.map((skill) => (
                                <div key={skill.id} className="group flex items-center gap-2 bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                                    <span className="text-sm font-semibold">{skill.name}</span>
                                    <button
                                        onClick={() => removeSkill(skill.id)}
                                        className="text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                id="skill-input"
                                type="text"
                                className={inputClass}
                                placeholder="Add a skill (e.g. React, Python)"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addSkill({ name: e.target.value, category: 'Technical' });
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    const input = document.getElementById('skill-input');
                                    if (input.value) {
                                        addSkill({ name: input.value, category: 'Technical' });
                                        input.value = '';
                                    }
                                }}
                                className="btn-premium-primary py-2 px-6 text-sm"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {resumeData.projects.map((proj) => (
                            <div key={proj.id} className="p-6 border border-slate-100 rounded-2xl relative group bg-slate-50/30">
                                <button
                                    onClick={() => removeProject(proj.id)}
                                    className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Project Name</label>
                                        <input
                                            type="text"
                                            value={proj.name}
                                            onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                                            className={inputClass}
                                            placeholder="Project Name"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Description</label>
                                        <textarea
                                            value={proj.description}
                                            onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                                            className={`${inputClass} h-32 resize-none`}
                                            placeholder="Describe your project and your contributions..."
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Technologies (comma separated)</label>
                                        <input
                                            type="text"
                                            value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                                            onChange={(e) => updateProject(proj.id, { technologies: e.target.value.split(',').map(s => s.trim()) })}
                                            className={inputClass}
                                            placeholder="React, Node.js, Tailwind"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Link</label>
                                        <input
                                            type="text"
                                            value={proj.link}
                                            onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                                            className={inputClass}
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addProject()}
                            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50/30 transition-all flex items-center justify-center gap-2 font-bold text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Project
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="app-shell-fullheight bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex flex-col overflow-hidden font-sans">
            {/* Top Bar */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-16 flex items-center justify-between px-6 shrink-0 relative z-20 shadow-sm">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/templates')}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold text-sm group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Back</span>
                    </button>
                    <div className="w-px h-6 bg-slate-200 hidden md:block" />
                    <div className="flex items-center gap-2.5">
                        <img src="/logo.png" alt="CareerForge Pro" className="h-7 w-auto" />
                        <h1 className="font-display font-bold text-slate-900 tracking-tight hidden md:block">
                            CareerForge <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Pro</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold text-sm">
                        <Save className="w-4 h-4" />
                        <span>Draft Saved</span>
                    </button>
                    {/* Use Template — toggles between editor+preview and full-screen preview */}
                    <button
                        onClick={() => setPreviewOnlyMode((v) => !v)}
                        className={`flex items-center gap-2 font-bold py-2 px-4 rounded-xl text-sm transition-all ${previewOnlyMode
                            ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:shadow-lg'
                            }`}
                        title={previewOnlyMode ? 'Back to editor' : 'Use this template — full-screen preview'}
                    >
                        {previewOnlyMode ? (
                            <>
                                <Edit3 className="w-4 h-4" />
                                <span className="hidden sm:inline">Edit</span>
                            </>
                        ) : (
                            <>
                                <Maximize2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Use Template</span>
                            </>
                        )}
                    </button>
                    <button onClick={() => setShowDownloadModal(true)} className="bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold py-2 px-6 rounded-xl text-sm flex items-center gap-2 hover:shadow-lg transition-all">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                    </button>
                </div>
            </div>

            {/* Main content row — fills remaining viewport height below the top bar.
                `min-h-0` lets the inner panes scroll instead of overflowing the viewport. */}
            <div className="flex flex-1 min-h-0 overflow-hidden">
                {/* Main Content Area */}
                <div className="flex-1 flex min-h-0 overflow-hidden">
                    {/* Editor Pane - 55% (hidden in preview-only mode) */}
                    {!previewOnlyMode && (
                        <div className="w-full lg:w-[55%] overflow-y-auto bg-white/50 px-6 py-10 md:px-12">
                            <div className="max-w-4xl mx-auto space-y-8">
                                {/* Horizontal Step Navigation */}
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-slate-200/60 shadow-sm">
                                    <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
                                        {sections.map((section) => (
                                            <button
                                                key={section.id}
                                                onClick={() => setActiveSection(section.id)}
                                                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${activeSection === section.id
                                                    ? 'bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg scale-105'
                                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                    }`}
                                            >
                                                <div className="shrink-0">{section.icon}</div>
                                                <span className="font-bold text-sm tracking-tight hidden sm:block">{section.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
                                            {sections.find(s => s.id === activeSection)?.label}
                                        </h2>
                                        <p className="text-sm text-slate-600 font-medium">
                                            Complete your profile to build a winning resume.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-lg">
                                    {renderForm()}
                                </div>

                                {/* AI Integration Section */}
                                <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]" />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                                                <Sparkles className="w-5 h-5 text-blue-300" />
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block">AI Match Assistant</span>
                                                <span className="text-xs text-slate-400">Optimize for job descriptions</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <textarea
                                                value={jdText}
                                                onChange={(e) => setJdText(e.target.value)}
                                                className="w-full h-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all resize-none"
                                                placeholder="Paste job description here to get AI-powered optimization..."
                                            />
                                            <div className="flex flex-wrap gap-3">
                                                <button
                                                    onClick={handleAnalyzeJD}
                                                    disabled={analyzingJD || optimizing}
                                                    className="bg-white text-slate-900 hover:bg-slate-100 font-bold py-3 px-6 rounded-xl text-sm transition-all flex items-center gap-2 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                                                >
                                                    <Sparkles className="w-4 h-4" />
                                                    {analyzingJD ? 'Analyzing…' : 'Analyze JD'}
                                                </button>
                                                <button
                                                    onClick={handleOptimizeResume}
                                                    disabled={analyzingJD || optimizing}
                                                    className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all border border-white/20 backdrop-blur-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                                >
                                                    <Sparkles className="w-4 h-4" />
                                                    {optimizing ? 'Optimizing…' : 'Optimize with AI'}
                                                </button>
                                            </div>

                                            {/* Error message */}
                                            {aiError && (
                                                <div className="bg-red-500/20 border border-red-400/40 rounded-xl p-4 text-sm text-red-200">
                                                    {aiError}
                                                </div>
                                            )}

                                            {/* JD Analysis results */}
                                            {jdAnalysis && (
                                                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 space-y-4">
                                                    <h3 className="text-sm font-bold text-blue-300 uppercase tracking-wider">JD Analysis</h3>
                                                    {jdAnalysis.keywords?.length > 0 && (
                                                        <div>
                                                            <p className="text-xs text-slate-300 mb-2 font-semibold">Key Keywords</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {jdAnalysis.keywords.map((k, i) => (
                                                                    <span key={i} className="px-2.5 py-1 bg-blue-500/30 text-blue-100 text-xs rounded-lg border border-blue-400/30">
                                                                        {k}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {jdAnalysis.skills?.required?.length > 0 && (
                                                        <div>
                                                            <p className="text-xs text-slate-300 mb-2 font-semibold">Required Skills</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {jdAnalysis.skills.required.map((s, i) => (
                                                                    <span key={i} className="px-2.5 py-1 bg-emerald-500/30 text-emerald-100 text-xs rounded-lg border border-emerald-400/30">
                                                                        {s}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {jdAnalysis.skills?.preferred?.length > 0 && (
                                                        <div>
                                                            <p className="text-xs text-slate-300 mb-2 font-semibold">Preferred Skills</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {jdAnalysis.skills.preferred.map((s, i) => (
                                                                    <span key={i} className="px-2.5 py-1 bg-amber-500/30 text-amber-100 text-xs rounded-lg border border-amber-400/30">
                                                                        {s}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {(jdAnalysis.experience || jdAnalysis.education) && (
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                                            {jdAnalysis.experience && (
                                                                <div className="bg-white/5 rounded-lg p-3">
                                                                    <span className="text-slate-400 block mb-1">Experience</span>
                                                                    <span className="text-white">{jdAnalysis.experience}</span>
                                                                </div>
                                                            )}
                                                            {jdAnalysis.education && (
                                                                <div className="bg-white/5 rounded-lg p-3">
                                                                    <span className="text-slate-400 block mb-1">Education</span>
                                                                    <span className="text-white">{jdAnalysis.education}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* ATS Optimization results */}
                                            {atsResult && (
                                                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-sm font-bold text-blue-300 uppercase tracking-wider">ATS Match Score</h3>
                                                        <span className={`text-2xl font-bold ${atsResult.score >= 75 ? 'text-emerald-300' : atsResult.score >= 50 ? 'text-amber-300' : 'text-red-300'}`}>
                                                            {atsResult.score}%
                                                        </span>
                                                    </div>
                                                    {atsResult.missingKeywords?.length > 0 && (
                                                        <div>
                                                            <p className="text-xs text-slate-300 mb-2 font-semibold">Missing Keywords (auto-added to your skills)</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {atsResult.missingKeywords.map((k, i) => (
                                                                    <span key={i} className="px-2.5 py-1 bg-red-500/30 text-red-100 text-xs rounded-lg border border-red-400/30">
                                                                        {k}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {atsResult.foundKeywords?.length > 0 && (
                                                        <div>
                                                            <p className="text-xs text-slate-300 mb-2 font-semibold">Matched Keywords</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {atsResult.foundKeywords.map((k, i) => (
                                                                    <span key={i} className="px-2.5 py-1 bg-emerald-500/30 text-emerald-100 text-xs rounded-lg border border-emerald-400/30">
                                                                        {k}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {atsResult.suggestions?.length > 0 && (
                                                        <div>
                                                            <p className="text-xs text-slate-300 mb-2 font-semibold">Suggestions</p>
                                                            <ul className="space-y-1.5">
                                                                {atsResult.suggestions.map((s, i) => (
                                                                    <li key={i} className="text-xs text-slate-200 flex gap-2">
                                                                        <span className="text-blue-300">•</span>
                                                                        <span>{s}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Preview Pane — expands to full viewport in preview-only mode.
                        `preview-pane-fullheight` guarantees the pane stretches to the full
                        height of its flex parent (top → bottom of the page) in both modes. */}
                    <div
                        className={`${previewOnlyMode
                            ? 'flex w-full preview-pane-fullheight'
                            : 'hidden lg:flex w-[45%] preview-pane-fullheight'
                            } bg-gradient-to-br from-slate-100 to-slate-200 ${previewOnlyMode ? '' : 'border-l border-slate-300'} overflow-hidden flex-col`}
                    >
                        <div className="h-14 bg-white/60 backdrop-blur-sm flex items-center justify-between px-6 shrink-0 border-b border-slate-300/60">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center shadow-sm">
                                    <Eye className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Live Preview</span>
                                    <span className="text-xs text-slate-500">
                                        {previewOnlyMode ? 'Full-screen preview — click "Edit" to return' : 'Real-time updates'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                        </div>
                        {/* Inner scroll region — fills the pane height and scrolls internally
                            so the preview never pushes the layout beyond the viewport. */}
                        <div className="preview-scroll-fullheight overflow-y-auto p-8 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] flex items-start justify-center">
                            <div
                                className={`w-[8.5in] h-fit bg-white shadow-2xl origin-top ${previewOnlyMode ? 'scale-100' : 'scale-[0.85]'}`}
                                data-resume-export="true"
                            >
                                <ResumePreview />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed -left-[9999px] top-0 z-[-1] opacity-0 pointer-events-none" aria-hidden="true">
                <div className="w-[8.5in] h-fit bg-white" data-resume-export="true">
                    <ResumePreview />
                </div>
            </div>

            {showDownloadModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Choose download format</h3>
                        <p className="text-sm text-slate-500 mb-5">Select the format you want to export for this resume.</p>

                        <div className="space-y-3">
                            <button onClick={() => handleDownloadByFormat('pdf')} className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all">
                                <span className="font-semibold text-slate-900">PDF</span>
                                <p className="text-xs text-slate-500 mt-1">Best for job applications and consistent formatting.</p>
                            </button>
                            <button onClick={() => handleDownloadByFormat('doc')} className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all">
                                <span className="font-semibold text-slate-900">DOC</span>
                                <p className="text-xs text-slate-500 mt-1">Editable document for quick manual changes.</p>
                            </button>
                            <button onClick={() => handleDownloadByFormat('txt')} className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all">
                                <span className="font-semibold text-slate-900">TXT</span>
                                <p className="text-xs text-slate-500 mt-1">Plain-text ATS-focused export.</p>
                            </button>
                        </div>

                        <button
                            onClick={() => setShowDownloadModal(false)}
                            className="mt-5 w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeBuilderPage;
