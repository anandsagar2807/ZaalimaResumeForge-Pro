import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const ATSScoreChecker = () => {
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeATS = async () => {
    if (!resumeText || !jdText) {
      alert('Please provide both resume and job description');
      return;
    }

    setLoading(true);
    try {
      // Use the env-configured API base. Normalize so it always ends with /api
      // (the Express server mounts routes under /api/*), regardless of whether
      // VITE_API_URL includes the /api suffix or just the origin.
      const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const API_URL = rawApiUrl.replace(/\/$/, '').endsWith('/api')
        ? rawApiUrl.replace(/\/$/, '')
        : `${rawApiUrl.replace(/\/$/, '')}/api`;
      const response = await fetch(`${API_URL}/ai/ats-score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jdText }),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('ATS analysis failed:', error);
      alert('Failed to analyze. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-dark mb-3">ATS Score Checker</h2>
        <p className="text-stone-600">Analyze how well your resume matches the job description</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card p-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
            <FileText size={18} className="text-primary" />
            Your Resume
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            className="input-field min-h-[300px] resize-none"
          />
        </div>

        <div className="card p-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
            <Target size={18} className="text-accent" />
            Job Description
          </label>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the job description here..."
            className="input-field min-h-[300px] resize-none"
          />
        </div>
      </div>

      <div className="text-center mb-8">
        <button
          onClick={analyzeATS}
          disabled={loading}
          className="btn-primary px-8 py-3 text-base"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Analyzing...
            </>
          ) : (
            <>
              <TrendingUp size={20} />
              Analyze ATS Score
            </>
          )}
        </button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Score Card */}
          <div className={`card p-8 text-center border-2 ${getScoreBg(result.score)}`}>
            <div className="mb-4">
              <div className={`text-6xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}%
              </div>
              <p className="text-stone-600 mt-2">ATS Compatibility Score</p>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${result.score >= 80 ? 'bg-green-500' : result.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                style={{ width: `${result.score}%` }}
              />
            </div>
          </div>

          {/* Section Scores */}
          {result.sectionScores && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-dark mb-4">Section Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(result.sectionScores).map(([section, score]) => (
                  <div key={section} className="text-center p-4 bg-stone-50 rounded-lg">
                    <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}%</div>
                    <div className="text-sm text-stone-600 capitalize mt-1">{section}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keywords Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-dark mb-4">
                <CheckCircle className="text-green-600" size={20} />
                Found Keywords ({result.foundKeywords?.length || 0})
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.foundKeywords?.map((keyword, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-dark mb-4">
                <AlertCircle className="text-red-600" size={20} />
                Missing Keywords ({result.missingKeywords?.length || 0})
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords?.map((keyword, idx) => (
                  <span key={idx} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm border border-red-200">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {result.suggestions && result.suggestions.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-dark mb-4">Improvement Suggestions</h3>
              <ul className="space-y-3">
                {result.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary-50 text-primary flex items-center justify-center text-sm font-semibold">
                      {idx + 1}
                    </div>
                    <p className="text-stone-700">{suggestion}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Strengths & Weaknesses */}
          <div className="grid md:grid-cols-2 gap-6">
            {result.strengths && result.strengths.length > 0 && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-green-700 mb-4">Strengths</h3>
                <ul className="space-y-2">
                  {result.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-stone-700">
                      <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.weaknesses && result.weaknesses.length > 0 && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-red-700 mb-4">Areas to Improve</h3>
                <ul className="space-y-2">
                  {result.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-stone-700">
                      <AlertCircle size={16} className="text-red-600 mt-1 flex-shrink-0" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ATSScoreChecker;
