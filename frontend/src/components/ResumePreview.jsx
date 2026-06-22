import React from 'react';
import { useResume } from '../context/ResumeContext';
import {
  CampusPlacementTemplate, MinimalistTemplate, ModernTemplate, ProfessionalTemplate, CreativeTemplate,
  CompactTemplate, ExecutiveTemplate, ATSTemplate, TechTemplate, DevResumeTemplate,
  FAANGTemplate, SVEngineerTemplate, ServiceEngineerTemplate, EliteEngineerTemplate,
  ATSExecutiveTemplate, KoushikTemplate
} from './templates';

// ─────────────────────────────────────────────────────────────────────────────
// Template component registry — lowercase IDs matching groqTemplates.js
// ─────────────────────────────────────────────────────────────────────────────
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
  koushik: KoushikTemplate,
};

// ─────────────────────────────────────────────────────────────────────────────
// Data-shape classification
//
// Group A templates destructure skills as an OBJECT: { technical: [], soft: [] }
//   → modern, professional, minimalist, creative, compact, executive, ats, tech, atsexecutive
//
// Group B templates read skills as an ARRAY of { category, items }
//   → campusplacement, svengineer, serviceengineer, eliteengineer, devresume, faang, koushik
//
// Within Group B, DevResume is the sole outlier: it expects `items` as an ARRAY
// (cat.items?.join(', ')), while every other Group B template expects `items` as
// a STRING (skill.items || skill.name).
// ─────────────────────────────────────────────────────────────────────────────
const GROUP_B_TEMPLATES = new Set([
  'campusplacement', 'svengineer', 'serviceengineer', 'eliteengineer',
  'devresume', 'faang', 'koushik',
]);

const ARRAY_ITEMS_TEMPLATES = new Set(['devresume']);

