import React from 'react';

const DevResumeTemplate = ({ data, scale = 1, isPreview = false }) => {
  const {
    personalInfo,
    education,
    skills,
    experience,
    projects
  } = data || {};

  // ── Dummy / fallback data ──
  const name = personalInfo?.fullName || 'Arjun Dev Sharma';
  const email = personalInfo?.email || 'arjundev@gmail.com';
  const phone = personalInfo?.phone || '+91-9876543210';
  const linkedin = personalInfo?.linkedin || 'linkedin.com/in/arjundev';
  const github = personalInfo?.github || personalInfo?.website || 'github.com/arjundev';

  const educationData = education?.length > 0 ? education : [
    {
      institution: 'National Institute of Technology, Hyderabad',
      degree: 'Bachelor of Technology',
      field: 'Computer Science and Engineering',
      gpa: '8.91/10.00',
      startDate: 'Aug 2023',
      endDate: 'May 2027'
    },
    {
      institution: 'Delhi Public School, Hyderabad',
      degree: 'Intermediate (Class XII)',
      field: 'Science (PCM with Computer Science)',
      gpa: '95.2%',
      startDate: 'Apr 2021',
      endDate: 'Mar 2023'
    }
  ];

  const skillsData = skills?.length > 0 ? skills : [
    { category: 'Programming Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++'] },
    { category: 'Frontend', items: ['React.js', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'Flask', 'Spring Boot'] },
    { category: 'Database', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
    { category: 'Tools & Platforms', items: ['Git', 'Docker', 'AWS', 'Firebase', 'VS Code'] }
  ];

  const internshipsData = experience?.length > 0 ? experience : [
    {
      company: 'TechNova Solutions',
      location: 'Bangalore, India',
      position: 'Software Development Intern',
      startDate: 'May 2025',
      endDate: 'Jul 2025',
      achievements: [
        'Built scalable frontend interfaces using React and TypeScript, improving page load speed by 40%.',
        'Integrated REST APIs and optimized application performance through lazy loading and code splitting.'
      ]
    },
    {
      company: 'CloudMatrix Labs',
      location: 'Hyderabad, India',
      position: 'Full Stack Development Intern',
      startDate: 'Dec 2024',
      endDate: 'Feb 2025',
      achievements: [
        'Developed backend APIs using Node.js and Express, handling 10K+ daily requests with < 200ms latency.',
        'Collaborated with cross-functional teams using Git-based workflows and CI/CD pipelines.'
      ]
    }
  ];

  const projectsData = projects?.length > 0 ? projects : [
    {
      name: 'AI-Powered Interview Platform',
      description: 'A scalable full-stack platform enabling AI-driven mock interviews with real-time feedback, analytics dashboards, and video integration.',
      achievements: [
        'Developed a scalable full-stack platform supporting AI-driven workflows and real-time analytics for 5K+ users.',
        'Implemented JWT authentication, role-based dashboards, Stripe API integrations, and optimized backend query performance by 60%.'
      ],
      technologies: ['React.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
      name: 'Smart Expense Analytics Dashboard',
      description: 'An intelligent expense tracking and analytics dashboard with ML-powered categorization, trend forecasting, and interactive visualizations.',
      achievements: [
        'Built an interactive analytics dashboard with D3.js visualizations and ML-powered expense categorization achieving 92% accuracy.',
        'Designed RESTful APIs with Flask, integrated PostgreSQL with optimized indexing, and deployed on AWS with Docker containerization.'
      ],
      technologies: ['React.js', 'D3.js', 'Flask', 'PostgreSQL', 'Docker', 'AWS']
    },
    {
      name: 'DevTrack – Project Management System',
      description: 'A Kanban-style project management tool with real-time collaboration, sprint tracking, automated CI/CD hooks, and team analytics.',
      achievements: [
        'Engineered a real-time collaborative project management tool with WebSocket sync and Kanban drag-and-drop interface.',
        'Integrated GitHub webhooks for automated CI/CD triggers and built team productivity analytics with customizable sprint reports.'
      ],
      technologies: ['Next.js', 'Node.js', 'Socket.io', 'MongoDB', 'GitHub API']
    }
  ];

  const certificationsData = data?.certifications || [
    'AWS Certified Cloud Practitioner – Amazon Web Services',
    'Machine Learning Specialization – Coursera (Stanford)',
    'Problem Solving (Gold Badge) – HackerRank',
    'Data Structures & Algorithms – GeeksforGeeks'
  ];

  const codingProfilesData = data?.codingProfiles || [
    { platform: 'LeetCode', stats: '450+ problems solved | Rating: 1850 | Top 5%' },
    { platform: 'HackerRank', stats: 'Gold Badge in Problem Solving | 5★ in Java & Python' },
    { platform: 'CodeChef', stats: '3★ Rating (1800+) | 200+ problems solved' },
    { platform: 'GeeksforGeeks', stats: 'Institution Rank #12 | 300+ articles & problems' }
  ];

  const hackathonsData = data?.hackathons || [
    { name: 'Smart India Hackathon 2025', description: 'Built an AI-driven rural healthcare portal; selected among top 10 national finalists from 12K+ teams.' },
    { name: 'Google DevFest Hackathon 2024', description: 'Developed a real-time accessibility audit tool for web apps using TensorFlow.js; won Best Innovation Award.' },
    { name: 'IIT Hyderabad CodeStorm 2024', description: 'Created a distributed task orchestration system with real-time monitoring; finished 2nd overall.' }
  ];

  // ── Styles ──
  const page = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: '210mm',
    minHeight: '297mm',
    maxHeight: '297mm',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: '"Inter", "Calibri", "Helvetica Neue", Arial, sans-serif',
    fontSize: '9.5px',
    lineHeight: '1.35',
    padding: '28px 32px 20px 32px',
    overflow: 'hidden',
    boxSizing: 'border-box'
  };

  const nameStyle = {
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '-0.3px',
    color: '#111111',
    lineHeight: '1.1',
    marginBottom: '4px',
    textAlign: 'center'
  };

  const contactRow = {
    fontSize: '8.5px',
    color: '#444444',
    marginBottom: '14px',
    lineHeight: '1.4',
    textAlign: 'center'
  };

  const contactLink = {
    color: '#444444',
    textDecoration: 'none'
  };

  const sectionTitle = {
    fontSize: '10.5px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    color: '#111111',
    borderBottom: '1px solid #cccccc',
    paddingBottom: '2px',
    marginBottom: '6px',
    marginTop: '0'
  };

  const sectionWrap = {
    marginBottom: '10px'
  };

  const dividerStyle = {
    borderBottom: '1px solid #cccccc',
    marginTop: '8px',
    marginBottom: '8px',
    width: '100%'
  };

  const eduRow = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '1px'
  };

  const eduLeft = {
    fontWeight: '600',
    fontSize: '9.5px',
    color: '#111111'
  };

  const eduRight = {
    fontSize: '8.5px',
    color: '#666666',
    textAlign: 'right',
    flexShrink: 0
  };

  const eduDetail = {
    fontSize: '9px',
    color: '#333333',
    marginBottom: '6px'
  };

  const skillCategory = {
    fontSize: '9px',
    marginBottom: '2px',
    lineHeight: '1.4'
  };

  const skillLabel = {
    fontWeight: '600',
    color: '#111111'
  };

  const skillItems = {
    color: '#333333'
  };

  const internshipHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '1px'
  };

  const internshipTitle = {
    fontWeight: '600',
    fontSize: '9.5px',
    color: '#111111'
  };

  const internshipDate = {
    fontSize: '8.5px',
    color: '#666666',
    textAlign: 'right',
    flexShrink: 0
  };

  const internshipCompany = {
    fontSize: '9px',
    color: '#444444',
    marginBottom: '2px'
  };

  const bullet = {
    fontSize: '9px',
    color: '#333333',
    paddingLeft: '12px',
    marginBottom: '1px',
    lineHeight: '1.35',
    position: 'relative'
  };

  const bulletDot = {
    position: 'absolute',
    left: '0',
    top: '0',
    color: '#666666',
    fontSize: '9px'
  };

  const projectHeader = {
    fontWeight: '700',
    fontSize: '9.5px',
    color: '#111111',
    marginBottom: '1px'
  };

  const projectDesc = {
    fontSize: '8.5px',
    color: '#555555',
    marginBottom: '2px',
    fontStyle: 'italic'
  };

  const techStack = {
    fontSize: '8px',
    color: '#666666',
    marginTop: '2px',
    marginBottom: '6px'
  };

  const certItem = {
    fontSize: '9px',
    color: '#333333',
    marginBottom: '2px',
    paddingLeft: '12px',
    position: 'relative',
    lineHeight: '1.35'
  };

  const codingRow = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '2px'
  };

  const codingPlatform = {
    fontWeight: '600',
    fontSize: '9px',
    color: '#111111'
  };

  const codingStats = {
    fontSize: '8.5px',
    color: '#444444',
    textAlign: 'right'
  };

  const hackItem = {
    fontSize: '9px',
    color: '#333333',
    marginBottom: '4px',
    paddingLeft: '12px',
    position: 'relative',
    lineHeight: '1.35'
  };

  const hackName = {
    fontWeight: '600',
    color: '#111111'
  };

  // Build visible sections array
  const sections = [];

  // Education
  if (educationData && educationData.length > 0) {
    sections.push({
      key: 'education',
      content: (
        <div style={sectionWrap}>
          <div style={sectionTitle}>Education</div>
          {educationData.map((edu, i) => (
            <div key={i} style={{ marginBottom: i < educationData.length - 1 ? '6px' : '0' }}>
              <div style={eduRow}>
                <span style={eduLeft}>{edu.institution}</span>
                <span style={eduRight}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div style={eduDetail}>
                {edu.degree}{edu.field ? ` in ${edu.field}` : ''}{edu.gpa ? ` | CGPA: ${edu.gpa}` : ''}
              </div>
            </div>
          ))}
        </div>
      )
    });
  }

  // Technical Skills
  if (skillsData && skillsData.length > 0) {
    sections.push({
      key: 'skills',
      content: (
        <div style={sectionWrap}>
          <div style={sectionTitle}>Technical Skills</div>
          {skillsData.map((cat, i) => (
            <div key={i} style={skillCategory}>
              <span style={skillLabel}>{cat.category}: </span>
              <span style={skillItems}>
                {cat.items?.join(', ') || (typeof cat === 'string' ? cat : '')}
              </span>
            </div>
          ))}
        </div>
      )
    });
  }

  // Internships
  if (internshipsData && internshipsData.length > 0) {
    sections.push({
      key: 'internships',
      content: (
        <div style={sectionWrap}>
          <div style={sectionTitle}>Internships</div>
          {internshipsData.map((intern, i) => (
            <div key={i} style={{ marginBottom: i < internshipsData.length - 1 ? '8px' : '0' }}>
              <div style={internshipHeader}>
                <span style={internshipTitle}>{intern.position}</span>
                <span style={internshipDate}>{intern.startDate} – {intern.endDate}</span>
              </div>
              <div style={internshipCompany}>
                {intern.company}{intern.location ? `, ${intern.location}` : ''}
              </div>
              {(intern.achievements || intern.description) && (
                (intern.achievements || [intern.description]).filter(Boolean).map((a, j) => (
                  <div key={j} style={bullet}>
                    <span style={bulletDot}>•</span>
                    {a}
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      )
    });
  }

  // Projects
  if (projectsData && projectsData.length > 0) {
    sections.push({
      key: 'projects',
      content: (
        <div style={sectionWrap}>
          <div style={sectionTitle}>Projects</div>
          {projectsData.map((proj, i) => (
            <div key={i} style={{ marginBottom: i < projectsData.length - 1 ? '8px' : '0' }}>
              <div style={projectHeader}>{proj.name}</div>
              {proj.description && <div style={projectDesc}>{proj.description}</div>}
              {(proj.achievements || []).filter(Boolean).map((a, j) => (
                <div key={j} style={bullet}>
                  <span style={bulletDot}>•</span>
                  {a}
                </div>
              ))}
              {proj.technologies && (
                <div style={techStack}>
                  Tech Stack: {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                </div>
              )}
            </div>
          ))}
        </div>
      )
    });
  }

  // Certifications
  if (certificationsData && certificationsData.length > 0) {
    sections.push({
      key: 'certifications',
      content: (
        <div style={sectionWrap}>
          <div style={sectionTitle}>Certifications</div>
          {certificationsData.map((cert, i) => (
            <div key={i} style={certItem}>
              <span style={bulletDot}>•</span>
              {cert}
            </div>
          ))}
        </div>
      )
    });
  }

  // Competitive Programming & Coding Profiles
  if (codingProfilesData && codingProfilesData.length > 0) {
    sections.push({
      key: 'codingProfiles',
      content: (
        <div style={sectionWrap}>
          <div style={sectionTitle}>Competitive Programming & Coding Profiles</div>
          {codingProfilesData.map((profile, i) => (
            <div key={i} style={codingRow}>
              <span style={codingPlatform}>{profile.platform}</span>
              <span style={codingStats}>{profile.stats}</span>
            </div>
          ))}
        </div>
      )
    });
  }

  // Hackathons
  if (hackathonsData && hackathonsData.length > 0) {
    sections.push({
      key: 'hackathons',
      content: (
        <div style={sectionWrap}>
          <div style={sectionTitle}>Hackathons</div>
          {hackathonsData.map((hack, i) => (
            <div key={i} style={hackItem}>
              <span style={bulletDot}>•</span>
              <span style={hackName}>{hack.name}</span> — {hack.description}
            </div>
          ))}
        </div>
      )
    });
  }

  // ── Render ──
  return (
    <div style={isPreview ? { ...page, maxHeight: 'none', overflow: 'visible' } : page} className="dev-resume-template">
      {/* ── HEADER ── */}
      <div style={{ marginBottom: '2px' }}>
        <div style={nameStyle}>{name}</div>
        <div style={contactRow}>
          <span style={contactLink}>{email}</span>
          <span style={{ margin: '0 6px', color: '#aaaaaa' }}>|</span>
          <span style={contactLink}>{phone}</span>
          <span style={{ margin: '0 6px', color: '#aaaaaa' }}>|</span>
          <span style={contactLink}>{linkedin}</span>
          <span style={{ margin: '0 6px', color: '#aaaaaa' }}>|</span>
          <span style={contactLink}>{github}</span>
        </div>
      </div>

      {/* ── SECTIONS WITH DIVIDERS ── */}
      {sections.filter(s => !(data?.hiddenSections || []).includes(s.key)).map((section, index, arr) => (
        <React.Fragment key={section.key}>
          {section.content}
          {index < arr.length - 1 && <div style={dividerStyle} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DevResumeTemplate;
