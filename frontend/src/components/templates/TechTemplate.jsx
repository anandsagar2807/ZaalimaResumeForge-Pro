import React from 'react';

const TechTemplate = ({ data, scale = 1, isPreview = false }) => {
  const { personalInfo, summary, experience, skills, education, projects } = data;

  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: '210mm',
    minHeight: '297mm',
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
    fontFamily: '"SF Mono", "Fira Code", Monaco, monospace',
    fontSize: '10px'
  };

  const headerStyle = {
    backgroundColor: '#161b22',
    padding: '30px',
    borderBottom: '1px solid #30363d'
  };

  const nameStyle = {
    fontSize: '26px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '-0.5px',
    marginBottom: '4px'
  };

  const titleStyle = {
    fontSize: '14px',
    color: '#58a6ff',
    marginBottom: '12px'
  };

  const linkStyle = {
    color: '#58a6ff',
    textDecoration: 'none',
    marginRight: '15px',
    fontSize: '10px'
  };

  const sectionStyle = {
    padding: '25px 30px',
    borderBottom: '1px solid #30363d'
  };

  const sectionTitleStyle = {
    fontSize: '13px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const dividerStyle = {
    borderBottom: '1px solid #30363d',
    marginTop: '10px',
    marginBottom: '10px',
    width: 'calc(100% - 60px)',
    marginLeft: '30px',
    marginRight: '30px'
  };

  const iconStyle = {
    color: '#238636'
  };

  const codeStyle = {
    color: '#7ee787'
  };

  const jobHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px'
  };

  const jobTitleStyle = {
    fontWeight: '600',
    color: '#ffffff'
  };

  const companyStyle = {
    color: '#58a6ff'
  };

  const dateStyle = {
    color: '#8b949e',
    fontSize: '9px'
  };

  const langStyle = {
    color: '#c9d1d9'
  };

  const projectStyle = {
    backgroundColor: '#161b22',
    borderRadius: '6px',
    padding: '15px',
    marginBottom: '12px',
    border: '1px solid #30363d'
  };

  const projectLinkStyle = {
    color: '#58a6ff',
    fontWeight: '600',
    marginBottom: '4px'
  };

  const techStackStyle = {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginTop: '8px'
  };

  const techBadgeStyle = {
    padding: '2px 8px',
    backgroundColor: '#21262d',
    borderRadius: '12px',
    fontSize: '9px',
    color: '#79c0ff'
  };

  // Build visible sections array
  const sections = [];

  // Summary
  if (summary) {
    sections.push({
      key: 'summary',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span style={iconStyle}>&#9679;</span> About
          </h2>
          <p style={{ lineHeight: '1.5' }}>{summary}</p>
        </div>
      )
    });
  }

  // Tech Stack
  if (skills) {
    sections.push({
      key: 'skills',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span style={iconStyle}>&#9679;</span> Tech Stack
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.technical?.slice(0, 12).map((skill, i) => (
              <span key={i} style={techBadgeStyle}>{skill}</span>
            ))}
          </div>
        </div>
      )
    });
  }

  // Experience
  if (experience && experience.length > 0) {
    sections.push({
      key: 'experience',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span style={iconStyle}>&#9679;</span> Experience
          </h2>
          {experience.map((job, index) => (
            <div key={index} style={{ marginBottom: '18px' }}>
              <div style={jobHeaderStyle}>
                <div>
                  <span style={jobTitleStyle}>{job.title}</span>
                  <span style={langStyle}> at </span>
                  <span style={companyStyle}>{job.company}</span>
                </div>
                <span style={dateStyle}>{job.startDate} - {job.endDate}</span>
              </div>
              {job.achievements && job.achievements.length > 0 && (
                <ul style={{ margin: '8px 0', paddingLeft: '16px' }}>
                  {job.achievements.map((a, i) => (
                    <li key={i} style={{ marginBottom: '4px', color: '#8b949e' }}>
                      <code style={codeStyle}>{'>'}</code> {a}
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
    sections.push({
      key: 'projects',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span style={iconStyle}>&#9679;</span> Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} style={projectStyle}>
              {project.name && <p style={projectLinkStyle}>{project.name}</p>}
              {project.description && <p style={{ fontSize: '10px', color: '#8b949e' }}>{project.description}</p>}
              {project.tech && (
                <div style={techStackStyle}>
                  {project.tech.map((t, i) => (
                    <span key={i} style={techBadgeStyle}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )
    });
  }

  // Education
  if (education && education.length > 0) {
    sections.push({
      key: 'education',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span style={iconStyle}>&#9679;</span> Education
          </h2>
          {education.map((edu, index) => (
            <div key={index}>
              <span style={{ fontWeight: '600', color: '#ffffff' }}>{edu.school}</span>
              <span style={langStyle}> - {edu.degree}</span>
              {edu.field && <span style={langStyle}> in {edu.field}</span>}
              <span style={{ ...dateStyle, marginLeft: '10px' }}>// {edu.year}</span>
            </div>
          ))}
        </div>
      )
    });
  }

  return (
    <div style={isPreview ? { ...containerStyle, maxHeight: 'none', overflow: 'visible' } : containerStyle} className="tech-template">
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={nameStyle}>{personalInfo?.name || 'Your Name'}</h1>
        <p style={titleStyle}>{personalInfo?.title || 'Technical Title'}</p>
        <div>
          {personalInfo?.email && <span style={linkStyle}>{personalInfo.email}</span>}
          {personalInfo?.github && <a href={`https://${personalInfo.github}`} style={linkStyle}>{personalInfo.github}</a>}
          {personalInfo?.linkedin && <a href={`https://${personalInfo.linkedin}`} style={linkStyle}>{personalInfo.linkedin}</a>}
          {personalInfo?.website && <a href={`https://${personalInfo.website}`} style={linkStyle}>{personalInfo.website}</a>}
        </div>
      </div>

      {sections.filter(s => !(data?.hiddenSections || []).includes(s.key)).map((section, index, arr) => (
        <React.Fragment key={section.key}>
          {section.content}
          {index < arr.length - 1 && <div style={dividerStyle} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TechTemplate;
