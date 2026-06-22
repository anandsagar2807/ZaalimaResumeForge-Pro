import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  ArrowLeft,
  Download,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Loader,
  Zap,
  BarChart3,
  Sparkles,
  FileText,
  RotateCcw,
  Lightbulb,
  XCircle,
} from 'lucide-react';
import FileUpload from '../components/ai-tools/FileUpload';
import { optimizeForATS, parseResumeFile } from '../services/aiToolsService';

const ATSOptimizer = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  // ---- Helpers -----------------------------------------------------------

  const wordCount = (text) => (text.trim() ? text.trim().split(/\s+/).length : 0);

  const handleFileUpload = useCallback(async (file) => {
    setParsing(true);
    setError('');
    setFileName(file.name);
    try {
      const data = await parseResumeFile(file);
      const text = data.text || data.resumeText || '';
      if (!text.trim()) {
        setError('No readable text was found in the file. Please paste your resume manually.');
        setResumeText('');
      } else {
        setResumeText(text);
      }
    } catch (err) {
      setError('Failed to parse the file. Please paste your resume text manually.');
      setResumeText('');
    } finally {
      setParsing(false);
    }
  }, []);

  const handleOptimize = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError('Please enter both resume text and job description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await optimizeForATS(resumeText, jobDescription);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to optimize resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
    setResumeText('');
    setJobDescription('');
    setFileName('');
  };

  const handleExport = () => {
    if (!result) return;
    const lines = [];
    lines.push('ATS OPTIMIZATION REPORT');
    lines.push('========================');
    lines.push(`Generated: ${new Date().toLocaleString()}`);
    lines.push('');
    lines.push(`ATS Score: ${result.atsScore ?? 'N/A'}/100`);
    lines.push(`Compatibility: ${result.compatibility || 'N/A'}`);
    lines.push('');

    if (result.keywordHeatmap && Object.keys(result.keywordHeatmap).length) {
      lines.push('KEYWORD COVERAGE');
      lines.push('----------------');
      Object.entries(result.keywordHeatmap).forEach(([cat, d]) => {
        lines.push(`- ${cat}: ${d.percentage}% (${d.found}/${d.total})`);
      });
      lines.push('');
    }

    if (result.missingKeywords?.length) {
      lines.push('MISSING KEYWORDS');
      lines.push('----------------');
      result.missingKeywords.forEach((k) => {
        lines.push(`- ${k.keyword} [${k.importance}] -> ${k.whereToAdd}`);
      });
      lines.push('');
    }

    if (result.foundKeywords?.length) {
      lines.push('FOUND KEYWORDS');
      lines.push('--------------');
      result.foundKeywords.forEach((k) => {
        lines.push(`- ${k.keyword} (x${k.frequency})`);
      });
      lines.push('');
    }

    if (result.sectionScores && Object.keys(result.sectionScores).length) {
      lines.push('SECTION SCORES');
      lines.push('--------------');
      Object.entries(result.sectionScores).forEach(([section, s]) => {
        const score = typeof s === 'object' ? s.score : s;
        lines.push(`- ${section}: ${score}`);
      });
      lines.push('');
    }

    if (result.optimizedBullets?.length) {
      lines.push('OPTIMIZED BULLETS');
      lines.push('----------------');
      result.optimizedBullets.forEach((b, i) => {
        lines.push(`${i + 1}. ORIGINAL: ${b.original}`);
        lines.push(`   OPTIMIZED: ${b.optimized}`);
        lines.push(`   WHY: ${b.improvement}`);
        lines.push('');
      });
    }

    if (result.quickWins?.length) {
      lines.push('QUICK WINS');
      lines.push('----------');
      result.quickWins.forEach((w) => lines.push(`- ${w}`));
      lines.push('');
    }

    if (result.formatIssues?.length) {
      lines.push('FORMAT ISSUES');
      lines.push('-------------');
      result.formatIssues.forEach((f) => lines.push(`- ${f}`));
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ats-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ---- Score styling -----------------------------------------------------

  const getScoreColor = (score) => {
    if (score >= 80) return { text: 'text-green-600', bg: 'bg-green-100', stroke: '#16a34a' };
    if (score >= 60) return { text: 'text-yellow-600', bg: 'bg-yellow-100', stroke: '#ca8a04' };
    if (score >= 40) return { text: 'text-orange-600', bg: 'bg-orange-100', stroke: '#ea580c' };
    return { text: 'text-red-600', bg: 'bg-red-100', stroke: '#dc2626' };
  };

  const getCompatibilityBadge = (compatibility) => {
    const colors = {
      Excellent: 'bg-green-100 text-green-800 border-green-300',
      Good: 'bg-blue-100 text-blue-800 border-blue-300',
      Fair: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      Poor: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[compatibility] || colors.Poor;
  };

  const score = result?.atsScore ?? 0;
  const scoreStyle = getScoreColor(score);
  const RADIUS = 70;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dashOffset = CIRCUMFERENCE - (CIRCUMFERENCE * score) / 100;

  const resumeWords = useMemo(() => wordCount(resumeText), [resumeText]);
  const jdWords = useMemo(() => wordCount(jobDescription), [jobDescription]);

  const canSubmit = resumeText.trim().length > 0 && jobDescription.trim().length > 0 && !loading;

  // ---- Render ------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/ai-tools')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Back to AI tools"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">ATS Optimizer</h1>
                  <p className="text-sm text-slate-600">Optimize your resume for Applicant Tracking Systems</p>
                </div>
              </div>
            </div>
            {result && (
              <button
                onClick={handleReset}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                New Analysis
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* ---------------- Input Column ---------------- */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-700" />
                  Upload Resume
                </h2>
                {fileName && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {fileName.length > 22 ? `${fileName.slice(0, 19)}...` : fileName}
                  </span>
                )}
              </div>

              <FileUpload onFileSelect={handleFileUpload} />

              {parsing && (
                <div className="mt-3 flex items-center gap-2 text-sm text-blue-700">
                  <Loader className="w-4 h-4 animate-spin" />
                  Extracting text from file...
                </div>
              )}

              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-sm text-slate-500 font-medium">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-700">Paste Resume Text</label>
                  <span className={`text-xs font-medium ${resumeWords > 0 ? 'text-slate-500' : 'text-slate-400'}`}>
                    {resumeWords} words
                  </span>
                </div>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your complete resume here..."
                  className="w-full h-44 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-700 focus:ring-4 focus:ring-blue-700/10 transition-all resize-none text-slate-900 text-sm leading-relaxed"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-700">Job Description</label>
                  <span className={`text-xs font-medium ${jdWords > 0 ? 'text-slate-500' : 'text-slate-400'}`}>
                    {jdWords} words
                  </span>
                </div>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  className="w-full h-44 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-700 focus:ring-4 focus:ring-blue-700/10 transition-all resize-none text-slate-900 text-sm leading-relaxed"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: canSubmit ? 1.02 : 1 }}
                whileTap={{ scale: canSubmit ? 0.98 : 1 }}
                onClick={handleOptimize}
                disabled={!canSubmit}
                className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-900/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5" />
                    Optimize for ATS
                  </>
                )}
              </motion.button>

              <p className="mt-3 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Tip: the more complete your inputs, the more accurate the score.
              </p>
            </motion.div>
          </div>

          {/* ---------------- Results Column ---------------- */}
          <div>
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Score Gauge */}
                  <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
                    <div className="flex flex-col items-center">
                      <div className="relative w-44 h-44 mb-5">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                          <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth="12" />
                          <motion.circle
                            cx="80"
                            cy="80"
                            r={RADIUS}
                            fill="none"
                            stroke={scoreStyle.stroke}
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={CIRCUMFERENCE}
                            initial={{ strokeDashoffset: CIRCUMFERENCE }}
                            animate={{ strokeDashoffset: dashOffset }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className={`text-5xl font-bold ${scoreStyle.text}`}
                          >
                            {score}
                          </motion.span>
                          <span className="text-xs font-medium text-slate-400 uppercase tracking-wide mt-1">
                            out of 100
                          </span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">ATS Score</h3>
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-bold border-2 ${getCompatibilityBadge(
                          result.compatibility
                        )}`}
                      >
                        {result.compatibility || 'Unknown'} Compatibility
                      </span>
                    </div>
                  </div>

                  {/* Keyword Coverage */}
                  {result.keywordHeatmap && Object.keys(result.keywordHeatmap).length > 0 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-700" />
                        Keyword Coverage
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(result.keywordHeatmap).map(([category, data]) => (
                          <div key={category}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-slate-700 capitalize">{category}</span>
                              <span className="text-sm font-bold text-blue-700">{data.percentage}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${data.percentage}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                              />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              {data.found} of {data.total} keywords found
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section Scores */}
                  {result.sectionScores && Object.keys(result.sectionScores).length > 0 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-700" />
                        Section Scores
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(result.sectionScores).map(([section, s]) => {
                          const secScore = typeof s === 'object' ? s.score : s;
                          const sc = getScoreColor(secScore || 0);
                          return (
                            <div key={section} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-slate-600 capitalize">{section}</span>
                                <span className={`text-sm font-bold ${sc.text}`}>{secScore}</span>
                              </div>
                              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${secScore}%` }}
                                  transition={{ duration: 0.8 }}
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: sc.stroke }}
                                />
                              </div>
                              {typeof s === 'object' && s.issues?.length > 0 && (
                                <p className="text-xs text-slate-500 mt-2 line-clamp-2">{s.issues[0]}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Missing Keywords */}
                  {result.missingKeywords && result.missingKeywords.length > 0 && (
                    <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                      <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Missing Critical Keywords ({result.missingKeywords.length})
                      </h3>
                      <div className="space-y-3">
                        {result.missingKeywords.slice(0, 10).map((item, index) => (
                          <div key={index} className="p-3 bg-white rounded-lg border border-red-200">
                            <div className="flex items-start justify-between mb-2">
                              <span className="font-semibold text-slate-900">{item.keyword}</span>
                              <span
                                className={`px-2 py-1 text-xs font-bold rounded ${item.importance === 'Critical'
                                    ? 'bg-red-100 text-red-700'
                                    : item.importance === 'High'
                                      ? 'bg-orange-100 text-orange-700'
                                      : 'bg-yellow-100 text-yellow-700'
                                  }`}
                              >
                                {item.importance}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mb-1">
                              <strong>Add to:</strong> {item.whereToAdd}
                            </p>
                            <p className="text-sm text-slate-600">
                              <strong>Context:</strong> {item.context}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Found Keywords */}
                  {result.foundKeywords && result.foundKeywords.length > 0 && (
                    <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                      <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Found Keywords ({result.foundKeywords.length})
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.foundKeywords.slice(0, 20).map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-lg border border-green-300 flex items-center gap-2"
                          >
                            {item.keyword}
                            <span className="text-xs bg-green-200 px-1.5 py-0.5 rounded">x{item.frequency}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Optimized Bullets */}
                  {result.optimizedBullets && result.optimizedBullets.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-blue-700" />
                        Optimized Bullet Points
                      </h3>
                      <div className="space-y-4">
                        {result.optimizedBullets.slice(0, 5).map((bullet, index) => (
                          <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="mb-3">
                              <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Original</p>
                              <p className="text-sm text-slate-600 line-through">{bullet.original}</p>
                            </div>
                            <div className="mb-3">
                              <p className="text-xs font-semibold text-green-600 mb-1 uppercase tracking-wide">Optimized</p>
                              <p className="text-sm text-slate-900 font-medium">{bullet.optimized}</p>
                            </div>
                            {bullet.keywordsAdded && bullet.keywordsAdded.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-2">
                                {bullet.keywordsAdded.map((kw, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded"
                                  >
                                    +{kw}
                                  </span>
                                ))}
                              </div>
                            )}
                            <p className="text-xs text-slate-600">
                              <strong>Why better:</strong> {bullet.improvement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Wins */}
                  {result.quickWins && result.quickWins.length > 0 && (
                    <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                      <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Quick Wins
                      </h3>
                      <ul className="space-y-2">
                        {result.quickWins.map((win, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{win}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Format Issues */}
                  {result.formatIssues && result.formatIssues.length > 0 && (
                    <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200">
                      <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        Format Issues
                      </h3>
                      <ul className="space-y-2">
                        {result.formatIssues.map((issue, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-amber-800">
                            <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleExport}
                      className="flex-1 py-3 px-6 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Export Report
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReset}
                      className="flex-1 py-3 px-6 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      New Analysis
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-12 border-2 border-dashed border-slate-300 text-center h-full flex flex-col items-center justify-center min-h-[400px]"
                >
                  <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-5">
                    <Target className="w-10 h-10 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Optimize?</h3>
                  <p className="text-slate-600 max-w-sm mx-auto">
                    Enter your resume and job description to get an instant ATS compatibility score, keyword analysis,
                    and optimized bullet points.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                      <BarChart3 className="w-3.5 h-3.5" /> Keyword heatmap
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                      <Zap className="w-3.5 h-3.5" /> Bullet rewrites
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                      <Download className="w-3.5 h-3.5" /> Exportable report
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSOptimizer;
