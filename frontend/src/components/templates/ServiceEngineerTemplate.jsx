import React from 'react';

const ServiceEngineerTemplate = ({ data, scale = 1, isPreview = false }) => {
    const {
        personalInfo,
        education,
        skills,
        experience,
        projects
    } = data || {};

    // ── Fallback / Demo Data ──
    const name = personalInfo?.fullName || 'Arjun Mehta';
    const email = personalInfo?.email || 'arjun.mehta2024@gmail.com';
    const phone = personalInfo?.phone || '+91-9876543210';
    const linkedin = personalInfo?.linkedin || 'linkedin.com/in/arjunmehta2024';
    const github = personalInfo?.github || 'github.com/arjunmehta-dev';
    const location = personalInfo?.location || personalInfo?.address || 'Bangalore, Karnataka';

    const educationData = education?.length > 0 ? education : [
        {
            institution: 'Vellore Institute of Technology (VIT), Vellore',
            degree: 'Bachelor of Technology',
            field: 'Computer Science and Engineering',
            gpa: '8.72 / 10.00',
            startDate: 'Jul 2020',
            endDate: 'May 2024'
        },
        {
            institution: 'Kendriya Vidyalaya, Bangalore',
            degree: 'Class XII (CBSE)',
            field: 'Science — Mathematics, Physics, Chemistry',
            gpa: '92.4%',
            startDate: 'Apr 2018',
            endDate: 'Mar 2020'
        },
        {
            institution: 'Kendriya Vidyalaya, Bangalore',
            degree: 'Class X (CBSE)',
            field: 'All Subjects',
            gpa: '95.2%',
            startDate: 'Apr 2016',
            endDate: 'Mar 2018'
        }
    ];

    const skillsData = skills?.length > 0 ? skills : [
        { category: 'Programming Languages', items: 'Java, Python, C++, JavaScript, SQL' },
        { category: 'Web Development', items: 'React.js, Node.js, Express.js, HTML5, CSS3, REST APIs' },
        { category: 'Databases & Cloud', items: 'MySQL, MongoDB, AWS (EC2, S3), Firebase, Docker' },
        { category: 'Tools & Methodologies', items: 'Git, GitHub, VS Code, Postman, Agile, Jira, CI/CD' },
        { category: 'Core Concepts', items: 'Data Structures & Algorithms, OOP, DBMS, Operating Systems, System Design' }
    ];

    const internshipData = experience?.length > 0 ? experience : [
        {
            company: 'Accenture Solutions Pvt. Ltd.',
            role: 'Software Engineering Intern',
            location: 'Bangalore',
            startDate: 'Jan 2024',
            endDate: 'Apr 2024',
            achievements: [
                'Developed and deployed microservice-based order processing module using Java Spring Boot, reducing manual intervention by 40% across 3 business units.',
                'Implemented RESTful API endpoints with JWT authentication and MySQL integration, achieving 99.5% uptime and passing 200+ integration test cases.'
            ]
        },
        {
            company: 'Cognizant Technology Solutions',
            role: 'Full Stack Developer Intern',
            location: 'Chennai',
            startDate: 'Jun 2023',
            endDate: 'Aug 2023',
            achievements: [
                'Built responsive client dashboard using React.js and Node.js with real-time analytics visualization for 150+ enterprise users.',
                'Optimized database query performance by 35% through indexing strategies and query refactoring on PostgreSQL with 1M+ records.'
            ]
        }
    ];

    const projectsData = projects?.length > 0 ? projects : [
        {
            name: 'AI Resume Analyzer',
            achievements: [
                'Built intelligent resume screening tool using Python NLP pipeline to extract skills, compute ATS compatibility scores, and generate improvement recommendations with 87% accuracy.',
                'Designed keyword matching algorithm and PDF/DOCX parser supporting 100+ resume formats, deployed as Flask REST API with SQLite backend for batch processing.'
            ],
            techStack: 'Python, Flask, NLTK, spaCy, SQLite, HTML/CSS'
        },
        {
            name: 'Smart Inventory Management System',
            achievements: [
                'Developed full-stack inventory tracking platform with real-time stock alerts, automated reorder triggers, and supplier management dashboard for 5 warehouse locations.',
                'Implemented role-based access control, PDF report generation, and predictive demand forecasting using historical sales data, reducing overstock by 25%.'
            ],
            techStack: 'Java, Spring Boot, MySQL, Thymeleaf, Bootstrap, JasperReports'
        },
        {
            name: 'Online Examination Portal',
            achievements: [
                'Created secure examination platform with timer-based quiz engine, auto-grading system, and anti-cheating mechanisms supporting 300+ concurrent test sessions.',
                'Built admin panel for question bank management, result analytics with percentile rankings, and automated email notifications using Node.js mailer service.'
            ],
            techStack: 'React.js, Node.js, Express.js, MongoDB, Socket.io, JWT'
        }
    ];

    const certificationsData = data?.certifications?.length > 0 ? data.certifications : [
        { name: 'AWS Certified Cloud Practitioner — Amazon Web Services', date: '2024' },
        { name: 'Java Programming (Gold Badge) — HackerRank', date: '2023' },
        { name: 'Python for Everybody — Coursera (University of Michigan)', date: '2023' },
        { name: 'Full Stack Web Development — Infosys Springboard', date: '2023' },
        { name: 'Data Structures & Algorithms — NPTEL (IIT Madras)', date: '2022' }
    ];

    const codingProfilesData = data?.codingProfiles?.length > 0 ? data.codingProfiles : [
        { platform: 'LeetCode', detail: '500+ problems solved | Rating 1,720 | Top 12% Global' },
        { platform: 'HackerRank', detail: '5★ in Java & SQL | Gold Badge | 250+ problems' },
        { platform: 'GeeksforGeeks', detail: '350+ problems | Institute Rank #8 | 100+ day streak' },
        { platform: 'CodeChef', detail: '3★ Coder | 180+ problems | Long Challenge participant' }
    ];

    const achievementsData = data?.achievements?.length > 0 ? data.achievements : [
        'Solved 500+ DSA problems across LeetCode, GFG, and HackerRank — ranked among top 12% globally on LeetCode.',
        'Secured 1st Place in VIT Inter-College Hackathon 2023 — built AI-powered document verification system in 24 hours.',
        'Smart India Hackathon 2022 Finalist — developed rural healthcare tracking prototype for Ministry of Health.',
        'Academic Excellence Award — CGPA 8.72, ranked top 8% in CSE department across 4 semesters.'
    ];

    const extraCurricularData = data?.extraCurricular?.length > 0 ? data.extraCurricular : [
        'Technical Secretary — CSE Department Club (organized 10+ workshops on DSA, cloud computing, and system design for 300+ students).',
        'Open Source Contributor — contributed to 3 GitHub repositories with 15+ merged PRs in documentation and feature development.',
        'Volunteer — National Service Scheme (NSS) — led 4 community drives including digital literacy program for rural schools.'
    ];

    // ── Design System ──
    const fonts = "'Inter', 'Calibri', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

    const page = {
        width: '210mm',
        maxHeight: '297mm',
        overflow: 'hidden',
        background: '#ffffff',
        fontFamily: fonts,
        color: '#1d1d1d',
        padding: '36px 32px 28px 32px',
        boxSizing: 'border-box',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        position: 'relative',
        lineHeight: '1.4'
    };

    // ── Divider ──
    const divider = {
        borderBottom: '1px solid #d0d0d0',
        marginBottom: '8px',
        marginTop: '10px'
    };

    // ── Header Styles ──
    const nameStyle = {
        fontSize: '22px',
        fontWeight: '700',
        letterSpacing: '-0.5px',
        color: '#000000',
        lineHeight: '1.15',
        marginBottom: '4px',
        textAlign: 'center'
    };

    const contactRowStyle = {
        fontSize: '9px',
        color: '#555555',
        lineHeight: '1.5',
        marginBottom: '0px',
        letterSpacing: '0.2px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0px'
    };

    const contactItemStyle = {
        color: '#555555',
        textDecoration: 'none'
    };

    const contactSeparator = {
        margin: '0 8px',
        color: '#c0c0c0',
        fontSize: '9px'
    };

    // ── Section Styles ──
    const sectionTitleStyle = {
        fontSize: '10.5px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        color: '#000000',
        lineHeight: '1',
        marginBottom: '6px',
        marginTop: '0px'
    };

    const sectionWrapStyle = {
        marginBottom: '2px'
    };

    // ── Education Styles ──
    const eduRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '1px',
        lineHeight: '1'
    };

    const eduInstitutionStyle = {
        fontSize: '9.5px',
        fontWeight: '700',
        color: '#000000'
    };

    const eduDateStyle = {
        fontSize: '8.5px',
        color: '#666666',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        textAlign: 'right'
    };

    const eduDetailStyle = {
        fontSize: '8.5px',
        color: '#555555',
        lineHeight: '1.35',
        marginBottom: '3px'
    };

    // ── Skills Styles ──
    const skillRowStyle = {
        fontSize: '8.5px',
        lineHeight: '1.45',
        marginBottom: '2px',
        color: '#1d1d1d',
        display: 'flex',
        alignItems: 'baseline'
    };

    const skillLabelStyle = {
        fontWeight: '700',
        color: '#000000',
        marginRight: '4px',
        minWidth: '130px',
        flexShrink: '0'
    };

    const skillValueStyle = {
        color: '#333333',
        fontWeight: '400'
    };

    // ── Internship Styles ──
    const internshipHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '2px',
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
        marginLeft: '4px',
        fontWeight: '500'
    };

    const dateStyle = {
        fontSize: '8.5px',
        color: '#666666',
        fontWeight: '500',
        whiteSpace: 'nowrap'
    };

    const bulletStyle = {
        fontSize: '8.5px',
        lineHeight: '1.42',
        color: '#1d1d1d',
        paddingLeft: '12px',
        position: 'relative',
        marginBottom: '1.5px'
    };

    const bulletDot = {
        position: 'absolute',
        left: '2px',
        top: '4px',
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: '#444444'
    };

    // ── Project Styles ──
    const projectTitleStyle = {
        fontSize: '9.5px',
        fontWeight: '700',
        color: '#000000',
        marginBottom: '2px',
        lineHeight: '1'
    };

    const techStackStyle = {
        fontSize: '7.5px',
        color: '#777777',
        marginTop: '2px',
        lineHeight: '1.3',
        fontStyle: 'normal',
        paddingLeft: '0px'
    };

    const techLabelStyle = {
        fontWeight: '600',
        color: '#555555'
    };

    // ── Certification Styles ──
    const certItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        color: '#1d1d1d',
        marginBottom: '1.5px'
    };

    const certNameStyle = {
        fontWeight: '700',
        color: '#000000'
    };

    const certDateStyle = {
        color: '#666666',
        fontWeight: '400'
    };

    // ── Coding Profile Styles ──
    const codingProfileStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        marginBottom: '1.5px',
        color: '#1d1d1d'
    };

    const codingPlatformStyle = {
        fontWeight: '700',
        color: '#000000',
        marginRight: '4px'
    };

    // ── Achievement Styles ──
    const achievementItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        color: '#1d1d1d',
        paddingLeft: '12px',
        position: 'relative',
        marginBottom: '1.5px'
    };

    // ── Extra-Curricular Styles ──
    const extraItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        color: '#1d1d1d',
        paddingLeft: '12px',
        position: 'relative',
        marginBottom: '1.5px'
    };

    // ── Render ──
    return (
        <div style={isPreview ? { ...page, maxHeight: 'none', overflow: 'visible' } : page}>
            {/* ══════════ HEADER ══════════ */}
            <div style={nameStyle}>{name}</div>
            <div style={contactRowStyle}>
                <span style={contactItemStyle}>{email}</span>
                <span style={contactSeparator}>|</span>
                <span style={contactItemStyle}>{phone}</span>
                <span style={contactSeparator}>|</span>
                <span style={contactItemStyle}>{linkedin}</span>
                <span style={contactSeparator}>|</span>
                <span style={contactItemStyle}>{github}</span>
                <span style={contactSeparator}>|</span>
                <span style={contactItemStyle}>{location}</span>
            </div>

            {/* ══════════ DIVIDER ══════════ */}
            {!(data?.hiddenSections || []).includes('education') && <div style={divider} />}

            {/* ══════════ EDUCATION ══════════ */}
            {!(data?.hiddenSections || []).includes('education') && <div style={sectionWrapStyle}>
                <div style={sectionTitleStyle}>Education</div>
                {educationData.map((edu, i) => (
                    <div key={i} style={{ marginBottom: '3px' }}>
                        <div style={eduRowStyle}>
                            <span style={eduInstitutionStyle}>{edu.institution}</span>
                            <span style={eduDateStyle}>{edu.startDate} — {edu.endDate}</span>
                        </div>
                        <div style={eduDetailStyle}>
                            {edu.degree} in {edu.field}{edu.gpa ? ` | CGPA: ${edu.gpa}` : ''}
                        </div>
                    </div>
                ))}
            </div>}

            {/* ══════════ DIVIDER ══════════ */}
            {!(data?.hiddenSections || []).includes('skills') && <div style={divider} />}

            {/* ══════════ TECHNICAL SKILLS ══════════ */}
            {!(data?.hiddenSections || []).includes('skills') && <div style={sectionWrapStyle}>
                <div style={sectionTitleStyle}>Technical Skills</div>
                {skillsData.map((skill, i) => (
                    <div key={i} style={skillRowStyle}>
                        <span style={skillLabelStyle}>{skill.category}:</span>
                        <span style={skillValueStyle}>{skill.items || skill.name}</span>
                    </div>
                ))}
            </div>}

            {/* ══════════ DIVIDER ══════════ */}
            {!(data?.hiddenSections || []).includes('internships') && <div style={divider} />}

            {/* ══════════ INTERNSHIPS ══════════ */}
            {!(data?.hiddenSections || []).includes('internships') && <div style={sectionWrapStyle}>
                <div style={sectionTitleStyle}>Internships</div>
                {internshipData.map((exp, i) => (
                    <div key={i} style={{ marginBottom: '5px' }}>
                        <div style={internshipHeaderStyle}>
                            <span>
                                <span style={companyStyle}>{exp.company}</span>
                                <span style={roleLocationStyle}> — {exp.role}, {exp.location}</span>
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
            </div>}

            {/* ══════════ DIVIDER ══════════ */}
            {!(data?.hiddenSections || []).includes('projects') && <div style={divider} />}

            {/* ══════════ PROJECTS ══════════ */}
            {!(data?.hiddenSections || []).includes('projects') && <div style={sectionWrapStyle}>
                <div style={sectionTitleStyle}>Projects</div>
                {projectsData.map((proj, i) => (
                    <div key={i} style={{ marginBottom: '5px' }}>
                        <div style={projectTitleStyle}>{proj.name}</div>
                        {(proj.achievements || []).map((a, j) => (
                            <div key={j} style={bulletStyle}>
                                <div style={bulletDot} />
                                {a}
                            </div>
                        ))}
                        {proj.techStack && (
                            <div style={techStackStyle}>
                                <span style={techLabelStyle}>Tech Stack:</span> {proj.techStack}
                            </div>
                        )}
                    </div>
                ))}
            </div>}

            {/* ══════════ DIVIDER ══════════ */}
            {!(data?.hiddenSections || []).includes('certifications') && <div style={divider} />}

            {/* ══════════ CERTIFICATIONS ══════════ */}
            {!(data?.hiddenSections || []).includes('certifications') && <div style={sectionWrapStyle}>
                <div style={sectionTitleStyle}>Certifications</div>
                {certificationsData.map((cert, i) => (
                    <div key={i} style={certItemStyle}>
                        <span style={certNameStyle}>{cert.name}</span>
                        {cert.date && <span style={certDateStyle}> — {cert.date}</span>}
                    </div>
                ))}
            </div>}

            {/* ══════════ DIVIDER ══════════ */}
            {!(data?.hiddenSections || []).includes('codingProfiles') && <div style={divider} />}

            {/* ══════════ CODING PROFILES ══════════ */}
            {!(data?.hiddenSections || []).includes('codingProfiles') && <div style={sectionWrapStyle}>
                <div style={sectionTitleStyle}>Coding Profiles</div>
                {codingProfilesData.map((profile, i) => (
                    <div key={i} style={codingProfileStyle}>
                        <span style={codingPlatformStyle}>{profile.platform}</span>
                        <span>{profile.detail}</span>
                    </div>
                ))}
            </div>}

            {/* ══════════ DIVIDER ══════════ */}
            {!(data?.hiddenSections || []).includes('achievements') && <div style={divider} />}

            {/* ══════════ ACHIEVEMENTS ══════════ */}
            {!(data?.hiddenSections || []).includes('achievements') && <div style={sectionWrapStyle}>
                <div style={sectionTitleStyle}>Achievements</div>
                {achievementsData.map((ach, i) => (
                    <div key={i} style={achievementItemStyle}>
                        <div style={bulletDot} />
                        {ach}
                    </div>
                ))}
            </div>}

            {/* ══════════ DIVIDER ══════════ */}
            {!(data?.hiddenSections || []).includes('extraCurricular') && <div style={divider} />}

            {/* ══════════ EXTRA-CURRICULAR ══════════ */}
            {!(data?.hiddenSections || []).includes('extraCurricular') && <div style={sectionWrapStyle}>
                <div style={sectionTitleStyle}>Extra-Curricular</div>
                {extraCurricularData.map((item, i) => (
                    <div key={i} style={extraItemStyle}>
                        <div style={bulletDot} />
                        {item}
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default ServiceEngineerTemplate;