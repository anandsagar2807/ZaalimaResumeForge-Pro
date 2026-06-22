import React from 'react';

const ATSExecutiveTemplate = ({ data, scale = 1, isPreview = false }) => {
  const {
    personalInfo,
    summary,
    experience,
    skills,
    education,
    achievements,
    certifications,
    projects
  } = data || {};

  const name = personalInfo?.fullName || personalInfo?.name || 'FIRSTNAME LASTNAME';
  const title = personalInfo?.title || '';
  const email = personalInfo?.email || '';
  const phone = personalInfo?.phone || '';
  const location = personalInfo?.location || '';
  const linkedin = personalInfo?.linkedin || '';
  const website = personalInfo?.website || '';

  const experienceData = experience?.length > 0 ? experience : [
    {
      company: 'Amazon Web Services',
      title: 'Principal Engineer',
      location: 'Seattle, WA',
      startDate: 'Jan 2021',
      endDate: 'Present',
      achievements: [
        'Led architecture redesign of distributed storage platform serving 2.4M requests/sec, reducing P99 latency from 120ms to 18ms and saving $14M annually in infrastructure costs.',
        'Built and mentored a team of 22 engineers across 3 offices, establishing engineering standards adopted by 6 adjacent teams.',
        'Drove technical strategy for serverless compute initiative generating $180M ARR within 18 months of launch.'
      ]
    },
    {
      company: 'Google',
      title: 'Staff Software Engineer',
      location: 'Mountain View, CA',
      startDate: 'Mar 2017',
      endDate: 'Dec 2020',
      achievements: [
        'Designed fault-tolerant data pipeline processing 8TB daily across 40+ microservices with 99.99% uptime SLA.',
        'Spearheaded migration of monolithic billing system to event-driven architecture, reducing deployment cycles from 2 weeks to 4 hours.',
        'Authored 3 internal technical RFCs adopted as company-wide engineering standards.'
      ]
    },
    {
      company: 'Meta',
      title: 'Senior Software Engineer',
      location: 'Menlo Park, CA',
      startDate: 'Jun 2014',
      endDate: 'Feb 2017',
      achievements: [
        'Optimized News Feed ranking algorithm serving 1.8B daily active users, improving engagement metrics by 12%.',
        'Implemented real-time A/B testing framework reducing experiment cycle time from 14 days to 48 hours.',
        'Partnered with product and data science teams to launch 4 features reaching 500M+ users within first quarter.'
      ]
    }
  ];

  const educationData = education?.length > 0 ? education : [
    {
      institution: 'Massachusetts Institute of Technology',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2012',
      endDate: '2014',
      school: 'Massachusetts Institute of Technology'
    },
    {
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Electrical Engineering and Computer Science',
      startDate: '2008',
      endDate: '2012',
      school: 'University of California, Berkeley'
    }
  ];

  const skillsData = skills?.technical || skills?.length > 0 ? skills : {
    technical: ['Distributed Systems', 'System Design', 'Cloud Architecture', 'Machine Learning', 'Data Engineering'],
    tools: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Kafka', 'Spark', 'PostgreSQL', 'Redis'],
    leadership: ['Technical Strategy', 'Team Building', 'Cross-Functional Leadership', 'Stakeholder Management', 'Executive Communication']
  };

  const achievementsData = achievements?.length > 0 ? achievements : [
    'Promoted to Principal Engineer in 3 years — fastest trajectory in AWS division history',
    'Holder of 4 patents in distributed systems and data processing',
    'Keynote speaker at re:Invent 2023, QCon, and StrangeLoop',
    'Published research in ACM SIGMOD and IEEE ICDCS conferences'
  ];

  const certificationsData = certifications?.length > 0 ? certifications : [
    { name: 'AWS Solutions Architect Professional', date: '2023' },
    { name: 'Google Cloud Professional Cloud Architect', date: '2022' }
  ];

  // ── Design System: ATS-Friendly Executive ──
  const fonts = "'Garamond', 'Georgia', 'Times New Roman', Times, serif";

  const page = {
    width: '210mm',
    minHeight: '297mm',
    overflow: isPreview ? 'visible' : 'hidden',
    background: '#ffffff',
    fontFamily: fonts,
    color: '#1a1a1a',
    padding: '18mm 20mm 16mm 20mm',
    boxSizing: 'border-box',
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    position: 'relative',
    lineHeight: '1.45',
    fontSize: '10.5px'
  };

  const nameStyle = {
    fontSize: '26px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#000000',
    lineHeight: '1.1',
    marginBottom: '4px',
    textAlign: 'center'
  };

  const titleUnderName = {
    fontSize: '11px',
    fontWeight: '400',
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    color: '#555555',
    textAlign: 'center',
    marginBottom: '10px'
  };

  const contactRow = {
    fontSize: '9px',
    color: '#444444',
    textAlign: 'center',
    lineHeight: '1.5',
    marginBottom: '16px',
    letterSpacing: '0.3px'
  };

  const sep = {
    margin: '0 8px',
    color: '#999999'
  };

  const sectionHeading = {
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '2.5px',
    color: '#000000',
    marginTop: '14px',
    marginBottom: '0px',
    lineHeight: '1'
  };

  const sectionDivider = {
    width: '100%',
    border: 'none',
    borderTop: '1px solid #cccccc',
    marginTop: '4px',
    marginBottom: '10px'
  };

  const jobRow = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '1px',
    lineHeight: '1.1'
  };

  const jobTitle = {
    fontSize: '11px',
    fontWeight: '700',
    color: '#000000'
  };

  const jobCompany = {
    fontSize: '10.5px',
    fontWeight: '400',
    color: '#333333',
    fontStyle: 'italic'
  };

  const jobLocation = {
    fontSize: '9.5px',
    color: '#666666',
    fontWeight: '400'
  };

  const jobDate = {
    fontSize: '9.5px',
    color: '#555555',
    fontWeight: '400',
    whiteSpace: 'nowrap'
  };

  const bulletItem = {
    fontSize: '10px',
    lineHeight: '1.5',
    color: '#222222',
    marginBottom: '2.5px',
    paddingLeft: '0px'
  };

  const skillLine = {
    fontSize: '10px',
    lineHeight: '1.55',
    color: '#222222',
    marginBottom: '2px'
  };

  const skillLabel = {
    fontWeight: '700',
    color: '#000000'
  };

  const eduInstitution = {
    fontSize: '11px',
    fontWeight: '700',
    color: '#000000'
  };

  const eduDetail = {
    fontSize: '10px',
    color: '#444444',
    lineHeight: '1.4'
  };

  const certItem = {
    fontSize: '10px',
    lineHeight: '1.5',
    color: '#222222',
    marginBottom: '2px'
  };

  // ── Helper: Section with heading + divider ──
  const SectionBlock = ({ title, children }) => (
    <div>
      <div style={sectionHeading}>{title}</div>
      <hr style={sectionDivider} />
      {children}
    </div>
  );

  // ── Build contact string parts ──
  const contactParts = [];
  if (email) contactParts.push(email);
  if (phone) contactParts.push(phone);
  if (location) contactParts.push(location);
  if (linkedin) contactParts.push(linkedin);
  if (website) contactParts.push(website);

  // ── Render ──
  return (
    <div style={isPreview ? { ...page, maxHeight: 'none', overflow: 'visible' } : page} className="ats-executive-template">

      {/* ── HEADER ── */}
      <div style={nameStyle}>{name}</div>
      {title && <div style={titleUnderName}>{title}</div>}
      {contactParts.length > 0 && (
        <div style={contactRow}>
          {contactParts.map((part, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span style={sep}>|</span>}
              <span>{part}</span>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* ── EXECUTIVE SUMMARY ── */}
      {summary && !(data?.hiddenSections || []).includes('summary') && (
        <SectionBlock title="EXECUTIVE SUMMARY">
          <p style={{ fontSize: '10px', lineHeight: '1.6', color: '#222222', margin: '0' }}>
            {summary}
          </p>
        </SectionBlock>
      )}

      {/* ── EXPERIENCE ── */}
      {experienceData && experienceData.length > 0 && !(data?.hiddenSections || []).includes('experience') && (
        <SectionBlock title="EXPERIENCE">
          {experienceData.map((job, i) => (
            <div key={i} style={{ marginBottom: i < experienceData.length - 1 ? '12px' : '0px' }}>
              <div style={jobRow}>
                <span style={jobTitle}>{job.title || job.role}</span>
                <span style={jobDate}>{job.startDate} — {job.endDate}</span>
              </div>
              <div style={{ ...jobRow, marginBottom: '4px' }}>
                <span>
                  <span style={jobCompany}>{job.company}</span>
                  {job.location && <span style={jobLocation}> — {job.location}</span>}
                </span>
              </div>
              {(job.achievements || []).length > 0 && (
                <ul style={{ margin: '0', paddingLeft: '16px', listStyleType: 'disc' }}>
                  {job.achievements.map((a, j) => (
                    <li key={j} style={bulletItem}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </SectionBlock>
      )}

      {/* ── KEY ACHIEVEMENTS ── */}
      {achievementsData && achievementsData.length > 0 && !(data?.hiddenSections || []).includes('achievements') && (
        <SectionBlock title="KEY ACHIEVEMENTS">
          <ul style={{ margin: '0', paddingLeft: '16px', listStyleType: 'disc' }}>
            {achievementsData.map((ach, i) => (
              <li key={i} style={bulletItem}>{typeof ach === 'string' ? ach : ach.description || ach.name || ''}</li>
            ))}
          </ul>
        </SectionBlock>
      )}

      {/* ── SKILLS ── */}
      {skillsData && !(data?.hiddenSections || []).includes('skills') && (
        <SectionBlock title="SKILLS">
          {Array.isArray(skillsData) ? (
            // Array of { category, items/name } objects
            skillsData.map((skill, i) => (
              <div key={i} style={skillLine}>
                <span style={skillLabel}>{skill.category}: </span>
                <span>{skill.items || skill.name}</span>
              </div>
            ))
          ) : (
            // Object with technical/tools/leadership/soft keys
            <>
              {skillsData.technical && skillsData.technical.length > 0 && (
                <div style={skillLine}>
                  <span style={skillLabel}>Technical: </span>
                  <span>{Array.isArray(skillsData.technical) ? skillsData.technical.join(', ') : skillsData.technical}</span>
                </div>
              )}
              {skillsData.tools && skillsData.tools.length > 0 && (
                <div style={skillLine}>
                  <span style={skillLabel}>Tools & Platforms: </span>
                  <span>{Array.isArray(skillsData.tools) ? skillsData.tools.join(', ') : skillsData.tools}</span>
                </div>
              )}
              {skillsData.leadership && skillsData.leadership.length > 0 && (
                <div style={skillLine}>
                  <span style={skillLabel}>Leadership: </span>
                  <span>{Array.isArray(skillsData.leadership) ? skillsData.leadership.join(', ') : skillsData.leadership}</span>
                </div>
              )}
              {skillsData.soft && skillsData.soft.length > 0 && (
                <div style={skillLine}>
                  <span style={skillLabel}>Interpersonal: </span>
                  <span>{Array.isArray(skillsData.soft) ? skillsData.soft.join(', ') : skillsData.soft}</span>
                </div>
              )}
            </>
          )}
        </SectionBlock>
      )}

      {/* ── EDUCATION ── */}
      {educationData && educationData.length > 0 && !(data?.hiddenSections || []).includes('education') && (
        <SectionBlock title="EDUCATION">
          {educationData.map((edu, i) => (
            <div key={i} style={{ marginBottom: i < educationData.length - 1 ? '6px' : '0px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={eduInstitution}>{edu.institution || edu.school}</span>
                <span style={jobDate}>
                  {edu.startDate && edu.endDate ? `${edu.startDate} — ${edu.endDate}` : edu.year || edu.endDate || ''}
                </span>
              </div>
              <div style={eduDetail}>
                {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
              </div>
            </div>
          ))}
        </SectionBlock>
      )}

      {/* ── CERTIFICATIONS ── */}
      {certificationsData && certificationsData.length > 0 && !(data?.hiddenSections || []).includes('certifications') && (
        <SectionBlock title="CERTIFICATIONS">
          {certificationsData.map((cert, i) => (
            <div key={i} style={certItem}>
              <span style={{ fontWeight: '700', color: '#000000' }}>{cert.name}</span>
              {cert.date && <span style={{ color: '#666666' }}> — {cert.date}</span>}
            </div>
          ))}
        </SectionBlock>
      )}

      {/* ── PROJECTS (optional) ── */}
      {projects && projects.length > 0 && !(data?.hiddenSections || []).includes('projects') && (
        <SectionBlock title="PROJECTS">
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: i < projects.length - 1 ? '8px' : '0px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#000000', marginBottom: '2px' }}>
                {proj.name || proj.title}
              </div>
              {(proj.achievements || proj.description) && (
                Array.isArray(proj.achievements) ? (
                  <ul style={{ margin: '0', paddingLeft: '16px', listStyleType: 'disc' }}>
                    {proj.achievements.map((a, j) => (
                      <li key={j} style={bulletItem}>{a}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: '10px', color: '#222222', margin: '0', lineHeight: '1.5' }}>
                    {proj.description}
                  </p>
                )
              )}
              {proj.techStack && (
                <div style={{ fontSize: '9px', color: '#777777', marginTop: '2px' }}>
                  <span style={{ fontWeight: '600' }}>Tech: </span>{proj.techStack}
                </div>
              )}
            </div>
          ))}
        </SectionBlock>
      )}
    </div>
  );
};

export default ATSExecutiveTemplate;
