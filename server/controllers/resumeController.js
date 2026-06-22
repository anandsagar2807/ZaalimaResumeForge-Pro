const Resume = require('../models/Resume');
const pdfService = require('../services/pdfService');

exports.saveResume = async (req, res) => {
    try {
        const { title, data, template } = req.body;
        const resume = new Resume({
            user: req.user.id,
            title,
            data,
            template
        });
        await resume.save();

        // Increment user's resume count
        const User = require('../models/User');
        await User.findByIdAndUpdate(req.user.id, {
            $inc: { 'usage.resumesCreated': 1 }
        });

        res.status(201).json(resume);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.generatePDF = async (req, res) => {
    try {
        const { htmlContent } = req.body;

        // All users receive clean, watermark-free PDFs (Pro features unlocked for everyone)
        const pdfBuffer = await pdfService.generatePDF(htmlContent, {
            addWatermark: false,
            userName: req.user ? req.user.name : ''
        });

        res.contentType("application/pdf");
        res.send(pdfBuffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user.id });
        res.json(resumes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.parseResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const pdfService = require('../services/pdfService');
        const text = await pdfService.extractTextFromPDF(req.file.buffer);

        res.json({ text, resumeText: text });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
