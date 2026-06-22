import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter, Check, Sparkles, Eye, X, ChevronLeft, ChevronRight,
  Loader2, Grid, LayoutGrid, Star, Zap, Briefcase, User, Code,
  Home, ArrowRight, MessageSquare, FileText, Search, BarChart3,
  Lock, Crown
} from 'lucide-react';
import groqTemplatesService, { templateStyles } from '../services/groqTemplates';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import TemplatePageHeader from '../components/TemplatePageHeader';
import Footer from '../components/Footer';
import TemplateComparison from '../components/TemplateComparison';
import TemplateCustomizationModal from '../components/TemplateCustomizationModal';
import {
  CampusPlacementTemplate, MinimalistTemplate, ModernTemplate, ProfessionalTemplate, CreativeTemplate,
  CompactTemplate, ExecutiveTemplate, ATSTemplate, TechTemplate, DevResumeTemplate,
  FAANGTemplate, SVEngineerTemplate, ServiceEngineerTemplate, EliteEngineerTemplate,
  ATSExecutiveTemplate, KoushikTemplate
} from '../components/templates';

const templateComponents = {
  campusplacement: CampusPlacementTemplate,
  minimalist: MinimalistTemplate,
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  compact: CompactTemplate,
  executive: ExecutiveTemplate,
  ats: ATSTemplate,
  tech: TechTemplate,
  devresume: DevResumeTemplate,
  faang: FAANGTemplate,
  svengineer: SVEngineerTemplate,
  serviceengineer: ServiceEngineerTemplate,
  eliteengineer: EliteEngineerTemplate,
  atsexecutive: ATSExecutiveTemplate,
  koushik: KoushikTemplate
};

