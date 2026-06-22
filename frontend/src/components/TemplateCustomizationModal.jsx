import React, { useState } from 'react';
import { X, Sparkles, Briefcase, Building2, Award, Loader2 } from 'lucide-react';

const TemplateCustomizationModal = ({ isOpen, onClose, onGenerate, templateName }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    industry: '',
    experience: '5-8 years'
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      await onGenerate(formData);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSkip = () => {
    onGenerate({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#7d5f3f] to-[#5f4a32] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6" />
            <div>
              <h2 className="text-xl font-bold">Customize Your Resume</h2>
              <p className="text-sm text-white/80">Tell us about your career goals</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">AI-Powered Generation</p>
              <p className="text-blue-700">
                Our AI will create a professional resume tailored to your specifications using the <strong>{templateName}</strong> template.
              </p>
            </div>
          </div>

          {/* Job Title */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Briefcase className="h-4 w-4 text-[#7d5f3f]" />
              Job Title / Position
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g., Senior Software Engineer, Marketing Manager"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#7d5f3f] focus:border-transparent"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Building2 className="h-4 w-4 text-[#7d5f3f]" />
              Industry
            </label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="e.g., Technology, Healthcare, Finance"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#7d5f3f] focus:border-transparent"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Award className="h-4 w-4 text-[#7d5f3f]" />
              Experience Level
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#7d5f3f] focus:border-transparent"
            >
              <option value="0-2 years">Entry Level (0-2 years)</option>
              <option value="3-5 years">Mid Level (3-5 years)</option>
              <option value="5-8 years">Senior Level (5-8 years)</option>
              <option value="8-12 years">Lead Level (8-12 years)</option>
              <option value="12+ years">Executive Level (12+ years)</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#7d5f3f] to-[#5f4a32] text-white font-semibold py-3 px-6 rounded-xl hover:from-[#6d4f2f] hover:to-[#4f3a22] transition-all duration-200 shadow-lg shadow-[#7d5f3f]/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Resume
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleSkip}
              disabled={isGenerating}
              className="px-6 py-3 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Use Default
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateCustomizationModal;
