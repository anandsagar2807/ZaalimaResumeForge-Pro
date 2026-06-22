import React from 'react';

const CompactTemplate = ({ data, scale = 1, isPreview = false }) => {
  const { personalInfo, summary, experience, skills, education } = data;

  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: '210mm',
    minHeight: '297mm',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '9px'
  };

  const headerStyle = {
    padding: '15px 20px',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #1a1a1a'
  };

  const nameStyle = {
    fontSize: '18px',
    fontWeight: '700',
    letterSpacing: '0.5px'
  };

  const titleStyle = {
    fontSize: '11px',
    fontWeight: '600',
    color: '#4b5563',
    marginTop: '2px'
  };

  const contactRowStyle = {
    display: 'flex',
    gap: '15px',
    fontSize: '8px',
    color: '#6b7280'
  };

  const sectionRowStyle = {
    display: 'flex',
    borderBottom: '1px solid #e5e7eb'
  };

  const sectionLabelStyle = {
    width: '55px',
    padding: '10px 8px',
    backgroundColor: '#f9fafb',
    fontWeight: '700',
    fontSize: '8px',
    textTransform: 'uppercase',
    color: '#374151',
    borderRight: '1px solid #e5e7eb'
  };

  const sectionContentStyle = {
    flex: 1,
    padding: '10px 12px'
  };

  const dividerStyle = {
    borderBottom: '1px solid #cccccc',
    marginTop: '8px',
    marginBottom: '8px',
    width: '100%'
  };

  const jobRowStyle = {
    marginBottom: '8px'
  };

  const jobTitleStyle = {
    fontWeight: '600',
    fontSize: '9px'
  };

  const companyStyle = {
    color: '#4b5563',
    fontSize: '8px'
  };

  const dateStyle = {
    fontSize: '8px',
    color: '#9ca3af',
    marginLeft: '8px'
  };

  const achievementRowStyle = {
    fontSize: '8px',
    color: '#4b5563',
    paddingLeft: '10px',
    marginBottom: '2px'
  };

  const skillsRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px'
  };

  const skillStyle = {
    padding: '2px 6px',
    backgroundColor: '#f3f4f6',
    fontSize: '7px',
    borderRadius: '2px'
  };

  // Build visible sections array
  const sections = [];

  // Summary
  if (summary) {
    sections.push({
      key: 'summary',
      content: (
        <div style={sectionRowStyle}>
          <div style={sectionLabelStyle}>Profile</div>
          <div style={sectionContentStyle}>
            <p style={{ fontSize: '9px', lineHeight: '1.4' }}>{summary}</p>
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
        <div style={sectionRowStyle}>
          <div style={sectionLabelStyle}>Experience</div>
          <div style={sectionContentStyle}>
            {experience.map((job, index) => (
              <div key={index} style={jobRowStyle}>
                <div>
                  <span style={jobTitleStyle}>{job.title}</span>
                  <span style={companyStyle}> @ {job.company}</span>
                  <span style={dateStyle}>{job.startDate} - {job.endDate}</span>
                </div>
                {job.achievements && job.achievements.length > 0 && (
                  <div style={{ marginTop: '3px' }}>
                    {job.achievements.slice(0, 2).map((a, i) => (
                      <p key={i} style={achievementRowStyle}>• {a}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    });
  }

  // Skills
  if (skills) {
    sections.push({
      key: 'skills',
      content: (
        <div style={sectionRowStyle}>
          <div style={sectionLabelStyle}>Skills</div>
          <div style={sectionContentStyle}>
            <div style={skillsRowStyle}>
              {skills.technical?.map((skill, i) => (
                <span key={`t-${i}`} style={skillStyle}>{skill}</span>
              ))}
              {skills.soft?.slice(0, 4).map((skill, i) => (
                <span key={`s-${i}`} style={{ ...skillStyle, backgroundColor: '#e5e7eb' }}>{skill}</span>
              ))}
            </div>
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
        <div style={sectionRowStyle}>
          <div style={sectionLabelStyle}>Education</div>
          <div style={sectionContentStyle}>
            {education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '4px' }}>
                <span style={jobTitleStyle}>{edu.school}</span>
                <span style={companyStyle}> - {edu.degree}{edu.field ? ` (${edu.field})` : ''}</span>
                <span style={dateStyle}>{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      )
    });
  }

  return (
    <div style={isPreview ? { ...containerStyle, maxHeight: 'none', overflow: 'visible' } : containerStyle} className="compact-template">
      {/* Compact Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={nameStyle}>{personalInfo?.name || 'Your Name'}</h1>
          <p style={titleStyle}>{personalInfo?.title || 'Title'}</p>
        </div>
        <div style={contactRowStyle}>
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
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

export default CompactTemplate;
