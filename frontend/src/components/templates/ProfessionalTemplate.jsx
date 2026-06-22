import React from 'react';

const ProfessionalTemplate = ({ data, scale = 1, isPreview = false }) => {
  const { personalInfo, summary, experience, skills, education, achievements } = data;

  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: '210mm',
    minHeight: '297mm',
    backgroundColor: '#ffffff',
    color: '#1e293b',
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: '10px',
    lineHeight: '1.5'
  };

  const headerStyle = {
    backgroundColor: '#1e293b',
    color: '#ffffff',
    padding: '30px 35px',
    marginBottom: '25px'
  };

  const nameStyle = {
    fontSize: '26px',
    fontWeight: '700',
    letterSpacing: '1px',
    marginBottom: '6px'
  };

  const titleStyle = {
    fontSize: '13px',
    fontWeight: '400',
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '15px'
  };

  const contactStyle = {
    display: 'flex',
    gap: '25px',
    fontSize: '9px',
    opacity: 0.85,
    flexWrap: 'wrap'
  };

  const sectionStyle = {
    padding: '0 35px',
    marginBottom: '22px'
  };

  const sectionTitleStyle = {
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#1e293b',
    borderBottom: '1px solid #cbd5e1',
    paddingBottom: '8px',
    marginBottom: '14px'
  };

  const dividerStyle = {
    borderBottom: '1px solid #cccccc',
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '35px',
    marginRight: '35px',
    width: 'calc(100% - 70px)'
  };

  const contentStyle = {
    fontSize: '10px',
    color: '#334155'
  };

  const jobHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px'
  };

  const jobTitleStyle = {
    fontWeight: '700',
    fontSize: '11px'
  };

  const companyStyle = {
    fontStyle: 'italic',
    color: '#475569'
  };

  const dateStyle = {
    fontSize: '9px',
    color: '#64748b'
  };

  const bulletedItemStyle = {
    marginBottom: '5px',
    paddingLeft: '10px'
  };

  // Build visible sections array
  const sections = [];

  // Summary
  if (summary) {
    sections.push({
      key: 'summary',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Professional Profile</h2>
          <p style={contentStyle}>{summary}</p>
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
          <h2 style={sectionTitleStyle}>Professional Experience</h2>
          {experience.map((job, index) => (
            <div key={index} style={{ marginBottom: '18px' }}>
              <div style={jobHeaderStyle}>
                <div>
                  <p style={jobTitleStyle}>{job.title}</p>
                  <p style={companyStyle}>{job.company} | {job.location}</p>
                </div>
                <p style={dateStyle}>{job.startDate} — {job.endDate}</p>
              </div>
              {job.achievements && job.achievements.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                  {job.achievements.map((achievement, i) => (
                    <li key={i} style={bulletedItemStyle}>{achievement}</li>
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
          <h2 style={sectionTitleStyle}>Core Competencies</h2>
          <p style={contentStyle}>
            {skills.technical?.join(' • ')}
          </p>
          {skills.soft?.length > 0 && (
            <p style={{ ...contentStyle, marginTop: '6px', color: '#64748b' }}>
              {skills.soft?.join(' • ')}
            </p>
          )}
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
          <h2 style={sectionTitleStyle}>Education & Credentials</h2>
          {education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <div style={jobHeaderStyle}>
                <p style={{ fontWeight: '700', fontSize: '10px' }}>{edu.school}</p>
                <p style={dateStyle}>{edu.year}</p>
              </div>
              <p style={companyStyle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
            </div>
          ))}
        </div>
      )
    });
  }

  // Achievements
  if (achievements && achievements.length > 0) {
    sections.push({
      key: 'achievements',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Notable Achievements</h2>
          <ul style={{ margin: 0, paddingLeft: '18px' }}>
            {achievements.map((achievement, i) => (
              <li key={i} style={{ ...bulletedItemStyle, fontStyle: 'italic' }}>{achievement}</li>
            ))}
          </ul>
        </div>
      )
    });
  }

  return (
    <div style={isPreview ? { ...containerStyle, maxHeight: 'none', overflow: 'visible' } : containerStyle} className="professional-template">
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={nameStyle}>{personalInfo?.name || 'Your Name'}</h1>
        <p style={titleStyle}>{personalInfo?.title || 'Professional Title'}</p>
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

export default ProfessionalTemplate;
