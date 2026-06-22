import React from 'react';

const CreativeTemplate = ({ data, scale = 1, isPreview = false }) => {
  const { personalInfo, summary, experience, skills, education, projects } = data;

  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: '210mm',
    minHeight: '297mm',
    backgroundColor: '#faf5ff',
    color: '#1e1b4b',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '10px'
  };

  const bannerStyle = {
    background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
    color: '#ffffff',
    padding: '30px 35px',
    marginBottom: '20px'
  };

  const nameStyle = {
    fontSize: '28px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    marginBottom: '4px'
  };

  const titleStyle = {
    fontSize: '14px',
    fontWeight: '500',
    opacity: 0.95,
    marginBottom: '15px'
  };

  const contactStyle = {
    display: 'flex',
    gap: '20px',
    fontSize: '9px',
    opacity: 0.9
  };

  const mainStyle = {
    padding: '0 35px 30px',
    display: 'flex',
    gap: '25px'
  };

  const leftColumnStyle = {
    flex: '1'
  };

  const rightColumnStyle = {
    width: '38%'
  };

  const sectionStyle = {
    marginBottom: '20px'
  };

  const sectionTitleStyle = {
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: '#7c3aed',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const dividerStyle = {
    borderBottom: '1px solid #cccccc',
    marginTop: '10px',
    marginBottom: '10px',
    width: '100%'
  };

  const sectionTitleIconStyle = {
    width: '20px',
    height: '20px',
    backgroundColor: '#f3e8ff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px'
  };

  const jobTitleStyle = {
    fontWeight: '700',
    fontSize: '11px',
    color: '#1e1b4b'
  };

  const companyStyle = {
    color: '#db2777',
    fontWeight: '600',
    fontSize: '10px',
    marginBottom: '4px'
  };

  const dateStyle = {
    fontSize: '9px',
    color: '#a78bfa',
    marginBottom: '8px'
  };

  const skillTagStyle = {
    display: 'inline-block',
    padding: '5px 12px',
    margin: '3px',
    backgroundColor: '#f3e8ff',
    borderRadius: '20px',
    fontSize: '9px',
    color: '#7c3aed',
    fontWeight: '500'
  };

  const projectCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(124, 58, 237, 0.1)'
  };

  // Build left column sections
  const leftSections = [];

  // Summary
  if (summary) {
    leftSections.push({
      key: 'summary',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span style={sectionTitleIconStyle}>✦</span>
            About Me
          </h2>
          <p style={{ fontSize: '10px', color: '#475569', lineHeight: '1.6' }}>{summary}</p>
        </div>
      )
    });
  }

  // Experience
  if (experience && experience.length > 0) {
    leftSections.push({
      key: 'experience',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span style={sectionTitleIconStyle}>💼</span>
            Experience
          </h2>
          {experience.map((job, index) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              <p style={jobTitleStyle}>{job.title}</p>
              <p style={companyStyle}>{job.company}</p>
              <p style={dateStyle}>{job.startDate} — {job.endDate}</p>
              {job.achievements && job.achievements.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: '14px' }}>
                  {job.achievements.map((achievement, i) => (
                    <li key={i} style={{ fontSize: '9px', color: '#475569', marginBottom: '4px' }}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )
    });
  }

  // Projects
  if (projects && projects.length > 0) {
    leftSections.push({
      key: 'projects',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span style={sectionTitleIconStyle}>🎨</span>
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} style={projectCardStyle}>
              <p style={{ fontWeight: '700', fontSize: '10px', color: '#1e1b4b' }}>{project.name}</p>
              <p style={{ fontSize: '9px', color: '#64748b', marginTop: '4px' }}>{project.description}</p>
              {project.tech && (
                <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {project.tech.map((t, i) => (
                    <span key={i} style={{ fontSize: '8px', padding: '2px 8px', backgroundColor: '#fce7f3', borderRadius: '10px', color: '#db2777' }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )
    });
  }

  // Build right column sections
  const rightSections = [];

  // Skills
  if (skills) {
    rightSections.push({
      key: 'skills',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span style={sectionTitleIconStyle}>⚡</span>
            Superpowers
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {skills.technical?.slice(0, 8).map((skill, i) => (
              <span key={`tech-${i}`} style={skillTagStyle}>{skill}</span>
            ))}
          </div>
          {skills.soft?.slice(0, 4).map((skill, i) => (
            <span key={`soft-${i}`} style={{ ...skillTagStyle, backgroundColor: '#fce7f3', color: '#db2777' }}>{skill}</span>
          ))}
        </div>
      )
    });
  }

  // Education
  if (education && education.length > 0) {
    rightSections.push({
      key: 'education',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span style={sectionTitleIconStyle}>🎓</span>
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '12px' }}>
              <p style={{ fontWeight: '700', fontSize: '10px' }}>{edu.school}</p>
              <p style={{ fontSize: '9px', color: '#64748b' }}>{edu.degree} in {edu.field}</p>
              <p style={{ fontSize: '8px', color: '#a78bfa' }}>{edu.year}</p>
            </div>
          ))}
        </div>
      )
    });
  }

  return (
    <div style={isPreview ? { ...containerStyle, maxHeight: 'none', overflow: 'visible' } : containerStyle} className="creative-template">
      {/* Banner */}
      <div style={bannerStyle}>
        <h1 style={nameStyle}>{personalInfo?.name || 'Your Name'}</h1>
        <p style={titleStyle}>{personalInfo?.title || 'Creative Title'}</p>
        <div style={contactStyle}>
          {personalInfo?.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo?.phone && <span>☎ {personalInfo.phone}</span>}
          {personalInfo?.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo?.website && <span>🌐 {personalInfo.website}</span>}
        </div>
      </div>

      {/* Main Content */}
      <div style={mainStyle}>
        <div style={leftColumnStyle}>
          {leftSections.filter(s => !(data?.hiddenSections || []).includes(s.key)).map((section, index, arr) => (
            <React.Fragment key={section.key}>
              {section.content}
              {index < arr.length - 1 && <div style={dividerStyle} />}
            </React.Fragment>
          ))}
        </div>

        {/* Right Column */}
        <div style={rightColumnStyle}>
          {rightSections.filter(s => !(data?.hiddenSections || []).includes(s.key)).map((section, index, arr) => (
            <React.Fragment key={section.key}>
              {section.content}
              {index < arr.length - 1 && <div style={dividerStyle} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
