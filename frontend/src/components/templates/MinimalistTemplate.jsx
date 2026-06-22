import React from 'react';

const MinimalistTemplate = ({ data, scale = 1, isPreview = false }) => {
  const { personalInfo, summary, experience, skills, education } = data;

  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: '210mm',
    minHeight: '297mm',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    lineHeight: '1.5'
  };

  const sectionStyle = {
    padding: '20px 30px',
    borderBottom: '1px solid #e5e5e5'
  };

  const headerStyle = {
    ...sectionStyle,
    paddingTop: '30px',
    paddingBottom: '25px',
    borderBottom: '2px solid #1a1a1a'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    marginBottom: '6px',
    color: '#000000'
  };

  const subtitleStyle = {
    fontSize: '14px',
    color: '#666666',
    fontWeight: '500',
    marginBottom: '12px'
  };

  const contactStyle = {
    display: 'flex',
    gap: '20px',
    fontSize: '10px',
    color: '#666666',
    flexWrap: 'wrap'
  };

  const sectionTitleStyle = {
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '12px',
    color: '#1a1a1a'
  };

  const dividerStyle = {
    borderBottom: '1px solid #cccccc',
    marginTop: '10px',
    marginBottom: '10px',
    width: '100%'
  };

  const companyStyle = {
    fontWeight: '600',
    fontSize: '12px',
    marginBottom: '2px'
  };

  const jobTitleStyle = {
    fontSize: '11px',
    color: '#666666',
    marginBottom: '4px'
  };

  const dateStyle = {
    fontSize: '10px',
    color: '#999999',
    marginBottom: '8px'
  };

  const achievementStyle = {
    fontSize: '10px',
    color: '#444444',
    marginBottom: '4px',
    paddingLeft: '12px',
    position: 'relative'
  };

  const skillTagStyle = {
    display: 'inline-block',
    padding: '4px 10px',
    margin: '2px',
    backgroundColor: '#f5f5f5',
    borderRadius: '3px',
    fontSize: '10px',
    color: '#333333'
  };

  // Build visible sections array
  const sections = [];

  // Summary
  if (summary) {
    sections.push({
      key: 'summary',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Professional Summary</h2>
          <p style={{ fontSize: '11px', color: '#444444', lineHeight: '1.6' }}>{summary}</p>
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
          <h2 style={sectionTitleStyle}>Experience</h2>
          {experience.map((job, index) => (
            <div key={index} style={{ marginBottom: index < experience.length - 1 ? '18px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <p style={companyStyle}>{job.company}</p>
                  <p style={jobTitleStyle}>{job.title}</p>
                </div>
                <p style={dateStyle}>{job.startDate} – {job.endDate}</p>
              </div>
              {job.achievements && job.achievements.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: '16px' }}>
                  {job.achievements.map((achievement, i) => (
                    <li key={i} style={achievementStyle}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )
    });
  }

  // Skills
  if (skills) {
    sections.push({
      key: 'skills',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {skills.technical?.map((skill, i) => (
              <span key={`tech-${i}`} style={skillTagStyle}>{skill}</span>
            ))}
            {skills.soft?.map((skill, i) => (
              <span key={`soft-${i}`} style={{ ...skillTagStyle, backgroundColor: '#f0f0f0' }}>{skill}</span>
            ))}
          </div>
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
          <h2 style={sectionTitleStyle}>Education</h2>
          {education.map((edu, index) => (
            <div key={index} style={{ marginBottom: index < education.length - 1 ? '12px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontWeight: '600', fontSize: '11px' }}>{edu.school}</p>
                <p style={{ fontSize: '10px', color: '#999999' }}>{edu.year}</p>
              </div>
              <p style={{ fontSize: '10px', color: '#666666' }}>{edu.degree} in {edu.field}</p>
            </div>
          ))}
        </div>
      )
    });
  }

  return (
    <div style={isPreview ? { ...containerStyle, maxHeight: 'none', overflow: 'visible' } : containerStyle} className="minimalist-template">
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>{personalInfo?.name || 'Your Name'}</h1>
        <p style={subtitleStyle}>{personalInfo?.title || 'Professional Title'}</p>
        <div style={contactStyle}>
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>{personalInfo.linkedin}</span>}
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

export default MinimalistTemplate;
