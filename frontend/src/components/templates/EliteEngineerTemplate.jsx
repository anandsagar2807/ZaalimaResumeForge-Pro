import React from 'react';

const EliteEngineerTemplate = ({ data, scale = 1, isPreview = false }) => {
    const {
        personalInfo,
        education,
        skills,
        experience,
        projects
    } = data || {};

    // ── Fallback / Demo Data ──
    const name = personalInfo?.fullName || 'Rahul Krishnan';
    const email = personalInfo?.email || 'rahul.krishnan@outlook.com';
    const phone = personalInfo?.phone || '+91-9988776655';
    const linkedin = personalInfo?.linkedin || 'linkedin.com/in/rahulkrishnan-se';
    const github = personalInfo?.github || 'github.com/rahulkrishnan-dev';
    const location = personalInfo?.location || personalInfo?.address || 'Hyderabad, Telangana';
    const profileSummary = personalInfo?.summary || personalInfo?.title || '';

    const profileData = profileSummary || 'Results-driven software engineer with 2+ years of hands-on experience building scalable, production-grade systems across fintech, cloud collaboration, and AI-driven assessment domains. Proven ability to architect microservice backends, optimize distributed data pipelines, and deliver high-impact features under tight deadlines. Deep expertise in Java, Python, React, and cloud-native infrastructure with a consistent track record of reducing latency, improving throughput, and driving measurable business outcomes. Seeking to leverage strong engineering fundamentals and cross-functional collaboration skills in a high-growth technology organization.';

    const educationData = education?.length > 0 ? education : [
        {
            institution: 'Indian Institute of Technology (IIT), Hyderabad',
            degree: 'Bachelor of Technology',
            field: 'Computer Science and Engineering',
            gpa: '8.91 / 10.00',
            startDate: 'Jul 2019',
            endDate: 'May 2023'
        },
        {
            institution: 'Delhi Public School, Hyderabad',
            degree: 'Class XII (CBSE)',
            field: 'Science — Mathematics, Physics, Chemistry',
            gpa: '96.8%',
            startDate: 'Apr 2017',
            endDate: 'Mar 2019'
        }
    ];

    const skillsData = skills?.length > 0 ? skills : [
        { category: 'Languages', items: 'Java, Python, C++, TypeScript, SQL, Go' },
        { category: 'Frameworks & Libraries', items: 'Spring Boot, React.js, Next.js, Express.js, Django, FastAPI, Redux' },
        { category: 'Cloud & Infrastructure', items: 'AWS (EC2, S3, Lambda, RDS, ECS), GCP, Docker, Kubernetes, Terraform, CI/CD (GitHub Actions, Jenkins)' },
        { category: 'Databases & Messaging', items: 'PostgreSQL, MongoDB, Redis, Elasticsearch, Apache Kafka, RabbitMQ' },
        { category: 'Core Competencies', items: 'System Design, Distributed Systems, Data Structures & Algorithms, REST/GraphQL APIs, Microservices Architecture' }
    ];

    const experienceData = experience?.length > 0 ? experience : [
        {
            company: 'Deutsche Bank Technology Centre',
            role: 'Software Engineer',
            location: 'Hyderabad',
            startDate: 'Jun 2023',
            endDate: 'Present',
            achievements: [
                'Architected and deployed real-time transaction monitoring microservice processing 1.2M+ daily events with 99.97% accuracy, reducing fraud detection latency by 58% across 4 regional banking clusters.',
                'Led migration of 6 legacy monolithic services to containerized Spring Boot microservices on AWS ECS, achieving 3.2x deployment velocity improvement and $840K annual infrastructure cost savings.',
                'Designed PostgreSQL query optimization strategy with composite indexing and connection pooling, reducing average API response time from 340ms to 45ms for 200+ concurrent enterprise users.'
            ]
        },
        {
            company: 'Amazon Web Services (AWS)',
            role: 'Cloud Engineering Intern',
            location: 'Bangalore',
            startDate: 'Jan 2022',
            endDate: 'May 2022',
            achievements: [
                'Built automated infrastructure provisioning pipeline using Terraform and AWS Lambda, enabling zero-downtime blue-green deployments across 15+ production environments.',
                'Implemented CloudWatch-based observability dashboard with custom metrics and anomaly detection, reducing mean time to incident resolution by 42% for S3 and EC2 service teams.'
            ]
        }
    ];

    const projectsData = projects?.length > 0 ? projects : [
        {
            name: 'Intelligent GST Management Platform',
            achievements: [
                'Engineered end-to-end GST compliance platform automating return filing, invoice reconciliation, and tax computation for 50K+ SMEs across 18 Indian states, reducing manual filing errors by 72%.',
                'Designed event-driven microservice architecture with Kafka-based audit trail, real-time dashboard analytics, and PDF report generation — deployed on AWS with 99.9% uptime SLA compliance.',
                'Implemented rule-based tax engine with dynamic slab detection, reverse charge mechanism, and GSTR-1/3B auto-population, processing 200K+ invoices monthly with sub-second latency.'
            ],
            techStack: 'Java, Spring Boot, PostgreSQL, Apache Kafka, React.js, AWS (ECS, RDS, S3), Docker'
        },
        {
            name: 'Cloud-Based Task Collaboration Suite',
            achievements: [
                'Built real-time collaborative task management platform with WebSocket-driven live updates, Kanban boards, and Gantt chart visualization for 10K+ concurrent enterprise users across 3 organizations.',
                'Architected multi-tenant SaaS backend with role-based access control, team workspace isolation, and Stripe-integrated subscription billing — achieving 99.95% availability across 4 AWS regions.',
                'Developed intelligent notification engine with priority-based routing, Slack/email integration, and activity timeline — reducing missed deadline incidents by 65% in pilot deployment.'
            ],
            techStack: 'TypeScript, Next.js, Node.js, MongoDB, WebSocket, Redis, Stripe API, Kubernetes'
        },
        {
            name: 'AI Coding Assessment Portal',
            achievements: [
                'Designed and launched AI-powered coding evaluation platform with adaptive difficulty engine, automated test case generation, and plagiarism detection — serving 25K+ assessment sessions for 8 enterprise clients.',
                'Implemented semantic code similarity analyzer using NLP embeddings and AST comparison, achieving 94% plagiarism detection accuracy with <2s per-submission processing time on GPU-accelerated inference.',
                'Built comprehensive analytics dashboard with percentile rankings, skill heatmaps, and benchmarking reports — enabling recruiters to reduce technical screening time by 70% and improve candidate quality scores by 38%.'
            ],
            techStack: 'Python, FastAPI, spaCy, PyTorch, React.js, PostgreSQL, Docker, AWS Lambda'
        }
    ];

    const certificationsData = data?.certifications?.length > 0 ? data.certifications : [
        { name: 'AWS Solutions Architect — Associate', date: '2024' },
        { name: 'Certified Kubernetes Administrator (CKA)', date: '2023' },
        { name: 'Google Professional Cloud Developer', date: '2023' },
        { name: 'Java SE 11 Developer — Oracle Certified', date: '2022' }
    ];

    const codingAchievementsData = data?.codingProfiles?.length > 0 ? data.codingProfiles : [
        { platform: 'LeetCode', detail: '1,850+ problems solved | Rating 2,120 | Top 1.5% Global | 42 Hard problems' },
        { platform: 'Codeforces', detail: 'Rating 1,890 | Expert Division | 280+ contests | Division 2 Top 50 finisher' },
        { platform: 'GitHub', detail: '950+ contributions | 8.2K stars across open-source projects | 3 featured repositories' }
    ];

    const leadershipData = data?.extraCurricular?.length > 0 ? data.extraCurricular : [
        'Technical Lead — IIT Hyderabad Coding Club: Organized 15+ workshops on system design, DSA, and cloud computing for 400+ students; mentored 30+ freshmen through structured peer-learning program.',
        'Open Source Contributor — Kubernetes SIGs: Contributed 12 merged PRs to kubectl and cluster-lifecycle modules; active reviewer for 3 community proposals with 4.8K+ lines reviewed.',
        'Event Coordinator — HackIIT 2022: Managed logistics and judging for 200+ participant hackathon; secured sponsorships from 5 technology companies including Google and Microsoft.',
        'Volunteer — Code for India Foundation: Developed digital literacy platform for 12 rural schools in Telangana, training 800+ students in basic programming and internet safety.'
    ];

    // ── Design System — Swiss-Style Luxury Minimalism ──
    const fonts = "'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

    const page = {
        width: '210mm',
        maxHeight: '297mm',
        overflow: 'hidden',
        background: '#ffffff',
        fontFamily: fonts,
        color: '#1a1a1a',
        padding: '13mm 16mm 10mm 16mm',
        boxSizing: 'border-box',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        position: 'relative',
        lineHeight: '1.38'
    };

    // ── Swiss-Style Thin Horizontal Rule ──
    const swissRule = {
        borderBottom: '0.5px solid #c8c8c8',
        marginBottom: '5px',
        marginTop: '7px'
    };

    // ── Header Styles ──
    const nameStyle = {
        fontSize: '21px',
        fontWeight: '700',
        letterSpacing: '-0.3px',
        color: '#000000',
        lineHeight: '1.1',
        marginBottom: '2px',
        textAlign: 'center'
    };

    const contactRowStyle = {
        fontSize: '8.5px',
        color: '#555555',
        lineHeight: '1.5',
        marginBottom: '0px',
        letterSpacing: '0.15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0px',
        flexWrap: 'wrap'
    };

    const contactItemStyle = {
        color: '#555555',
        textDecoration: 'none'
    };

    const contactSeparator = {
        margin: '0 7px',
        color: '#c0c0c0',
        fontSize: '8px'
    };

    // ── Section Styles ──
    const sectionTitleStyle = {
        fontSize: '9px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1.8px',
        color: '#000000',
        lineHeight: '1',
        marginBottom: '4px',
        marginTop: '0px'
    };

    const sectionWrapStyle = {
        marginBottom: '1px'
    };

    // ── Profile Styles ──
    const profileTextStyle = {
        fontSize: '8.5px',
        lineHeight: '1.42',
        color: '#333333',
        marginBottom: '0px',
        textAlign: 'left'
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
        fontSize: '9px',
        fontWeight: '700',
        color: '#000000'
    };

    const eduDateStyle = {
        fontSize: '8px',
        color: '#666666',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        textAlign: 'right'
    };

    const eduDetailStyle = {
        fontSize: '8px',
        color: '#555555',
        lineHeight: '1.3',
        marginBottom: '3px'
    };

    // ── Skills Styles ──
    const skillRowStyle = {
        fontSize: '8.5px',
        lineHeight: '1.42',
        marginBottom: '1.5px',
        color: '#1a1a1a',
        display: 'flex',
        alignItems: 'baseline'
    };

    const skillLabelStyle = {
        fontWeight: '700',
        color: '#000000',
        marginRight: '3px',
        minWidth: '120px',
        flexShrink: '0',
        fontSize: '8.5px'
    };

    const skillValueStyle = {
        color: '#333333',
        fontWeight: '400',
        fontSize: '8.5px'
    };

    // ── Experience Styles ──
    const expHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '2px',
        lineHeight: '1'
    };

    const companyStyle = {
        fontSize: '9px',
        fontWeight: '700',
        color: '#000000'
    };

    const roleLocationStyle = {
        fontSize: '8px',
        color: '#555555',
        marginLeft: '4px',
        fontWeight: '500'
    };

    const dateStyle = {
        fontSize: '8px',
        color: '#666666',
        fontWeight: '500',
        whiteSpace: 'nowrap'
    };

    const bulletStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        color: '#1a1a1a',
        paddingLeft: '10px',
        position: 'relative',
        marginBottom: '1.5px'
    };

    const bulletDot = {
        position: 'absolute',
        left: '0px',
        top: '4.5px',
        width: '2.5px',
        height: '2.5px',
        borderRadius: '50%',
        background: '#1a1a1a'
    };

    // ── Project Styles ──
    const projectHeaderStyle = {
        fontSize: '9px',
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

    // ── Certification Styles ──
    const certItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.35',
        color: '#1a1a1a',
        marginBottom: '1.5px'
    };

    // ── Coding Achievement Styles ──
    const codingItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.35',
        marginBottom: '1.5px',
        color: '#1a1a1a'
    };

    const codingPlatformStyle = {
        fontWeight: '700',
        color: '#000000',
        marginRight: '4px'
    };

    // ── Leadership Styles ──
    const leadershipItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        color: '#1a1a1a',
        paddingLeft: '10px',
        position: 'relative',
        marginBottom: '1.5px'
    };

    // ── Render ──
    return (
        <div style={isPreview ? { ...page, maxHeight: 'none', overflow: 'visible' } : page}>
            {/* ── HEADER ── */}
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

            {/* ── Swiss Rule ── */}
            <div style={swissRule} />

            {/* ── PROFILE ── */}
            {!(data?.hiddenSections || []).includes('profile') && <>
                <div style={sectionWrapStyle}>
                    <div style={sectionTitleStyle}>Profile</div>
                    <div style={profileTextStyle}>{profileData}</div>
                </div>

                {/* ── Swiss Rule ── */}
                <div style={swissRule} />
            </>}

            {/* ── EDUCATION ── */}
            {!(data?.hiddenSections || []).includes('education') && <>
                <div style={sectionWrapStyle}>
                    <div style={sectionTitleStyle}>Education</div>
                    {educationData.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '3px' }}>
                            <div style={eduRowStyle}>
                                <span style={eduInstitutionStyle}>{edu.institution}</span>
                                <span style={eduDateStyle}>{edu.startDate} — {edu.endDate}</span>
                            </div>
                            <div style={eduDetailStyle}>
                                {edu.degree} in {edu.field}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Swiss Rule ── */}
                <div style={swissRule} />
            </>}

            {/* ── TECHNICAL SKILLS ── */}
            {!(data?.hiddenSections || []).includes('skills') && <>
                <div style={sectionWrapStyle}>
                    <div style={sectionTitleStyle}>Technical Skills</div>
                    {skillsData.map((skill, i) => (
                        <div key={i} style={skillRowStyle}>
                            <span style={skillLabelStyle}>{skill.category}:</span>
                            <span style={skillValueStyle}>{skill.items || skill.name}</span>
                        </div>
                    ))}
                </div>

                {/* ── Swiss Rule ── */}
                <div style={swissRule} />
            </>}

            {/* ── EXPERIENCE ── */}
            {!(data?.hiddenSections || []).includes('experience') && <>
                <div style={sectionWrapStyle}>
                    <div style={sectionTitleStyle}>Experience</div>
                    {experienceData.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '5px' }}>
                            <div style={expHeaderStyle}>
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

                {/* ── Swiss Rule ── */}
                <div style={swissRule} />
            </>}

            {/* ── PROJECTS ── */}
            {!(data?.hiddenSections || []).includes('projects') && <>
                <div style={sectionWrapStyle}>
                    <div style={sectionTitleStyle}>Projects</div>
                    {projectsData.map((proj, i) => (
                        <div key={i} style={{ marginBottom: '5px' }}>
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

                {/* ── Swiss Rule ── */}
                <div style={swissRule} />
            </>}

            {/* ── CERTIFICATIONS ── */}
            {!(data?.hiddenSections || []).includes('certifications') && <>
                <div style={sectionWrapStyle}>
                    <div style={sectionTitleStyle}>Certifications</div>
                    {certificationsData.map((cert, i) => (
                        <div key={i} style={certItemStyle}>
                            <span style={{ fontWeight: '700', color: '#000000' }}>{cert.name}</span>
                            {cert.date && <span style={{ color: '#555555' }}> — {cert.date}</span>}
                        </div>
                    ))}
                </div>

                {/* ── Swiss Rule ── */}
                <div style={swissRule} />
            </>}

            {/* ── CODING ACHIEVEMENTS ── */}
            {!(data?.hiddenSections || []).includes('codingProfiles') && <>
                <div style={sectionWrapStyle}>
                    <div style={sectionTitleStyle}>Coding Achievements</div>
                    {codingAchievementsData.map((profile, i) => (
                        <div key={i} style={codingItemStyle}>
                            <span style={codingPlatformStyle}>{profile.platform}</span>
                            <span>{profile.detail}</span>
                        </div>
                    ))}
                </div>

                {/* ── Swiss Rule ── */}
                <div style={swissRule} />
            </>}

            {/* ── LEADERSHIP & ACTIVITIES ── */}
            {!(data?.hiddenSections || []).includes('leadership') && <div style={sectionWrapStyle}>
                <div style={sectionTitleStyle}>Leadership & Activities</div>
                {leadershipData.map((item, i) => (
                    <div key={i} style={leadershipItemStyle}>
                        <div style={bulletDot} />
                        {item}
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default EliteEngineerTemplate;