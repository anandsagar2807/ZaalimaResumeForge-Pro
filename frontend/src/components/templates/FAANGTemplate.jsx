import React from 'react';

const FAANGTemplate = ({ data, scale = 1, isPreview = false }) => {
    const {
        personalInfo,
        education,
        skills,
        experience,
        projects
    } = data || {};

    // ── FAANG-level dummy / fallback data ──
    const name = personalInfo?.fullName || 'Vikram Suresh';
    const email = personalInfo?.email || 'vikram.suresh@gmail.com';
    const phone = personalInfo?.phone || '+1-415-555-0192';
    const linkedin = personalInfo?.linkedin || 'linkedin.com/in/vikramsuresh';
    const github = personalInfo?.github || 'github.com/vikramsuresh';
    const website = personalInfo?.website || 'vikramsuresh.dev';

    const educationData = education?.length > 0 ? education : [
        {
            institution: 'Stanford University',
            degree: 'Master of Science',
            field: 'Computer Science',
            gpa: '3.92 / 4.00',
            startDate: 'Sep 2023',
            endDate: 'Jun 2025'
        },
        {
            institution: 'Indian Institute of Technology, Bombay',
            degree: 'Bachelor of Technology',
            field: 'Computer Science and Engineering',
            gpa: '9.41 / 10.00',
            startDate: 'Aug 2019',
            endDate: 'May 2023'
        }
    ];

    const skillsData = skills?.length > 0 ? skills : [
        { category: 'Languages', items: 'Python, C++, Java, TypeScript, Go, Rust, SQL' },
        { category: 'Frameworks', items: 'React, Next.js, Django, FastAPI, Express, Spring Boot' },
        { category: 'Infrastructure', items: 'AWS, GCP, Docker, Kubernetes, Terraform, CI/CD, Redis, Kafka' },
        { category: 'Databases', items: 'PostgreSQL, MongoDB, DynamoDB, Elasticsearch, Redis' }
    ];

    const experienceData = experience?.length > 0 ? experience : [
        {
            company: 'Google',
            role: 'Software Engineer',
            location: 'Mountain View, CA',
            startDate: 'Jun 2023',
            endDate: 'Present',
            achievements: [
                'Designed and implemented distributed caching layer reducing API latency by 40% across 12 microservices serving 500M+ daily requests.',
                'Built real-time data pipeline processing 2M+ events/sec using Apache Beam and BigQuery, enabling sub-second analytics for Search team.',
                'Led cross-team initiative to migrate 8 legacy services to Kubernetes, improving deployment velocity by 3x and reducing infra costs by $2.1M annually.'
            ]
        },
        {
            company: 'Stripe',
            role: 'Software Engineering Intern',
            location: 'San Francisco, CA',
            startDate: 'May 2022',
            endDate: 'Aug 2022',
            achievements: [
                'Architected fraud detection microservice achieving 99.7% precision, reducing false positives by 35% and saving $4.2M in disputed charges.',
                'Implemented real-time transaction monitoring dashboard with WebSocket streaming, handling 100K+ concurrent connections with <50ms latency.'
            ]
        },
        {
            company: 'Microsoft',
            role: 'Research Engineer Intern',
            location: 'Redmond, WA',
            startDate: 'May 2021',
            endDate: 'Aug 2021',
            achievements: [
                'Developed ML-based code completion model fine-tuned on 15M+ code snippets, achieving 78% accuracy and integrated into VS Code IntelliSense.',
                'Optimized inference pipeline reducing model latency from 200ms to 45ms through quantization and ONNX runtime integration.'
            ]
        }
    ];

    const projectsData = projects?.length > 0 ? projects : [
        {
            name: 'AI Infrastructure Monitoring Platform',
            achievements: [
                'Built scalable distributed monitoring pipelines processing 1M+ events daily with real-time anomaly detection.',
                'Implemented analytics dashboards with optimized API aggregation, achieving <100ms response time across 50+ endpoints.'
            ],
            techStack: 'React, TypeScript, Node.js, Kafka, PostgreSQL, AWS'
        },
        {
            name: 'Distributed Task Scheduler',
            achievements: [
                'Designed fault-tolerant task scheduling system handling 500K+ jobs/day across 200+ worker nodes with automatic failover.',
                'Implemented priority-based scheduling algorithm reducing average job wait time by 60% with guaranteed SLA compliance.'
            ],
            techStack: 'Go, gRPC, Redis, Kubernetes, Prometheus'
        },
        {
            name: 'Real-Time Collaboration Engine',
            achievements: [
                'Built CRDT-based collaborative editing engine supporting 10K+ concurrent users with conflict-free merge guarantees.',
                'Designed operational transformation layer with <10ms sync latency and offline-first architecture with automatic reconciliation.'
            ],
            techStack: 'Rust, WebSocket, Redis, Docker, TypeScript'
        }
    ];

    const certificationsData = data?.certifications?.length > 0 ? data.certifications : [
        { name: 'AWS Solutions Architect Professional', date: '2024' },
        { name: 'Google Cloud Professional Data Engineer', date: '2023' },
        { name: 'Certified Kubernetes Administrator (CKA)', date: '2023' }
    ];

    const achievementsData = data?.achievements?.length > 0 ? data.achievements : [
        'Google Code Jam — Top 100 Global Finalist (2023)',
        'ACM-ICPC Asia Regional — Gold Medalist (2022)',
        'Published paper "Efficient Distributed Caching at Scale" at SOSP 2023',
        'Stanford CS Excellence Award (2024)'
    ];

    const codingProfilesData = data?.codingProfiles?.length > 0 ? data.codingProfiles : [
        { platform: 'LeetCode', detail: '2,847 problems solved | Rating 2,450 | Top 0.3% Global' },
        { platform: 'Codeforces', detail: 'Rating 2,100 | Expert Division | 350+ contests' },
        { platform: 'GitHub', detail: '1,200+ contributions | 15K+ stars across open-source projects' }
    ];

    const hackathonsData = data?.hackathons?.length > 0 ? data.hackathons : [
        { name: 'YC Hackathon 2024', result: '1st Place', detail: 'Built AI-powered code review tool adopted by 3 YC companies' },
        { name: 'TechCrunch Disrupt Hackathon 2023', result: '2nd Place', detail: 'Real-time infrastructure monitoring platform' },
        { name: 'Google I/O Hackathon 2022', result: 'Winner', detail: 'Distributed task scheduling system' }
    ];

    // ── Design System ──
    const fonts = "'Inter', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif";

    const page = {
        width: '210mm',
        maxHeight: '297mm',
        overflow: 'hidden',
        background: '#ffffff',
        fontFamily: fonts,
        color: '#1a1a1a',
        padding: '14mm 16mm 10mm 16mm',
        boxSizing: 'border-box',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        position: 'relative',
        lineHeight: '1.35'
    };

    const nameStyle = {
        fontSize: '22px',
        fontWeight: '700',
        letterSpacing: '-0.5px',
        color: '#000000',
        lineHeight: '1.1',
        marginBottom: '3px',
        textAlign: 'center'
    };

    const contactStyle = {
        fontSize: '8.5px',
        color: '#444444',
        lineHeight: '1.4',
        marginBottom: '6px',
        letterSpacing: '0.2px',
        textAlign: 'center'
    };

    const contactLink = {
        color: '#444444',
        textDecoration: 'none'
    };

    const sectionTitle = {
        fontSize: '9.5px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1.2px',
        color: '#000000',
        borderBottom: '1px solid #d0d0d0',
        paddingBottom: '2.5px',
        marginBottom: '5px',
        marginTop: '0px',
        lineHeight: '1'
    };

    const sectionWrap = {
        marginBottom: '7px'
    };

    const dividerStyle = {
        borderBottom: '1px solid #cccccc',
        marginTop: '8px',
        marginBottom: '8px',
        width: '100%'
    };

    const bulletStyle = {
        fontSize: '8.5px',
        lineHeight: '1.4',
        color: '#1a1a1a',
        paddingLeft: '10px',
        position: 'relative',
        marginBottom: '1.5px'
    };

    const bulletDot = {
        position: 'absolute',
        left: '0px',
        top: '4px',
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: '#1a1a1a'
    };

    const jobHeaderStyle = {
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
        marginBottom: '2px',
        lineHeight: '1'
    };

    const techStackStyle = {
        fontSize: '7.5px',
        color: '#777777',
        marginTop: '2px',
        lineHeight: '1.3',
        fontStyle: 'normal'
    };

    const skillCategoryStyle = {
        fontSize: '8.5px',
        lineHeight: '1.45',
        marginBottom: '1.5px',
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
        marginBottom: '1px',
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
        marginBottom: '1px',
        lineHeight: '1.3'
    };

    const certItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.4',
        color: '#1a1a1a',
        marginBottom: '1.5px'
    };

    const achievementItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.4',
        color: '#1a1a1a',
        paddingLeft: '10px',
        position: 'relative',
        marginBottom: '1.5px'
    };

    const codingProfileItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.4',
        marginBottom: '1.5px',
        color: '#1a1a1a'
    };

    const codingPlatformStyle = {
        fontWeight: '700',
        color: '#000000',
        marginRight: '4px'
    };

    const hackathonItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.4',
        marginBottom: '1.5px',
        paddingLeft: '10px',
        position: 'relative',
        color: '#1a1a1a'
    };

    const hackathonNameStyle = {
        fontWeight: '700',
        color: '#000000'
    };

    const hackathonResultStyle = {
        fontWeight: '600',
        color: '#333333'
    };

    // Build visible sections array
    const sections = [];

    // Education
    if (educationData && educationData.length > 0) {
        sections.push({
            key: 'education',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Education</div>
                    {educationData.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '3px' }}>
                            <div style={eduRowStyle}>
                                <span style={eduInstitutionStyle}>{edu.institution}</span>
                                <span style={dateStyle}>{edu.startDate} — {edu.endDate}</span>
                            </div>
                            <div style={eduDetailStyle}>
                                {edu.degree} in {edu.field}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
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

    // Experience
    if (experienceData && experienceData.length > 0) {
        sections.push({
            key: 'experience',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Experience</div>
                    {experienceData.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '5px' }}>
                            <div style={jobHeaderStyle}>
                                <span>
                                    <span style={companyStyle}>{exp.company}</span>
                                    <span style={roleLocationStyle}>{exp.role} · {exp.location}</span>
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
                        <div key={i} style={{ marginBottom: '4px' }}>
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
                            <span style={{ fontWeight: '700', color: '#000000' }}>{cert.name}</span>
                            {cert.date && <span style={{ color: '#555555' }}> — {cert.date}</span>}
                        </div>
                    ))}
                </div>
            )
        });
    }

    // Achievements
    if (achievementsData && achievementsData.length > 0) {
        sections.push({
            key: 'achievements',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Achievements</div>
                    {achievementsData.map((ach, i) => (
                        <div key={i} style={achievementItemStyle}>
                            <div style={bulletDot} />
                            {ach}
                        </div>
                    ))}
                </div>
            )
        });
    }

    // Coding Profiles
    if (codingProfilesData && codingProfilesData.length > 0) {
        sections.push({
            key: 'codingProfiles',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Coding Profiles</div>
                    {codingProfilesData.map((profile, i) => (
                        <div key={i} style={codingProfileItemStyle}>
                            <span style={codingPlatformStyle}>{profile.platform}</span>
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
                    {hackathonsData.map((hack, i) => (
                        <div key={i} style={hackathonItemStyle}>
                            <div style={bulletDot} />
                            <span style={hackathonNameStyle}>{hack.name}</span>
                            <span style={hackathonResultStyle}> — {hack.result}</span>
                            {hack.detail && <span style={{ color: '#555555' }}> | {hack.detail}</span>}
                        </div>
                    ))}
                </div>
            )
        });
    }

    // ── Render ──
    return (
        <div style={isPreview ? { ...page, maxHeight: 'none', overflow: 'visible' } : page}>
            {/* ── HEADER ── */}
            <div style={nameStyle}>{name}</div>
            <div style={contactStyle}>
                <span>{email}</span>
                <span style={{ margin: '0 6px', color: '#cccccc' }}>|</span>
                <span>{phone}</span>
                <span style={{ margin: '0 6px', color: '#cccccc' }}>|</span>
                <span style={contactLink}>{linkedin}</span>
                <span style={{ margin: '0 6px', color: '#cccccc' }}>|</span>
                <span style={contactLink}>{github}</span>
                {website && website !== 'vikramsuresh.dev' && (
                    <>
                        <span style={{ margin: '0 6px', color: '#cccccc' }}>|</span>
                        <span style={contactLink}>{website}</span>
                    </>
                )}
            </div>

            {/* ── SECTIONS WITH DIVIDERS ── */}
            {sections.filter(s => !(data?.hiddenSections || []).includes(s.key)).map((section, index, arr) => (
                <React.Fragment key={section.key}>
                    {section.content}
                    {index < arr.length - 1 && <div style={dividerStyle} />}
                </React.Fragment>
            ))}
        </div>
    );
};

export default FAANGTemplate;