const TemplatesPage = () => {
  const navigate = useNavigate();
  const { setTemplate, updateResumeData, setHiddenSections } = useResume();
  const { user, isPro, isAdmin, hasPremiumTemplates, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRouting, setIsRouting] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [selectedTemplateForCustomization, setSelectedTemplateForCustomization] = useState(null);

  const categories = [
    { id: 'all', label: 'All Templates', count: 8, icon: LayoutGrid },
    { id: 'Simple', label: 'Minimalist', count: 1, icon: User },
    { id: 'Modern', label: 'Modern', count: 1, icon: Grid },
    { id: 'Professional', label: 'Professional', count: 1, icon: Briefcase },
    { id: 'Creative', label: 'Creative', count: 1, icon: Star },
    { id: 'Compact', label: 'Compact', count: 1, icon: Grid },
    { id: 'Executive', label: 'Executive', count: 1, icon: Star },
    { id: 'ATS Friendly', label: 'ATS Friendly', count: 1, icon: Check },
    { id: 'Technical', label: 'Technical', count: 1, icon: Code },
  ];

  const allTemplates = useMemo(() => {
    return Object.entries(templateStyles).map(([id, style]) => ({
      id,
      ...style,
      TemplateComponent: templateComponents[id]
    }));
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await groqTemplatesService.getDefaultData();
        setResumeData(data);
      } catch (error) {
        console.error('Failed to load resume data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredTemplates = allTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const mapGeneratedToContextData = (generated, templateId) => {
    const timestamp = Date.now();
    const personal = generated?.personalInfo || {};
    const summary = generated?.summary || '';

    return {
      personalInfo: {
        fullName: personal.name || 'Your Name',
        email: personal.email || '',
        phone: personal.phone || '',
        location: personal.location || '',
        linkedin: personal.linkedin || '',
        github: personal.website || '',
        portfolio: personal.website || '',
        summary,
      },
      education: (generated?.education || []).map((edu, index) => ({
        id: timestamp + index,
        institution: edu.school || '',
        degree: edu.degree || '',
        field: edu.field || '',
        startDate: '',
        endDate: edu.year || '',
        gpa: '',
        description: '',
      })),
      experience: (generated?.experience || []).map((exp, index) => ({
        id: timestamp + 100 + index,
        company: exp.company || '',
        position: exp.title || '',
        location: exp.location || '',
        startDate: exp.startDate || '',
        endDate: exp.endDate || '',
        description: Array.isArray(exp.achievements) ? exp.achievements.join('\n') : '',
      })),
      skills: [
        ...(generated?.skills?.technical || []),
        ...(generated?.skills?.soft || []),
      ].map((skill, index) => ({
        id: timestamp + 200 + index,
        name: skill,
        category: index < (generated?.skills?.technical || []).length ? 'Technical' : 'Soft',
        level: 'Advanced',
      })),
      projects: (generated?.projects || []).map((project, index) => ({
        id: timestamp + 300 + index,
        name: project.name || '',
        description: project.description || '',
        technologies: project.tech || [],
        link: project.link || '',
      })),
      selectedTemplate: templateId,
    };
  };

  const handleTemplateSelect = async (templateId, userInput = {}) => {
    const templateStyle = templateStyles[templateId];
    if (templateStyle?.premium && !hasPremiumTemplates()) {
      navigate('/pricing');
      return;
    }

    try {
      setIsRouting(true);
      setTemplate(templateId);
      setHiddenSections(templateStyle?.removedSections || []);

      const generated = await groqTemplatesService.generateTemplateContent(templateId, userInput);
      const mappedData = mapGeneratedToContextData(generated, templateId);
      updateResumeData(mappedData);

      navigate(`/builder/${templateId}`);
    } finally {
      setIsRouting(false);
    }
  };

  const openCustomizationModal = (templateId) => {
    // Check if template is premium
    const templateStyle = templateStyles[templateId];
    if (templateStyle?.premium && !hasPremiumTemplates()) {
      navigate('/pricing');
      return;
    }
    setSelectedTemplateForCustomization(templateId);
    setShowCustomizationModal(true);
  };

  const handleCustomGenerate = async (userInput) => {
    setShowCustomizationModal(false);
    await handleTemplateSelect(selectedTemplateForCustomization, userInput);
  };

  const openPreview = (templateId) => {
    setPreviewTemplate(templateId);
    document.body.style.overflow = 'hidden';
  };

  const closePreview = () => {
    setPreviewTemplate(null);
    document.body.style.overflow = 'unset';
  };

  const handleUseTemplate = (templateId) => {
    // Check if template is premium
    const templateStyle = templateStyles[templateId];
    if (templateStyle?.premium && !hasPremiumTemplates()) {
      navigate('/pricing');
      return;
    }
    openCustomizationModal(templateId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f4f0e8] via-[#fbf9f5] to-[#e8edf8]">
      {/* Navbar */}
      <Navbar />

      {/* Enhanced Header */}
      <TemplatePageHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Quick Navigation - Task-specific links */}
      <div className="glass-card border-b border-white/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#7d5f3f]/20 to-[#7d5f3f]/10 text-[#7d5f3f] px-3 py-1.5 rounded-lg text-sm font-semibold backdrop-blur-sm">
                <LayoutGrid className="h-4 w-4" />
                Step 1: Choose Template
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 hidden md:block" />
              <Link to="/analyze" className="flex items-center gap-2 bg-white/50 text-slate-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-white/80 transition-colors backdrop-blur-sm">
                <Search className="h-4 w-4" />
                Step 2: ATS Analysis
              </Link>
              <ArrowRight className="h-4 w-4 text-slate-300 hidden md:block" />
              <span className="flex items-center gap-2 bg-white/50 text-slate-500 px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm">
                <FileText className="h-4 w-4" />
                Step 3: Build Resume
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowComparison(true)}
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50 backdrop-blur-sm border border-blue-200"
              >
                <BarChart3 className="h-4 w-4" />
                Compare Templates
              </button>
              <Link to="/cover-letter" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#7d5f3f] transition-colors px-3 py-2 rounded-lg hover:bg-[#7d5f3f]/10 backdrop-blur-sm">
                <FileText className="h-4 w-4" />
                Cover Letter
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">Filter by Category</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${selectedCategory === category.id
                    ? 'bg-[#7d5f3f] text-white shadow-lg shadow-[#7d5f3f]/25'
                    : 'bg-white/90 text-slate-700 border border-[#ddd0bb] hover:border-[#7d5f3f] hover:text-[#7d5f3f] hover:shadow-md'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                resumeData={resumeData}
                onPreview={openPreview}
                onSelect={handleUseTemplate}
                isSelected={selectedTemplate === template.id}
                onSelectChange={setSelectedTemplate}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <LayoutGrid className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No templates found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 bg-gradient-to-r from-[#efe3d0] to-[#dce8fa] rounded-2xl p-8 border border-[#deccb2]">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Not sure which template to choose?</h3>
            <p className="text-slate-700 mb-6">
              <span className="font-semibold">Modern</span> templates work best for tech and creative roles.
              <span className="mx-2">•</span>
              <span className="font-semibold"> ATS</span> templates are optimized for applicant tracking systems.
              <span className="mx-2">•</span>
              <span className="font-semibold"> Professional</span> templates are ideal for corporate roles.
            </p>
            <button
              onClick={() => handleUseTemplate('modern')}
              className="inline-flex items-center gap-2 bg-[#3f5f8e] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#314f7b] transition-colors duration-200 shadow-lg shadow-[#3f5f8e]/25"
            >
              <Sparkles className="h-5 w-5" />
              Use Modern Pro Template
            </button>
          </div>
        </div>
      </div>

      {isRouting && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl px-6 py-5 shadow-2xl border border-[#eadfcf] flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-[#7d5f3f]" />
            <span className="text-sm font-semibold text-slate-700">Preparing template and opening builder...</span>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <PreviewModal
            templateId={previewTemplate}
            resumeData={resumeData}
            onClose={closePreview}
            onUse={handleUseTemplate}
          />
        )}
      </AnimatePresence>

      {/* Template Comparison Modal */}
      {showComparison && (
        <TemplateComparison onClose={() => setShowComparison(false)} />
      )}

      {/* Customization Modal */}
      <TemplateCustomizationModal
        isOpen={showCustomizationModal}
        onClose={() => setShowCustomizationModal(false)}
        onGenerate={handleCustomGenerate}
        templateName={templateStyles[selectedTemplateForCustomization]?.name || ''}
      />

      <Footer />
    </div>
  );
};

// Template Card Component
const TemplateCard = ({ template, resumeData, onPreview, onSelect, isSelected, onSelectChange }) => {
  const TemplateComponent = template.TemplateComponent;
  const [isHovered, setIsHovered] = useState(false);
  const { isPro, hasPremiumTemplates, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isLocked = template.premium && !hasPremiumTemplates();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group relative bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 ${isSelected
        ? 'border-blue-500 shadow-xl shadow-blue-500/20'
        : isLocked
          ? 'border-amber-200 hover:border-amber-300'
          : 'border-slate-200 hover:border-blue-300 hover:shadow-xl'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isLocked && onSelectChange(template.id)}
    >
      {/* Premium Badge */}
      {template.premium && (
        <div className="absolute top-3 right-3 z-10">
          <span className={`px-3 py-1 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1 ${isLocked
            ? 'bg-gradient-to-r from-amber-500 to-amber-600'
            : 'bg-gradient-to-r from-green-500 to-green-600'
            }`}>
            {isLocked ? <Lock className="h-3 w-3" /> : <Crown className="h-3 w-3" />}
            {isLocked ? 'PREMIUM' : 'UNLOCKED'}
          </span>
        </div>
      )}

      {/* Template Preview Thumbnail */}
      <div className="aspect-[3/4] bg-white relative overflow-hidden">
        {TemplateComponent && resumeData && (
          <div className={`absolute inset-0 origin-top-left scale-[0.45] md:scale-[0.48] lg:scale-[0.44] xl:scale-[0.36] ${isLocked ? 'blur-[2px]' : ''}`}>
            <TemplateComponent data={{ ...resumeData, hiddenSections: template?.removedSections || [] }} scale={1} isPreview />
          </div>
        )}

        {/* Premium Lock Overlay (always visible for locked templates) */}
        {isLocked && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center z-10">
            <div className="text-center">
              <Lock className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <p className="text-white font-bold text-sm mb-1">Premium Template</p>
              <p className="text-slate-300 text-xs mb-3">Upgrade to Pro to unlock</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/pricing');
                }}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-colors text-sm"
              >
                <Crown className="h-4 w-4" />
                Upgrade to Pro
              </button>
            </div>
          </div>
        )}

        {/* Hover Overlay (only for unlocked templates) */}
        {!isLocked && (
          <div className={`absolute inset-0 bg-slate-900/80 flex items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className="flex flex-col gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview(template.id);
                }}
                className="flex items-center gap-2 bg-white text-slate-900 font-semibold py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Eye className="h-5 w-5" />
                Full Preview
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(template.id);
                }}
                className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Sparkles className="h-5 w-5" />
                Use Template
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Template Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-slate-900">{template.name}</h3>
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
            {template.layout}
          </span>
        </div>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{template.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {template.sections.slice(0, 4).map((section, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
              {section}
            </span>
          ))}
        </div>
      </div>

      {/* Use Button */}
      <div className="px-5 pb-5 pt-0">
        {isLocked ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate('/pricing');
            }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Crown className="h-4 w-4" />
            Upgrade to Pro
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template.id);
            }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Sparkles className="h-4 w-4" />
            Use This Template
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Preview Modal Component
const PreviewModal = ({ templateId, resumeData, onClose, onUse }) => {
  const [currentTemplate, setCurrentTemplate] = useState(templateId);
  const [showUseButton, setShowUseButton] = useState(true);
  const TemplateComponent = templateComponents[currentTemplate];
  const allTemplateIds = Object.keys(templateComponents);
  const currentIndex = allTemplateIds.indexOf(currentTemplate);

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : allTemplateIds.length - 1;
    setCurrentTemplate(allTemplateIds[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < allTemplateIds.length - 1 ? currentIndex + 1 : 0;
    setCurrentTemplate(allTemplateIds[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const template = templateStyles[currentTemplate];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors z-10"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      {/* Navigation */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Modal Content */}
      <motion.div
        key={currentTemplate}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{template?.name}</h2>
            <p className="text-sm text-slate-600">{template?.description}</p>
          </div>
          <div className="flex items-center gap-2">
            {template?.premium && (
              <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full">
                PREMIUM
              </span>
            )}
            <span className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-semibold rounded-full">
              {currentIndex + 1} / {allTemplateIds.length}
            </span>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 min-h-0 overflow-auto bg-slate-100 p-8 flex justify-center">
          <div className="scale-[0.7] sm:scale-[0.75] md:scale-[0.65] lg:scale-[0.55] xl:scale-[0.45] origin-top">
            {TemplateComponent && resumeData && (
              <TemplateComponent data={{ ...resumeData, hiddenSections: template?.removedSections || [] }} scale={1} isPreview />
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t flex-shrink-0">
          <div className="flex gap-2">
            {template?.sections?.map((section, idx) => (
              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                {section}
              </span>
            ))}
          </div>
          {showUseButton && (
            <button
              onClick={() => onUse(currentTemplate)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              <Sparkles className="h-5 w-5" />
              Use This Template
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TemplatesPage;