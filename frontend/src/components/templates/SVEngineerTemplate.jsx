import React from 'react';

const SVEngineerTemplate = ({ data, scale = 1, isPreview = false }) => {
  const {
    personalInfo,
    education,
    skills,
    experience,
    projects
  } = data || {};

  // ── Silicon Valley senior engineer dummy / fallback data ──
  const name = personalInfo?.fullName || 'Arjun Mehta';
  const role = personalInfo?.role || personalInfo?.title || 'Senior Software Engineer';
  const email = personalInfo?.email || 'arjun@mehta.dev';
  const phone = personalInfo?.phone || '+1-650-555-0147';
  const linkedin = personalInfo?.linkedin || 'linkedin.com/in/arjunmehta';
  const github = personalInfo?.github || 'github.com/arjunmehta';
  const website = personalInfo?.website || 'arjunmehta.dev';

  const educationData = education?.length > 0 ? education : [
    {
      institution: 'Stanford University',
      degree: 'M.S.',
      field: 'Computer Science — Systems & AI',
      gpa: '3.94 / 4.00',
      startDate: 'Sep 2020',
      endDate: 'Jun 2022'
    },
    {
      institution: 'Massachusetts Institute of Technology',
      degree: 'B.S.',
      field: 'Computer Science & Mathematics',
      gpa: '4.92 / 5.00',
      startDate: 'Sep 2016',
      endDate: 'Jun 2020'
    }
  ];

  const skillsData = skills?.length > 0 ? skills : [
    { category: 'Languages', items: 'TypeScript, Python, Rust, Go, C++, SQL, Shell' },
    { category: 'Frameworks', items: 'React, Next.js, Node.js, Django, FastAPI, gRPC, GraphQL' },
    { category: 'Infrastructure', items: 'AWS, GCP, Docker, Kubernetes, Terraform, CI/CD, Prometheus, Grafana' },
    { category: 'Data Systems', items: 'PostgreSQL, Redis, Kafka, Elasticsearch, Snowflake, BigQuery' }
  ];

  const experienceData = experience?.length > 0 ? experience : [
    {
      company: 'OpenAI',
      role: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2023',
      endDate: 'Present',
      achievements: [
        'Architected distributed inference serving platform handling 10M+ API requests/day with <200ms P99 latency across 5 model families.',
        'Led team of 8 engineers to build real-time model routing system, reducing GPU compute costs by $4.8M/year through intelligent load balancing.',
        'Designed streaming response pipeline with SSE/WebSocket support, enabling ChatGPT-style real-time output for 2M+ concurrent sessions.'
      ]
    },
    {
      company: 'Stripe',
      role: 'Software Engineer II',
      location: 'San Francisco, CA',
      startDate: 'Jun 2021',
      endDate: 'Dec 2022',
      achievements: [
        'Built fraud detection pipeline processing 50M+ transactions/day with 99.92% precision, preventing $12M+ in annual fraudulent charge disputes.',
        'Implemented event-driven reconciliation system using Kafka and PostgreSQL, achieving 99.99% financial accuracy across 30+ payment methods.',
        'Migrated 12 Ruby microservices to Go, reducing P99 latency by 65% and cutting infrastructure costs by $1.8M/year.'
      ]
    },
    {
      company: 'Vercel',
      role: 'Software Engineer',
      location: 'Remote',
      startDate: 'Jun 2020',
      endDate: 'May 2021',
      achievements: [
        'Developed edge deployment pipeline serving 500M+ builds/year with sub-3s cold start times across 40+ global edge nodes.',
        'Built real-time build log streaming system with WebSocket multiplexing, supporting 100K+ concurrent developer sessions.'
      ]
    }
  ];

  const projectsData = projects?.length > 0 ? projects : [
    {
      name: 'NeuralDB — AI-Powered Database Optimizer',
      achievements: [
        'Built ML-driven query optimization engine analyzing 5M+ queries/day, reducing average query latency by 42% across production clusters.',
        'Implemented adaptive indexing system using reinforcement learning, achieving 3x faster cold-start performance vs. traditional B-tree approaches.'
      ],
      techStack: 'Python, Rust, PostgreSQL, TensorFlow, Kubernetes, AWS'
    },
    {
      name: 'CloudScale — Multi-Region SaaS Platform',
      achievements: [
        'Architected multi-tenant SaaS platform serving 15K+ organizations across 12 AWS regions with 99.99% uptime SLA.',
        'Designed event-sourced billing engine processing $2.1B+ annual transactions with real-time metering and automatic tier upgrades.'
      ],
      techStack: 'TypeScript, Next.js, Go, Kafka, DynamoDB, Terraform'
    },
    {
      name: 'DevPulse — Real-Time Developer Analytics',
      achievements: [
        'Built developer productivity analytics platform aggregating data from GitHub, Jira, and CI/CD for 50K+ engineering teams.',
        'Implemented real-time collaboration features with CRDT-based sync, supporting 5K+ concurrent editors with <50ms merge latency.'
      ],
      techStack: 'React, Node.js, Redis, Elasticsearch, Docker, GCP'
    }
  ];

  const openSourceData = data?.openSource?.length > 0 ? data.openSource : [
    { name: 'hypergraph', detail: 'Distributed graph computation engine — 4.2K stars, 180+ contributors, used by 3 Fortune 500 companies', language: 'Rust' },
    { name: 'streamql', detail: 'Real-time SQL query engine for streaming data — 2.8K stars, adopted by 2 YC-backed startups', language: 'Go' },
    { name: 'react-motion-kit', detail: 'Production-grade animation library for React — 6.1K stars, 40+ corporate adopters', language: 'TypeScript' }
  ];

  const certificationsData = data?.certifications?.length > 0 ? data.certifications : [
    { name: 'AWS Solutions Architect Professional', date: '2024' },
    { name: 'Google Cloud Professional Cloud Architect', date: '2023' },
    { name: 'Certified Kubernetes Administrator (CKA)', date: '2022' }
  ];

  const competitiveProgrammingData = data?.competitiveProgramming?.length > 0 ? data.competitiveProgramming : [
    { platform: 'Codeforces', detail: 'Rating 2,180 (Expert) — 400+ rated contests, Top 0.5% globally' },
    { platform: 'LeetCode', detail: '3,200+ problems solved — Rating 2,580, Top 0.2% globally' },
    { platform: 'Google Code Jam', detail: 'Top 50 Global Finalist (2022, 2023)' }
  ];

  const leadershipData = data?.leadership?.length > 0 ? data.leadership : [
    'Tech Lead — OpenAI Inference Platform Team (8 engineers, $4.8M cost optimization initiative)',
    'Founding Engineer — YC W22 startup (0→15K customers, $2.1B processed, Series A)',
    'Mentor — Google Developer Expert Program (40+ mentees, 12 placed at FAANG companies)',
    'Speaker — KubeCon 2023 ("Scaling LLM Inference at OpenAI"), SREcon 2022 ("Event-Driven Financial Systems")'
  ];

  // ── Design System ──
  const fonts = "'Inter', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif";

  const page = {
    width: '210mm',
    maxHeight: '297mm',
    overflow: 'hidden',
    background: '#ffffff',
    fontFamily: fonts,
    color: '#111111',
    padding: '13mm 16mm 9mm 16mm',
    boxSizing: 'border-box',
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    position: 'relative',
    lineHeight: '1.32'
  };

  const nameStyle = {
    fontSize: '21px',
    fontWeight: '700',
    letterSpacing: '-0.4px',
    color: '#000000',
    lineHeight: '1.1',
    marginBottom: '1px',
    textAlign: 'center'
  };

  const roleStyle = {
    fontSize: '10px',
    fontWeight: '500',
    color: '#444444',
    letterSpacing: '0.3px',
    marginBottom: '3px',
    lineHeight: '1.2',
    textAlign: 'center'
  };

  const contactStyle = {
    fontSize: '8px',
    color: '#555555',
    lineHeight: '1.4',
    marginBottom: '7px',
    letterSpacing: '0.15px',
    textAlign: 'center'
  };

  const contactLink = {
    color: '#555555',
    textDecoration: 'none'
  };

  const dividerStyle = {
    borderBottom: '1px solid #cccccc',
    marginTop: '8px',
    marginBottom: '8px',
    width: '100%'
  };

  const sectionTitle = {
    fontSize: '9px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: '#000000',
    marginBottom: '4px',
    marginTop: '0px',
    lineHeight: '1'
  };

  const sectionWrap = {
    marginBottom: '6px'
  };

  const bulletStyle = {
    fontSize: '8.5px',
    lineHeight: '1.38',
    color: '#111111',
    paddingLeft: '9px',
    position: 'relative',
    marginBottom: '1px'
  };

  const bulletDot = {
    position: 'absolute',
    left: '0px',
    top: '3.5px',
    width: '2.5px',
    height: '2.5px',
    borderRadius: '50%',
    background: '#111111'
  };

  const jobHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '1.5px',
    lineHeight: '1'
  };

  const companyStyle = {
    fontSize: '9.5px',
    fontWeight: '700',
    color: '#000000'
  };

  const roleLocationStyle = {
    fontSize: '8.5px',
    color: '#555555',
    marginLeft: '3px',
    fontWeight: '400'
  };

  const dateStyle = {
    fontSize: '8px',
    color: '#666666',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    letterSpacing: '0.1px'
  };

  const projectHeaderStyle = {
    fontSize: '9px',
    fontWeight: '700',
    color: '#000000',
    marginBottom: '1.5px',
    lineHeight: '1'
  };

  const techStackStyle = {
    fontSize: '7.5px',
    color: '#777777',
    marginTop: '1.5px',
    lineHeight: '1.3',
    fontStyle: 'normal',
    letterSpacing: '0.1px'
  };

  const skillCategoryStyle = {
    fontSize: '8.5px',
    lineHeight: '1.42',
    marginBottom: '1px',
    color: '#111111'
  };

  const skillLabelStyle = {
    fontWeight: '700',
    color: '#000000',
    marginRight: '2px',
    letterSpacing: '0.2px'
  };

  const eduRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '0.5px',
    lineHeight: '1'
  };

  const eduInstitutionStyle = {
    fontSize: '9.5px',
    fontWeight: '700',
    color: '#000000'
  };

  const eduDetailStyle = {
    fontSize: '8px',
    color: '#555555',
    marginBottom: '0.5px',
    lineHeight: '1.3',
    letterSpacing: '0.1px'
  };

  const openSourceItemStyle = {
    fontSize: '8.5px',
    lineHeight: '1.38',
    marginBottom: '2px',
    color: '#111111'
  };

  const openSourceNameStyle = {
    fontWeight: '700',
    color: '#000000'
  };

  const openSourceLangStyle = {
    fontSize: '7.5px',
    color: '#777777',
    fontWeight: '500',
    marginLeft: '4px'
  };

  const certItemStyle = {
    fontSize: '8.5px',
    lineHeight: '1.38',
    color: '#111111',
    marginBottom: '1px'
  };

  const cpItemStyle = {
    fontSize: '8.5px',
    lineHeight: '1.38',
    marginBottom: '1px',
    color: '#111111'
  };

  const cpPlatformStyle = {
    fontWeight: '700',
    color: '#000000',
    marginRight: '3px'
  };

  const leadershipItemStyle = {
    fontSize: '8.5px',
    lineHeight: '1.38',
    color: '#111111',
    paddingLeft: '9px',
    position: 'relative',
    marginBottom: '1px'
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
            <div key={i} style={{ marginBottom: '2px' }}>
              <div style={eduRowStyle}>
                <span style={eduInstitutionStyle}>{edu.institution}</span>
                <span style={dateStyle}>{edu.startDate} — {edu.endDate}</span>
              </div>
              <div style={eduDetailStyle}>
                {edu.degree} in {edu.field}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
              </div>
            </div>
          ))}
        </div>
      )
    });
  }

  // Skills
  if (skillsData && skillsData.length > 0) {
    sections.push({
      key: 'skills',
      content: (
        <div style={sectionWrap}>
          <div style={sectionTitle}>Skills</div>
          {skillsData.map((skill, i) => (
            <div key={i} style={skillCategoryStyle}>
              <span style={skillLabelStyle}>{skill.category}:</span>
              <span>{skill.items || skill.name}</span>
            </div>
          ))}
        </div>
      )
    });
  }

  // Experience
  if (experienceData && experienceData.length > 0) {
    sections.push({
      key: 'experience',
      content: (
        <div style={sectionWrap}>
          <div style={sectionTitle}>Experience</div>
          {experienceData.map((exp, i) => (
            <div key={i} style={{ marginBottom: '4px' }}>
              <div style={jobHeaderStyle}>
                <span>
                  <span style={companyStyle}>{exp.company}</span>
                  <span style={roleLocationStyle}> · {exp.role} · {exp.location}</span>
                </span>
                <span style={dateStyle}>{exp.startDate} — {exp.endDate}</span>
              </div>
              {(exp.achievements || []).map((a, j) => (
                <div key={j} style={bulletStyle}>
                  <div style={bulletDot} />
                  {a}
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    });
  }

  // Featured Projects
  if (projectsData && projectsData.length > 0) {
    sections.push({
      key: 'projects',
      content: (
        <div style={sectionWrap}>
          <div style={sectionTitle}>Featured Projects</div>
          {projectsData.map((proj, i) => (
            <div key={i} style={{ marginBottom: '3px' }}>
              <div style={projectHeaderStyle}>{proj.name}</div>
              {(proj.achievements || []).map((a, j) => (
                <div key={j} style={bulletStyle}>
                  <div style={bulletDot} />
                  {a}
                </div>
              ))}
              {proj.techStack && (
                <div style={techStackStyle}>
                  <span style={{ fontWeight: '600', color: '#555555' }}>Tech:</span> {proj.techStack}
                </div>
              )}
            </div>
          ))}
        </div>
      )
    });
  }

  // Open Source Contributions
  if (openSourceData && openSourceData.length > 0) {
    sections.push({
      key: 'openSource',
      content: (
        <div style={sectionWrap}>
          <div style={sectionTitle}>Open Source Contributions</div>
          {openSourceData.map((os, i) => (
            <div key={i} style={openSourceItemStyle}>
              <span style={openSourceNameStyle}>{os.name}</span>
              {os.language && <span style={openSourceLangStyle}>[{os.language}]</span>}
              <span> — {os.detail}</span>
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
            <div key={i} style={certItemStyle}>
              <span style={{ fontWeight: '700', color: '#000000' }}>{cert.name}</span>
              {cert.date && <span style={{ color: '#555555' }}> · {cert.date}</span>}
            </div>
          ))}
        </div>
      )
    });
  }

  // Competitive Programming
  if (competitiveProgrammingData && competitiveProgrammingData.length > 0) {
    sections.push({
      key: 'competitiveProgramming',
      content: (
        <div style={sectionWrap}>
          <div style={sectionTitle}>Competitive Programming</div>
          {competitiveProgrammingData.map((cp, i) => (
            <div key={i} style={cpItemStyle}>
              <span style={cpPlatformStyle}>{cp.platform}</span>
              <span>{cp.detail}</span>
            </div>
          ))}
        </div>
      )
    });
  }

  // Leadership & Achievements
  if (leadershipData && leadershipData.length > 0) {
    sections.push({
      key: 'leadership',
      content: (
        <div style={sectionWrap}>
          <div style={sectionTitle}>Leadership & Achievements</div>
          {leadershipData.map((item, i) => (
            <div key={i} style={leadershipItemStyle}>
              <div style={bulletDot} />
              {item}
            </div>
          ))}
        </div>
      )
    });
  }

  // ── Render ──
  return (
    <div style={isPreview ? { ...page, maxHeight: 'none', overflow: 'visible' } : page}>
      {/* ── HEADER ── */}
      <div style={nameStyle}>{name}</div>
      <div style={roleStyle}>{role}</div>
      <div style={contactStyle}>
        <span>{email}</span>
        <span style={{ margin: '0 5px', color: '#bbbbbb' }}>·</span>
        <span>{phone}</span>
        <span style={{ margin: '0 5px', color: '#bbbbbb' }}>·</span>
        <span style={contactLink}>{linkedin}</span>
        <span style={{ margin: '0 5px', color: '#bbbbbb' }}>·</span>
        <span style={contactLink}>{github}</span>
        {website && (
          <span>
            <span style={{ margin: '0 5px', color: '#bbbbbb' }}>·</span>
            <span style={contactLink}>{website}</span>
          </span>
        )}
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

export default SVEngineerTemplate;
