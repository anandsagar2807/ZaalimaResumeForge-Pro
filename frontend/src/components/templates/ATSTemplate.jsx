import React from 'react';

const ATSTemplate = ({ data, scale = 1, isPreview = false }) => {
  const { personalInfo, summary, experience, skills, education } = data;

  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: '210mm',
    minHeight: '297mm',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '11px',
    lineHeight: '1.3',
    padding: '20mm'
  };

  const sectionStyle = {
    marginBottom: '15px'
  };

  const headerStyle = {
    fontSize: '14px',
    fontWeight: '700',
    marginBottom: '3px'
  };

  const subHeaderStyle = {
    fontSize: '11px',
    marginBottom: '10px'
  };

  const contactStyle = {
    fontSize: '10px',
    marginBottom: '15px'
  };

  const sectionTitleStyle = {
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: '8px',
    borderBottom: '1px solid #000000',
    paddingBottom: '2px'
  };

  const dividerStyle = {
    borderBottom: '1px solid #cccccc',
    marginTop: '10px',
    marginBottom: '10px',
    width: '100%'
  };

  const jobHeaderStyle = {
    marginBottom: '5px'
  };

  const jobTitleStyle = {
    fontWeight: '700',
    fontSize: '11px'
  };

  const companyStyle = {
    fontSize: '11px'
  };

  const dateStyle = {
    fontSize: '10px',
    fontStyle: 'italic'
  };

  const bulletStyle = {
    marginLeft: '15px',
    marginBottom: '3px'
  };

  const inlineSkillStyle = {
    marginRight: '15px'
  };

  // Build visible sections array
  const sections = [];

  // Summary
  if (summary) {
    sections.push({
      key: 'summary',
      content: (
        <div style={sectionStyle}>
          <p style={sectionTitleStyle}>PROFESSIONAL SUMMARY</p>
          <p>{summary}</p>
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
          <p style={sectionTitleStyle}>SKILLS</p>
          <p>
            {skills.technical?.map((skill, i) => (
              <span key={i} style={inlineSkillStyle}>{skill}</span>
            ))}
          </p>
          {skills.soft?.length > 0 && (
            <p style={{ marginTop: '5px' }}>
              {skills.soft?.map((skill, i) => (
                <span key={`s-${i}`} style={inlineSkillStyle}>{skill}</span>
              ))}
            </p>
          )}
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
          <p style={sectionTitleStyle}>WORK HISTORY</p>
          {experience.map((job, index) => (
            <div key={index}>
              <div style={jobHeaderStyle}>
                <span style={jobTitleStyle}>{job.title}</span>
                <span>, {job.company}</span>
              </div>
              <div>
                <span style={dateStyle}>{job.startDate} to {job.endDate}</span>
                {job.location && <span> | {job.location}</span>}
              </div>
              {job.achievements && job.achievements.length > 0 && (
                <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                  {job.achievements.map((achievement, i) => (
                    <li key={i} style={bulletStyle}>{achievement}</li>
                  ))}
                </ul>
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
          <p style={sectionTitleStyle}>EDUCATION</p>
          {education.map((edu, index) => (
            <div key={index}>
              <span style={jobTitleStyle}>{edu.school}</span>
              <span>, {edu.degree}</span>
              {edu.field && <span> in {edu.field}</span>}
              <span>, {edu.year}</span>
            </div>
          ))}
        </div>
      )
    });
  }

  return (
    <div style={isPreview ? { ...containerStyle, maxHeight: 'none', overflow: 'visible' } : containerStyle} className="ats-template">
      {/* Header */}
      <div>
        <p style={headerStyle}>{personalInfo?.name || 'YOUR NAME'}</p>
        <p style={subHeaderStyle}>{personalInfo?.title || 'PROFESSIONAL TITLE'}</p>
        <p style={contactStyle}>
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span> | {personalInfo.phone}</span>}
          {personalInfo?.location && <span> | {personalInfo.location}</span>}
          {personalInfo?.linkedin && <span> | {personalInfo.linkedin}</span>}
        </p>
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

export default ATSTemplate;
