import React from 'react';

const KoushikTemplate = ({ data, scale = 1, isPreview = false }) => {
    const {
        personalInfo,
        education,
        skills,
        experience,
        projects
    } = data || {};

    const name = personalInfo?.fullName || 'Aarav Sharma';
    const email = personalInfo?.email || 'aarav.sharma2025@gmail.com';
    const phone = personalInfo?.phone || '+91-9876543210';
    const linkedin = personalInfo?.linkedin || 'linkedin.com/in/aaravsharma2025';
    const github = personalInfo?.github || 'github.com/aaravsharma2025';

    const educationData = education?.length > 0 ? education : [
        {
            institution: 'VNR Vignana Jyothi Institute of Engineering, Hyderabad',
            degree: 'Bachelor of Technology (B.Tech)',
            field: 'Computer Science and Engineering',
            gpa: '8.45 / 10.00',
            startDate: 'Aug 2021',
            endDate: 'May 2025'
        },
        {
            institution: 'Sri Chaitanya Junior College, Hyderabad',
            degree: 'Intermediate (Class XII)',
            field: 'Mathematics, Physics, Chemistry',
            gpa: '9.62 / 10.00',
            startDate: 'Jun 2019',
            endDate: 'Mar 2021'
        }
    ];

    const skillsData = skills?.length > 0 ? skills : [
        { category: 'Programming Languages', items: 'Java, Python, C++, JavaScript' },
        { category: 'Frontend', items: 'React.js, HTML5, CSS3, Tailwind CSS' },
        { category: 'Backend', items: 'Node.js, Express.js, Spring Boot, REST APIs' },
        { category: 'Database', items: 'MySQL, MongoDB, PostgreSQL' },
        { category: 'Tools & Platforms', items: 'Git, GitHub, Docker, AWS, VS Code, Postman' }
    ];

    const internshipData = experience?.length > 0 ? experience : [
        {
            company: 'Tech Mahindra, Hyderabad',
            role: 'Full Stack Development Intern',
            startDate: 'Jan 2025',
            endDate: 'Apr 2025',
            achievements: [
                'Developed responsive web applications using React.js and Node.js, improving page load time by 25%.',
                'Collaborated with a 6-member team on version control, code reviews, and agile sprint delivery.'
            ]
        },
        {
            company: 'Wipro TalentNext, Remote',
            role: 'Java Developer Intern',
            startDate: 'Jun 2024',
            endDate: 'Aug 2024',
            achievements: [
                'Built RESTful APIs using Java and Spring Boot with MySQL, handling 1000+ daily requests.',
                'Implemented unit and integration tests achieving 90% code coverage across service modules.'
            ]
        }
    ];

    const projectsData = projects?.length > 0 ? projects : [
        {
            name: 'Smart Campus Portal',
            achievements: [
                'Built a full-stack campus management platform with attendance tracking, notices, and result analytics for 2000+ students.',
                'Implemented role-based authentication and REST APIs with React frontend and Node.js backend.'
            ],
            techStack: 'React.js, Node.js, Express.js, MongoDB'
        },
        {
            name: 'CodePractice Hub',
            achievements: [
                'Developed an online coding practice platform with 150+ problems, real-time code execution, and leaderboard ranking.',
                'Integrated judge API for multi-language support and automated test-case evaluation with 95% accuracy.'
            ],
            techStack: 'React.js, Java, Spring Boot, PostgreSQL'
        },
        {
            name: 'Expense Tracker App',
            achievements: [
                'Created a personal finance tracker with category-wise analytics, budget alerts, and CSV export functionality.',
                'Designed responsive UI with charts and secure JWT-based user authentication.'
            ],
            techStack: 'React.js, Python, Flask, SQLite'
        }
    ];

    const certificationsData = data?.certifications?.length > 0 ? data.certifications : [
        { name: 'Java Programming — HackerRank (Gold Badge), 2024' },
        { name: 'Python for Everybody — Coursera (University of Michigan), 2023' },
        { name: 'AWS Cloud Practitioner Essentials — AWS Training, 2024' },
        { name: 'Full Stack Development — NPTEL (IIT Madras), 2023' }
    ];

    const codingProfilesData = data?.codingProfiles?.length > 0 ? data.codingProfiles : [
        { platform: 'LeetCode', detail: '350+ problems solved | Rating 1,620 | Top 20% Global' },
        { platform: 'HackerRank', detail: 'Gold Badge in Java | 5-Star in Python | 180+ problems solved' },
        { platform: 'GeeksforGeeks', detail: '250+ problems solved | Institute Rank #15 | Potd streak 60+ days' },
        { platform: 'CodeChef', detail: '2-Star coder | 120+ problems solved | Long Challenge participant' }
    ];

    const hackathonsData = data?.hackathons?.length > 0 ? data.hackathons : [
        'Smart India Hackathon 2024 — Finalist, built a disaster-alert prototype among 40+ competing teams.',
        'College Hackathon 2023 — Won 2nd Place, developed a real-time quiz platform for 50+ participants.',
        'CodeFest 2023 — Participated in a 24-hour coding marathon focused on algorithmic problem solving.'
    ];

    const fonts = "'Calibri', 'Inter', 'Helvetica', 'Arial', sans-serif";

    const page = {
        width: '210mm',
        maxHeight: '297mm',
        overflow: 'hidden',
        background: '#ffffff',
        fontFamily: fonts,
        color: '#1a1a1a',
        padding: '12mm 15mm 8mm 15mm',
        boxSizing: 'border-box',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        position: 'relative',
        lineHeight: '1.35'
    };

    const nameStyle = {
        fontSize: '20px',
        fontWeight: '700',
        letterSpacing: '-0.3px',
        color: '#000000',
        lineHeight: '1.1',
        marginBottom: '2px',
        textAlign: 'center'
    };

    const contactStyle = {
        fontSize: '8.5px',
        color: '#444444',
        lineHeight: '1.45',
        marginBottom: '6px',
        letterSpacing: '0.1px',
        textAlign: 'center'
    };

    const contactLink = {
        color: '#444444',
        textDecoration: 'none'
    };

    const sectionTitle = {
        fontSize: '10px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#000000',
        borderBottom: '1.5px solid #222222',
        paddingBottom: '2px',
        marginBottom: '4px',
        marginTop: '0px',
        lineHeight: '1'
    };

    const sectionWrap = {
        marginBottom: '6px'
    };

    const dividerStyle = {
        borderBottom: '1px solid #cccccc',
        marginTop: '8px',
        marginBottom: '8px',
        width: '100%'
    };

    const bulletStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        color: '#1a1a1a',
        paddingLeft: '10px',
        position: 'relative',
        marginBottom: '1px'
    };

    const bulletDot = {
        position: 'absolute',
        left: '0px',
        top: '4px',
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: '#333333'
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
        marginLeft: '4px'
    };

    const dateStyle = {
        fontSize: '8.5px',
        color: '#555555',
        fontWeight: '500',
        whiteSpace: 'nowrap'
    };

    const projectHeaderStyle = {
        fontSize: '9.5px',
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
        fontStyle: 'normal'
    };

    const skillCategoryStyle = {
        fontSize: '8.5px',
        lineHeight: '1.42',
        marginBottom: '1px',
        color: '#1a1a1a'
    };

    const skillLabelStyle = {
        fontWeight: '700',
        color: '#000000',
        marginRight: '3px'
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
        fontSize: '8.5px',
        color: '#555555',
        marginBottom: '0.5px',
        lineHeight: '1.3'
    };

    const certItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        color: '#1a1a1a',
        marginBottom: '1px'
    };

    const codingProfileItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        marginBottom: '1px',
        color: '#1a1a1a'
    };

    const codingPlatformStyle = {
        fontWeight: '700',
        color: '#000000',
        marginRight: '4px'
    };

    const hackathonItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        color: '#1a1a1a',
        paddingLeft: '10px',
        position: 'relative',
        marginBottom: '1px'
    };

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
                                <span style={dateStyle}>
                                    {edu.startDate && edu.endDate ? `${edu.startDate} — ${edu.endDate}` : edu.endDate || ''}
                                </span>
                            </div>
                            <div style={eduDetailStyle}>
                                {edu.degree}{edu.field ? ` in ${edu.field}` : ''}{edu.gpa ? ` | CGPA: ${edu.gpa}` : ''}
                            </div>
                        </div>
                    ))}
                </div>
            )
        });
    }

    // Technical Skills
    if (skillsData && skillsData.length > 0) {
        sections.push({
            key: 'skills',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Technical Skills</div>
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

    // Internships
    if (internshipData && internshipData.length > 0) {
        sections.push({
            key: 'internships',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Internships</div>
                    {internshipData.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '4px' }}>
                            <div style={jobHeaderStyle}>
                                <span>
                                    <span style={companyStyle}>{exp.company}</span>
                                    <span style={roleLocationStyle}> · {exp.role || exp.position}</span>
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

    // Projects
    if (projectsData && projectsData.length > 0) {
        sections.push({
            key: 'projects',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Projects</div>
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
                                    <span style={{ fontWeight: '600', color: '#555555' }}>Tech Stack:</span> {proj.techStack}
                                </div>
                            )}
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
                            {cert.name}
                        </div>
                    ))}
                </div>
            )
        });
    }

    // Competitive Programming & Coding Profiles
    if (codingProfilesData && codingProfilesData.length > 0) {
        sections.push({
            key: 'codingProfiles',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Competitive Programming & Coding Profiles</div>
                    {codingProfilesData.map((profile, i) => (
                        <div key={i} style={codingProfileItemStyle}>
                            <span style={codingPlatformStyle}>{profile.platform}:</span>
                            <span>{profile.detail}</span>
                        </div>
                    ))}
                </div>
            )
        });
    }

    // Hackathons
    if (hackathonsData && hackathonsData.length > 0) {
        sections.push({
            key: 'hackathons',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Hackathons</div>
                    {hackathonsData.map((item, i) => (
                        <div key={i} style={hackathonItemStyle}>
                            <div style={bulletDot} />
                            {item}
                        </div>
                    ))}
                </div>
            )
        });
    }

    return (
        <div style={isPreview ? { ...page, maxHeight: 'none', overflow: 'visible' } : page}>
            <div style={nameStyle}>{name}</div>
            <div style={contactStyle}>
                <span>{email}</span>
                <span style={{ margin: '0 6px', color: '#cccccc' }}>|</span>
                <span>{phone}</span>
                <span style={{ margin: '0 6px', color: '#cccccc' }}>|</span>
                <span style={contactLink}>{linkedin}</span>
                <span style={{ margin: '0 6px', color: '#cccccc' }}>|</span>
                <span style={contactLink}>{github}</span>
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

export default KoushikTemplate;
