import React from 'react';

const ExecutiveTemplate = ({ data, scale = 1, isPreview = false }) => {
  const { personalInfo, summary, experience, skills, education, achievements } = data;

  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: '210mm',
    minHeight: '297mm',
    backgroundColor: '#0f0f0f',
    color: '#ffffff',
    fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
    fontSize: '10px'
  };

  const headerStyle = {
    backgroundColor: '#ffffff',
    padding: '35px',
    margin: '20px',
    borderRadius: '8px'
  };

  const nameStyle = {
    fontSize: '30px',
    fontWeight: '700',
    color: '#000000',
    letterSpacing: '1px',
    marginBottom: '4px'
  };

  const titleStyle = {
    fontSize: '13px',
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    marginBottom: '20px'
  };

  const contactStyle = {
    display: 'flex',
    gap: '20px',
    fontSize: '9px',
    color: '#333333'
  };

  const sectionStyle = {
    margin: '20px'
  };

  const sectionTitleStyle = {
    fontSize: '11px',
    fontWeight: '700',
    color: '#c0a062',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    borderBottom: '1px solid #333333',
    paddingBottom: '8px',
    marginBottom: '15px'
  };

  const dividerStyle = {
    borderBottom: '1px solid #333333',
    marginTop: '10px',
    marginBottom: '10px',
    width: 'calc(100% - 40px)',
    marginLeft: '20px',
    marginRight: '20px'
  };

  const contentStyle = {
    color: '#e5e5e5'
  };

  const jobHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px'
  };

  const jobTitleStyle = {
    fontWeight: '700',
    fontSize: '12px',
    color: '#ffffff'
  };

  const companyStyle = {
    color: '#c0a062',
    fontStyle: 'italic',
    fontSize: '10px'
  };

  const dateStyle = {
    fontSize: '9px',
    color: '#888888'
  };

  const bulletedItemStyle = {
    marginBottom: '6px',
    paddingLeft: '12px',
    color: '#cccccc',
    fontSize: '10px'
  };

  const achievementStyle = {
    color: '#c0a062',
    fontSize: '10px',
    marginBottom: '4px',
    fontStyle: 'italic'
  };

  // Build visible sections array
  const sections = [];

  // Summary
  if (summary) {
    sections.push({
      key: 'summary',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Executive Summary</h2>
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
            <div key={index} style={{ marginBottom: '20px' }}>
              <div style={jobHeaderStyle}>
                <div>
                  <p style={jobTitleStyle}>{job.title}</p>
                  <p style={companyStyle}>{job.company}</p>
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

  // Key Achievements
  if (achievements && achievements.length > 0) {
    sections.push({
      key: 'achievements',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Distinguished Achievements</h2>
          {achievements.slice(0, 4).map((achievement, i) => (
            <p key={i} style={achievementStyle}>★ {achievement}</p>
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
          <h2 style={sectionTitleStyle}>Leadership Competencies</h2>
          <p style={{ ...contentStyle, fontSize: '10px' }}>
            {skills.technical?.join(' • ')}
          </p>
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
          <h2 style={sectionTitleStyle}>Academic Credentials</h2>
          {education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <p style={{ ...contentStyle, fontWeight: '600' }}>{edu.school}</p>
              <p style={{ fontSize: '10px', color: '#888888' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}, {edu.year}</p>
            </div>
          ))}
        </div>
      )
    });
  }

  return (
    <div style={isPreview ? { ...containerStyle, maxHeight: 'none', overflow: 'visible' } : containerStyle} className="executive-template">
      {/* White Header Card */}
      <div style={headerStyle}>
        <h1 style={nameStyle}>{personalInfo?.name || 'Your Name'}</h1>
        <p style={titleStyle}>{personalInfo?.title || 'Executive Title'}</p>
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

export default ExecutiveTemplate;