// ─────────────────────────────────────────────────────────────────────────────
// Data adapter: ResumeContext shape  →  Templates shape
//
// This is the reverse of TemplatesPage.mapGeneratedToContextData.
// ResumeContext stores:
//   personalInfo: { fullName, email, phone, location, linkedin, github, portfolio, summary }
//   education:    [{ id, institution, degree, field, startDate, endDate, gpa, description }]
//   experience:   [{ id, company, position, location, startDate, endDate, description }]
//   skills:        [{ id, name, category, level }]          ← flat array
//   projects:     [{ id, name, description, technologies[], link }]
//
// Templates expect (Group A):
//   personalInfo: { name, title, email, phone, location, linkedin, website }
//   summary:       '…'                                       ← top-level string
//   education:    [{ school, degree, field, year }]
//   experience:   [{ company, title, startDate, endDate, location, achievements[] }]
//   skills:        { technical: [], soft: [] }               ← object with two arrays
//   projects:     [{ name, description, tech[], link }]
//
// Templates expect (Group B):
//   personalInfo: { fullName, email, phone, location, linkedin, github }
//   education:    [{ institution, degree, field, endDate, gpa }]   ← already matches!
//   experience:   [{ company, role, startDate, endDate, location, achievements[] }]
//   skills:        [{ category, items }]                     ← items is STRING (or ARRAY for DevResume)
//   projects:     [{ name, achievements[], techStack }]      ← techStack is STRING
//
// The adapter produces a superset object containing BOTH naming conventions so that
// every template can read whichever fields it needs.
// ─────────────────────────────────────────────────────────────────────────────
const adaptContextToTemplateData = (resumeData, templateId) => {
  const {
    personalInfo: p = {},
    education: edu = [],
    experience: exp = [],
    skills: ctxSkills = [],
    projects: proj = [],
  } = resumeData || {};

  const isGroupB = GROUP_B_TEMPLATES.has(templateId);
  const isGroupA = !isGroupB; // default — matches ModernTemplate fallback
  const itemsAsArray = ARRAY_ITEMS_TEMPLATES.has(templateId);

  // ── Personal Info ──
  // Group A reads personalInfo.name; Group B reads personalInfo.fullName.
  // Provide both so any template finds the name.
  const personalInfo = {
    name: p.fullName || '',
    fullName: p.fullName || '',
    title: p.title || '',
    role: p.title || p.role || '',
    email: p.email || '',
    phone: p.phone || '',
    location: p.location || '',
    address: p.location || '',
    linkedin: p.linkedin || '',
    github: p.github || '',
    website: p.portfolio || p.github || '',
    portfolio: p.portfolio || '',
    summary: p.summary || '',
  };

  // ── Summary (top-level, used by Group A templates) ──
  const summary = p.summary || '';

  // ── Education ──
  // Group A reads edu.school / edu.year; Group B reads edu.institution / edu.endDate.
  // Provide both field names.
  const education = edu.map((e) => ({
    id: e.id,
    school: e.institution || '',
    institution: e.institution || '',
    degree: e.degree || '',
    field: e.field || '',
    year: e.endDate || '',
    endDate: e.endDate || '',
    startDate: e.startDate || '',
    gpa: e.gpa || '',
    description: e.description || '',
  }));

  // ── Experience ──
  // Group A reads exp.title; Group B reads exp.role.
  // ResumeContext has exp.position and exp.description (multi-line string).
  // Convert description → achievements[] by splitting on newlines (strict hierarchy:
  // each line becomes its own bullet nested under the job sub-heading).
  const experience = exp.map((x) => {
    const achievements = x.description
      ? String(x.description)
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
      : [];

    return {
      id: x.id,
      company: x.company || '',
      title: x.position || '',
      role: x.position || '',
      position: x.position || '',
      location: x.location || '',
      startDate: x.startDate || '',
      endDate: x.endDate || '',
      achievements,
      description: x.description || '',
    };
  });

  // ── Skills ──
  // ResumeContext: flat array of { id, name, category, level }
  // Group A: object { technical: [], soft: [] }
  // Group B: array of { category, items } — items is STRING (or ARRAY for DevResume)
  let skills;
  if (isGroupA) {
    const technical = [];
    const soft = [];
    ctxSkills.forEach((s) => {
      const cat = (s.category || '').toLowerCase();
      if (cat === 'soft' || cat === 'soft skills') {
        soft.push(s.name);
      } else {
        technical.push(s.name);
      }
    });
    skills = { technical, soft };
  } else {
    // Group B — group skill names by category
    const categoryMap = new Map();
    ctxSkills.forEach((s) => {
      const category = s.category || 'Skills';
      if (!categoryMap.has(category)) categoryMap.set(category, []);
      categoryMap.get(category).push(s.name);
    });
    skills = Array.from(categoryMap.entries()).map(([category, names]) => ({
      category,
      items: itemsAsArray ? names : names.join(', '),
    }));
  }

  // ── Projects ──
  // Group A reads project.tech (array); Group B reads project.techStack (string) +
  // project.achievements[]; DevResume reads project.technologies (array).
  // ResumeContext has project.technologies (array) and project.description (string).
  // Convert description → achievements[] (each line a separate bullet under the
  // project sub-heading — strict structural hierarchy).
  const projects = proj.map((pr) => {
    const projectAchievements = pr.description
      ? String(pr.description)
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
      : [];

    return {
      id: pr.id,
      name: pr.name || '',
      description: pr.description || '',
      achievements: projectAchievements,
      tech: pr.technologies || [],
      technologies: pr.technologies || [],
      techStack: Array.isArray(pr.technologies) ? pr.technologies.join(', ') : '',
      link: pr.link || '',
    };
  });

  return {
    personalInfo,
    summary,
    education,
    experience,
    skills,
    projects,
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// ResumePreview — renders the SAME dedicated template component used by the
// TemplatesPage full-page preview, guaranteeing the inline live preview is
// visually identical to the final exported output.
// ─────────────────────────────────────────────────────────────────────────────
const ResumePreview = () => {
  const { resumeData, selectedTemplate, hiddenSections } = useResume();

  const templateId = (selectedTemplate || 'modern').toLowerCase();
  const TemplateComponent = templateComponents[templateId] || ModernTemplate;
  const adaptedData = adaptContextToTemplateData(resumeData, templateId);
  const dataWithHidden = { ...adaptedData, hiddenSections: hiddenSections || [] };

  return <TemplateComponent data={dataWithHidden} scale={1} isPreview />;
};

export default ResumePreview;
