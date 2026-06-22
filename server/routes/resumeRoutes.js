const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { protect, checkSubscription } = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.post('/', protect, checkSubscription, resumeController.saveResume);
router.get('/', protect, resumeController.getResumes);
router.post('/pdf', protect, resumeController.generatePDF);
// Public parse route — the frontend uses Clerk auth (not JWT), so the
// resume text extraction endpoint must be reachable without a token.
router.post('/parse', upload.single('file'), resumeController.parseResume);

module.exports = router;
