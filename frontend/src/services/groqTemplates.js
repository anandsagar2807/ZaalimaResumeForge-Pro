const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const templateStyles = {
  campusplacement: {
    id: 'campusplacement',
    name: 'Campus Placement',
    category: 'Fresher',
    premium: false,
    description: 'ATS-optimized resume template designed for service-based company placements like TCS, Infosys, Wipro, Cognizant, Accenture, Capgemini, Deloitte, HCL, Tech Mahindra, LTIMindtree, and IBM',
    layout: 'single-column',
    sections: ['header', 'education', 'skills', 'internships', 'projects', 'certifications', 'achievements', 'codingProfiles', 'extraCurricular'],
    removedSections: []
  },
  minimalist: {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'Simple',
    premium: false,
    description: 'Clean, distraction-free design that puts your content first',
    layout: 'single-column',
    sections: ['header', 'summary', 'experience', 'education', 'skills'],
    removedSections: []
  },
  modern: {
    id: 'modern',
    name: 'Modern Pro',
    category: 'Modern',
    premium: false,
    description: 'Contemporary two-column layout with sidebar for skills',
    layout: 'two-column-left',
    sections: ['header', 'summary', 'skills', 'experience', 'education'],
    removedSections: []
  },
  professional: {
    id: 'professional',
    name: 'Corporate Elite',
    category: 'Professional',
    premium: true,
    description: 'Traditional corporate styling with refined typography',
    layout: 'single-column-header',
    sections: ['header', 'summary', 'experience', 'skills', 'education'],
    removedSections: []
  },
  creative: {
    id: 'creative',
    name: 'Creative Flow',
    category: 'Creative',
    premium: true,
    description: 'Bold colors and modern design for creative professionals',
    layout: 'two-column-right',
    sections: ['header', 'summary', 'experience', 'skills', 'projects'],
    removedSections: []
  },
  compact: {
    id: 'compact',
    name: 'Space Saver',
    category: 'Compact',
    premium: false,
    description: 'Maximize information density without sacrificing readability',
    layout: 'compact-single',
    sections: ['header', 'summary', 'experience', 'skills', 'education'],
    removedSections: []
  },
  executive: {
    id: 'executive',
    name: 'Executive Suite',
    category: 'Executive',
    premium: true,
    description: 'Premium dark theme for senior leadership positions',
    layout: 'executive-dark',
    sections: ['header', 'summary', 'achievements', 'experience', 'education'],
    removedSections: []
  },
  ats: {
    id: 'ats',
    name: 'ATS Optimizer',
    category: 'ATS Friendly',
    premium: false,
    description: 'Plain text format optimized for all applicant tracking systems',
    layout: 'ats-plain',
    sections: ['header', 'summary', 'skills', 'experience', 'education'],
    removedSections: []
  },
  tech: {
    id: 'tech',
    name: 'Tech Lead',
    category: 'Technical',
    premium: true,
    description: 'Developer-focused layout with tech stack emphasis',
    layout: 'tech-stack',
    sections: ['header', 'summary', 'skills', 'experience', 'projects', 'education'],
    removedSections: []
  },
  devresume: {
    id: 'devresume',
    name: 'Dev Resume',
    category: 'Developer',
    premium: false,
    description: 'Modern ATS-friendly single-page developer resume with clean typography and section hierarchy',
    layout: 'single-column',
    sections: ['header', 'education', 'skills', 'internships', 'projects', 'certifications', 'codingProfiles', 'hackathons'],
    removedSections: []
  },
  faang: {
    id: 'faang',
    name: 'FAANG Elite',
    category: 'Premium',
    premium: true,
    description: 'Ultra-premium ATS-optimized software engineer resume inspired by FAANG candidates — luxury minimalism with sharp typography hierarchy',
    layout: 'single-column',
    sections: ['header', 'education', 'skills', 'experience', 'projects', 'certifications', 'achievements', 'codingProfiles', 'hackathons'],
    removedSections: []
  },
  svengineer: {
    id: 'svengineer',
    name: 'SV Engineer',
    category: 'Premium',
    premium: true,
    description: 'World-class Silicon Valley senior engineer resume — luxurious minimalist design with recruiter-focused layout, open source & leadership sections',
    layout: 'single-column',
    sections: ['header', 'education', 'skills', 'experience', 'projects', 'openSource', 'certifications', 'competitiveProgramming', 'leadership'],
    removedSections: []
  },
  serviceengineer: {
    id: 'serviceengineer',
    name: 'Service Engineer Pro',
    category: 'ATS Friendly',
    premium: false,
    description: 'Ultra-professional ATS-friendly software engineer resume optimized for service-based company recruiters (TCS, Infosys, Accenture, Deloitte, Cognizant, Capgemini) and campus placement shortlisting',
    layout: 'single-column',
    sections: ['header', 'education', 'skills', 'internships', 'projects', 'certifications', 'codingProfiles', 'achievements', 'extraCurricular'],
    removedSections: []
  },
  eliteengineer: {
    id: 'eliteengineer',
    name: 'Elite Engineer',
    category: 'Premium',
    premium: true,
    description: 'World-class premium software engineer resume with executive-level professionalism — luxury minimalism, Swiss-style alignment, FAANG resume formatting, recruiter-trusted design',
    layout: 'single-column',
    sections: ['header', 'profile', 'education', 'skills', 'experience', 'projects', 'certifications', 'codingProfiles', 'leadership'],
    removedSections: []
  },
  atsexecutive: {
    id: 'atsexecutive',
    name: 'ATS Executive',
    category: 'Executive',
    premium: true,
    description: 'Premium ATS-friendly executive resume with bold UPPERCASE section headings, thin horizontal dividers, clean serif typography — designed to pass every ATS while looking FAANG-level professional',
    layout: 'single-column',
    sections: ['header', 'summary', 'experience', 'achievements', 'skills', 'education', 'certifications', 'projects'],
    removedSections: []
  },
  koushik: {
    id: 'koushik',
    name: 'Student Developer',
    category: 'Fresher',
    premium: false,
    description: 'Clean single-column template for CS students with internships, projects, certifications, coding profiles, and hackathons. Section-divider style.',
    layout: 'single-column',
    sections: ['header', 'education', 'skills', 'internships', 'projects', 'certifications', 'codingProfiles', 'hackathons'],
    removedSections: []
  }
};

