import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Star, Layout, FileText, Users, Target, Zap, Award, TrendingUp, BarChart } from 'lucide-react';
import { templateData } from '../types/resumeTypes';

const TemplateComparison = ({ onClose }) => {
    const [selectedTemplates, setSelectedTemplates] = useState(['modern', 'professional']);
    const [comparisonMode, setComparisonMode] = useState('features'); // 'features', 'ats', 'design'

    const allTemplates = templateData;

    const toggleTemplate = (templateId) => {
        if (selectedTemplates.includes(templateId)) {
            if (selectedTemplates.length > 2) {
                setSelectedTemplates(selectedTemplates.filter(id => id !== templateId));
            }
        } else {
            if (selectedTemplates.length < 4) {
                setSelectedTemplates([...selectedTemplates, templateId]);
            }
        }
    };

    const comparisonData = {
        features: [
            { name: 'ATS Optimization', description: 'Passes automated tracking systems' },
            { name: 'Multi-column Layout', description: 'Multiple column design options' },
            { name: 'Skill Visualization', description: 'Visual skill bars or ratings' },
            { name: 'Icon Support', description: 'Includes icon sections' },
            { name: 'Color Customization', description: 'Custom color schemes' },
            { name: 'Responsive Design', description: 'Mobile-friendly layout' },
            { name: 'Section Dividers', description: 'Visual section separators' },
            { name: 'Typography Options', description: 'Multiple font choices' },
        ],
        ats: [
            { name: 'ATS Score', description: 'Compatibility with ATS systems' },
            { name: 'Keyword Density', description: 'Optimal keyword placement' },
            { name: 'Format Simplicity', description: 'Clean, parseable format' },
            { name: 'Section Headers', description: 'Standardized section titles' },
            { name: 'Font Compatibility', description: 'ATS-friendly fonts' },
            { name: 'Graphics Impact', description: 'Minimal graphics for parsing' },
        ],
        design: [
            { name: 'Modern Appeal', description: 'Contemporary design elements' },
            { name: 'Professional Look', description: 'Corporate appearance' },
            { name: 'Creative Flair', description: 'Artistic design elements' },
            { name: 'Visual Hierarchy', description: 'Clear information structure' },
            { name: 'White Space', description: 'Adequate spacing for readability' },
            { name: 'Color Scheme', description: 'Harmonious color palette' },
        ]
    };

    const getTemplateScore = (templateId, category) => {
        const scores = {
            'simple': { features: 7, ats: 9, design: 6 },
            'modern': { features: 9, ats: 8, design: 9 },
            'professional': { features: 8, ats: 9, design: 8 },
            'ats-friendly': { features: 6, ats: 10, design: 5 },
            'creative': { features: 8, ats: 6, design: 10 },
            'executive': { features: 9, ats: 8, design: 9 },
            'atsexecutive': { features: 9, ats: 10, design: 8 },
        };
        return scores[templateId]?.[category] || 0;
    };

    const getTemplateFeatures = (templateId) => {
        const template = allTemplates.find(t => t.id === templateId);
        return template?.features || [];
    };

    const renderComparisonRow = (item, index) => {
        return (
            <tr key={index} className="border-b border-white/20 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-sm font-medium text-stone-700">
                    <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-xs text-stone-500 mt-0.5">{item.description}</div>
                    </div>
                </td>
                {selectedTemplates.map(templateId => {
                    const template = allTemplates.find(t => t.id === templateId);
                    const hasFeature = getTemplateFeatures(templateId).some(f =>
                        f.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])
                    );
                    const score = getTemplateScore(templateId, comparisonMode);

                    return (
                        <td key={templateId} className="py-4 px-4 text-center">
                            {comparisonMode === 'features' ? (
                                <div className="flex justify-center">
                                    {hasFeature ? (
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-green-600" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                                            <X className="w-4 h-4 text-stone-400" />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="text-lg font-bold text-stone-900">{score}/10</div>
                                    <div className="w-24 h-2 bg-stone-100 rounded-full overflow-hidden mt-1">
                                        <div
                                            className={`h-full rounded-full ${score >= 8 ? 'bg-green-500' :
                                                    score >= 6 ? 'bg-amber-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${score * 10}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </td>
                    );
                })}
            </tr>
        );
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-modal rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/30 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-stone-900">Template Comparison Tool</h2>
                        <p className="text-stone-600 mt-1">Compare up to 4 templates side by side</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-stone-500" />
                    </button>
                </div>

                {/* Template Selection */}
                <div className="p-6 border-b border-white/30">
                    <h3 className="text-lg font-semibold text-stone-900 mb-4">Select Templates to Compare</h3>
                    <div className="flex flex-wrap gap-3">
                        {allTemplates.map(template => (
                            <button
                                key={template.id}
                                onClick={() => toggleTemplate(template.id)}
                                className={`px-4 py-3 rounded-xl border transition-all duration-200 flex items-center gap-3 ${selectedTemplates.includes(template.id)
                                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md'
                                        : 'bg-white/50 border-stone-200 hover:border-blue-300'
                                    }`}
                            >
                                <div className={`w-3 h-3 rounded-full ${selectedTemplates.includes(template.id) ? 'bg-blue-500' : 'bg-stone-300'
                                    }`} />
                                <div className="text-left">
                                    <div className="font-semibold text-stone-900">{template.name}</div>
                                    <div className="text-xs text-stone-500">{template.category}</div>
                                </div>
                                {selectedTemplates.includes(template.id) && (
                                    <Check className="w-4 h-4 text-blue-500 ml-2" />
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 text-sm text-stone-500 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Select 2-4 templates to compare features, ATS compatibility, and design
                    </div>
                </div>

                {/* Comparison Mode Selection */}
                <div className="p-6 border-b border-white/30">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-semibold text-stone-900">Comparison Mode</h3>
                        <div className="flex gap-2">
                            {[
                                { id: 'features', label: 'Features', icon: Layout },
                                { id: 'ats', label: 'ATS', icon: FileText },
                                { id: 'design', label: 'Design', icon: Star },
                            ].map(mode => (
                                <button
                                    key={mode.id}
                                    onClick={() => setComparisonMode(mode.id)}
                                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${comparisonMode === mode.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                        }`}
                                >
                                    <mode.icon className="w-4 h-4" />
                                    {mode.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="overflow-auto max-h-[400px]">
                    <table className="w-full">
                        <thead className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
                            <tr className="border-b border-white/30">
                                <th className="py-4 px-4 text-left text-sm font-semibold text-stone-900">
                                    {comparisonMode === 'features' ? 'Feature' :
                                        comparisonMode === 'ats' ? 'ATS Criteria' : 'Design Aspect'}
                                </th>
                                {selectedTemplates.map(templateId => {
                                    const template = allTemplates.find(t => t.id === templateId);
                                    return (
                                        <th key={templateId} className="py-4 px-4 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="font-bold text-stone-900">{template?.name}</div>
                                                <div className="text-xs text-stone-500 mt-1">{template?.category}</div>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData[comparisonMode].map((item, index) => renderComparisonRow(item, index))}
                        </tbody>
                    </table>
                </div>

                {/* Summary & Recommendations */}
                <div className="p-6 border-t border-white/30">
                    <h3 className="text-lg font-semibold text-stone-900 mb-4">AI Recommendations</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="glass-card p-4 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-5 h-5 text-blue-500" />
                                <h4 className="font-semibold text-stone-900">Best for ATS</h4>
                            </div>
                            <p className="text-sm text-stone-600">
                                {selectedTemplates.includes('ats-friendly')
                                    ? 'ATS Optimized template has the highest ATS compatibility'
                                    : 'Professional template offers strong ATS performance'}
                            </p>
                        </div>
                        <div className="glass-card p-4 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="w-5 h-5 text-amber-500" />
                                <h4 className="font-semibold text-stone-900">Best Design</h4>
                            </div>
                            <p className="text-sm text-stone-600">
                                {selectedTemplates.includes('creative')
                                    ? 'Creative template offers the most visually appealing design'
                                    : 'Modern template provides contemporary aesthetics'}
                            </p>
                        </div>
                        <div className="glass-card p-4 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                <h4 className="font-semibold text-stone-900">Overall Winner</h4>
                            </div>
                            <p className="text-sm text-stone-600">
                                Based on your selection, {selectedTemplates.includes('modern') ? 'Modern' : 'Professional'} template offers the best balance of features
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/30 flex items-center justify-between">
                    <div className="text-sm text-stone-500">
                        <BarChart className="w-4 h-4 inline mr-2" />
                        Comparing {selectedTemplates.length} templates across {comparisonData[comparisonMode].length} criteria
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => {
                                // In a real app, this would navigate to builder with selected template
                                onClose();
                            }}
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                        >
                            Use Recommended Template
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TemplateComparison;