import React from 'react';

const ModernTemplate = ({ data, scale = 1, isPreview = false }) => {
  const { personalInfo, summary, experience, skills, education } = data;

  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: '210mm',
    minHeight: '297mm',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '10px',
    display: 'flex'
  };

  const sidebarStyle = {
    width: '35%',
    minHeight: '297mm',
    backgroundColor: '#f8fafc',
    borderRight: '1px solid #e2e8f0'
  };

  const mainStyle = {
    flex: 1,
    padding: '25px'
  };

  const profileImageStyle = {
    width: '70px',
    height: '70px',
    backgroundColor: '#cbd5e1',
    borderRadius: '50%',
    margin: '25px auto 15px'
  };

  const nameStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: '4px'
  };

  const titleStyle = {
    fontSize: '12px',
    color: '#3b82f6',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '15px'
  };

  const sidebarSectionStyle = {
    padding: '15px 20px',
    borderBottom: '1px solid #e2e8f0'
  };

  const sidebarTitleStyle = {
    fontSize: '10px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#0f172a',
    marginBottom: '10px'
  };

  const contactItemStyle = {
    fontSize: '9px',
    color: '#64748b',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const skillBarStyle = {
    height: '6px',
    backgroundColor: '#e2e8f0',
    borderRadius: '3px',
    marginBottom: '8px',
    overflow: 'hidden'
  };

  const skillBarFillStyle = (width) => ({
    height: '100%',
    width: width,
    backgroundColor: '#3b82f6',
    borderRadius: '3px'
  });

  const sectionStyle = {
    marginBottom: '20px'
  };

  const sectionTitleStyle = {
    fontSize: '12px',
    fontWeight: '700',
    color: '#0f172a',
    borderBottom: '2px solid #3b82f6',
    paddingBottom: '6px',
    marginBottom: '12px'
  };

  const dividerStyle = {
    borderBottom: '1px solid #cccccc',
    marginTop: '10px',
    marginBottom: '10px',
    width: '100%'
  };

  const jobTitleStyle = {
    fontWeight: '600',
    fontSize: '11px',
    color: '#1e293b'
  };

  const companyStyle = {
    color: '#3b82f6',
    fontSize: '10px',
    fontWeight: '500',
    marginBottom: '4px'
  };

  const dateStyle = {
    fontSize: '9px',
    color: '#94a3b8',
    marginBottom: '8px'
  };

  // Build main content sections
  const mainSections = [];

  // Summary
  if (summary) {
    mainSections.push({
      key: 'summary',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>About Me</h2>
          <p style={{ fontSize: '10px', color: '#475569', lineHeight: '1.6' }}>{summary}</p>
        </div>
      )
    });
  }

  // Experience
  if (experience && experience.length > 0) {
    mainSections.push({
      key: 'experience',
      content: (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Work Experience</h2>
          {experience.map((job, index) => (
            <div key={index} style={{ marginBottom: '18px' }}>
              <p style={jobTitleStyle}>{job.title}</p>
              <p style={companyStyle}>{job.company}</p>
              <p style={dateStyle}>{job.startDate} – {job.endDate}</p>
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

  return (
    <div style={isPreview ? { ...containerStyle, maxHeight: 'none', overflow: 'visible' } : containerStyle} className="modern-template">
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={profileImageStyle} />
        <h1 style={nameStyle}>{personalInfo?.name || 'Your Name'}</h1>
        <p style={titleStyle}>{personalInfo?.title || 'Professional Title'}</p>

        {/* Contact */}
        <div style={sidebarSectionStyle}>
          <h3 style={sidebarTitleStyle}>Contact</h3>
          {personalInfo?.email && (
            <p style={contactItemStyle}>
              <span>✉</span> {personalInfo.email}
            </p>
          )}
          {personalInfo?.phone && (
            <p style={contactItemStyle}>
              <span>☎</span> {personalInfo.phone}
            </p>
          )}
          {personalInfo?.location && (
            <p style={contactItemStyle}>
              <span>📍</span> {personalInfo.location}
            </p>
          )}
          {personalInfo?.linkedin && (
            <p style={contactItemStyle}>
              <span>🔗</span> {personalInfo.linkedin}
            </p>
          )}
        </div>

        {/* Skills */}
        {skills && !(data?.hiddenSections || []).includes('skills') && (
          <div style={sidebarSectionStyle}>
            <h3 style={sidebarTitleStyle}>Skills</h3>
            {skills.technical?.slice(0, 6).map((skill, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <p style={{ fontSize: '9px', color: '#475569', marginBottom: '4px' }}>{skill}</p>
                <div style={skillBarStyle}>
                  <div style={skillBarFillStyle(`${90 - i * 10}%`)} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && !(data?.hiddenSections || []).includes('education') && (
          <div style={{ ...sidebarSectionStyle, borderBottom: 'none' }}>
            <h3 style={sidebarTitleStyle}>Education</h3>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <p style={{ fontSize: '9px', fontWeight: '600', color: '#1e293b' }}>{edu.school}</p>
                <p style={{ fontSize: '8px', color: '#64748b' }}>{edu.degree} in {edu.field}</p>
                <p style={{ fontSize: '8px', color: '#94a3b8' }}>{edu.year}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={mainStyle}>
        {mainSections.filter(s => !(data?.hiddenSections || []).includes(s.key)).map((section, index, arr) => (
          <React.Fragment key={section.key}>
            {section.content}
            {index < arr.length - 1 && <div style={dividerStyle} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ModernTemplate;