const defaultResumeData = {
  personalInfo: {
    name: 'Alexandra Chen',
    title: 'Senior Product Manager',
    email: 'alex.chen@email.com',
    phone: '(415) 555-0199',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexchen',
    website: 'alexchen.dev'
  },
  summary: 'Product leader with 8+ years of experience scaling B2B SaaS products from seed to Series C. Track record of launching products used by 500K+ users and driving 3x revenue growth.',
  experience: [
    {
      company: 'Linear',
      title: 'Senior Product Manager',
      startDate: '2022',
      endDate: 'Present',
      location: 'San Francisco, CA',
      achievements: [
        'Led product vision for $25M ARR expansion, increasing user retention by 45%',
        'Launched 3 major platform features resulting in 60% NPS improvement',
        'Spearheaded cross-functional team of 12 engineers and designers'
      ]
    },
    {
      company: 'Stripe',
      title: 'Product Manager',
      startDate: '2019',
      endDate: '2022',
      location: 'San Francisco, CA',
      achievements: [
        'Managed developer tools platform serving 200K+ active integrations',
        'Improved conversion rate by 30% through A/B testing and UX optimization',
        'Reduced customer support tickets by 40% with self-service features'
      ]
    },
    {
      company: 'Google',
      title: 'Associate Product Manager',
      startDate: '2017',
      endDate: '2019',
      location: 'Mountain View, CA',
      achievements: [
        'Launched G Suite collaboration features used by 2M+ enterprise users',
        'Collaborated with AI team to integrate smart features in Docs and Sheets'
      ]
    }
  ],
  skills: {
    technical: ['Product Strategy', 'Agile/Scrum', 'SQL', 'Figma', 'Mixpanel', 'A/B Testing'],
    soft: ['Strategic Planning', 'Cross-functional Leadership', 'Stakeholder Management', 'User Research']
  },
  education: [
    {
      school: 'Stanford Graduate School of Business',
      degree: 'MBA',
      field: 'Product Management',
      year: '2017'
    },
    {
      school: 'UC Berkeley',
      degree: 'BS',
      field: 'Computer Science',
      year: '2015'
    }
  ],
  projects: [
    {
      name: 'AI Resume Analyzer',
      description: 'Built an AI-powered tool that scans resumes and provides ATS scoring',
      tech: ['React', 'Python', 'OpenAI API'],
      link: 'github.com/alexchen/ai-resume'
    }
  ],
  achievements: [
    'Forbes 30 Under 30 - Technology Category 2024',
    'Patent holder for real-time collaboration feature',
    'Speaker at Product Management Summit 2023'
  ]
};

export const groqTemplatesService = {
  async generateTemplateContent(templateId, userInput = {}) {
    if (!GROQ_API_KEY) {
      console.log('Using default resume data (no Groq API key configured)');
      return defaultResumeData;
    }

    const template = templateStyles[templateId];
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    // Build custom prompt from user input
    const jobTitle = userInput.jobTitle || 'Senior Professional';
    const industry = userInput.industry || 'Technology';
    const experience = userInput.experience || '5-8 years';
    const skills = userInput.skills || '';
    const customRequirements = userInput.customRequirements || '';

    const systemPrompt = `You are a professional resume writer. Generate realistic, ATS-friendly resume content for a ${template.name} template.

Template Style: ${template.description}
Layout: ${template.layout}
Sections: ${template.sections.join(', ')}

User Requirements:
- Job Title: ${jobTitle}
- Industry: ${industry}
- Experience Level: ${experience}
${skills ? `- Key Skills: ${skills}` : ''}
${customRequirements ? `- Additional Requirements: ${customRequirements}` : ''}

Return valid JSON with the following structure:
{
  "personalInfo": { "name", "title", "email", "phone", "location", "linkedin", "website" },
  "summary": "2-3 sentence professional summary tailored to the job title and industry",
  "experience": [{ "company", "title", "startDate", "endDate", "location", "achievements": [] }],
  "skills": { "technical": [], "soft": [] },
  "education": [{ "school", "degree", "field", "year" }],
  "projects": [{ "name", "description", "tech": [], "link" }],
  "achievements": []
}

Make the content realistic and specific to the ${jobTitle} role in ${industry}.`;

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Generate a complete resume for a ${jobTitle} position in the ${industry} industry with ${experience} of experience.` }
          ],
          temperature: 0.7,
          max_tokens: 2500
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (content) {
        try {
          return JSON.parse(content);
        } catch (parseError) {
          console.error('Failed to parse Groq response:', parseError);
          return defaultResumeData;
        }
      }

      return defaultResumeData;
    } catch (error) {
      console.error('Groq API error:', error);
      return defaultResumeData;
    }
  },

  async generateMultipleTemplates() {
    const templates = Object.values(templateStyles);
    const results = await Promise.all(
      templates.map(async (template) => ({
        ...template,
        data: await this.generateTemplateContent(template.id)
      }))
    );
    return results;
  },

  getTemplateById(id) {
    return templateStyles[id] || null;
  },

  getAllTemplates() {
    return Object.values(templateStyles);
  },

  getDefaultData() {
    return defaultResumeData;
  }
};

export default groqTemplatesService;
