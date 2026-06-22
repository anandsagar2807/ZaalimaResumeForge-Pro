const puppeteer = require('puppeteer');
const pdfParse = require('pdf-parse');

/**
 * Generate a PDF from HTML content.
 * @param {string} htmlContent - The HTML to convert to PDF
 * @param {object} options - PDF generation options
 * @param {boolean} options.addWatermark - Whether to add a watermark for free users
 * @param {string} options.userName - User name for watermark personalization
 */
exports.generatePDF = async (htmlContent, options = {}) => {
    const { addWatermark = false, userName = '' } = options;
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // If watermark is needed, inject watermark CSS and HTML into the content
    let finalHtml = htmlContent;
    if (addWatermark) {
        const watermarkOverlay = `
        <div id="resumeforge-watermark" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 10px;
            color: rgba(0,0,0,0.15);
            font-family: Arial, sans-serif;
            pointer-events: none;
            z-index: 9999;
            padding: 4px 8px;
            border: 1px solid rgba(0,0,0,0.08);
            border-radius: 4px;
            background: rgba(255,255,255,0.5);
        ">
            ResumeForge Pro — Free Plan${userName ? ` | ${userName}` : ''}
        </div>
        <div id="resumeforge-watermark-footer" style="
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 24px;
            background: linear-gradient(to right, rgba(59,130,246,0.06), rgba(59,130,246,0.03));
            font-size: 8px;
            color: rgba(0,0,0,0.12);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            pointer-events: none;
            z-index: 9998;
        ">
            Created with ResumeForge Pro — Upgrade for watermark-free PDFs
        </div>`;
        // Insert watermark before </body>
        finalHtml = htmlContent.replace('</body>', `${watermarkOverlay}</body>`);
    }

    // Set content and wait for it to load
    await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: addWatermark
            ? { top: '0px', right: '0px', bottom: '24px', left: '0px' } // Leave room for footer watermark
            : { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    await browser.close();
    return pdfBuffer;
};

/**
 * Extract text from a PDF buffer.
 * @param {Buffer} pdfBuffer - The PDF file as a buffer
 * @returns {Promise<string>} - The extracted text
 */
exports.extractTextFromPDF = async (pdfBuffer) => {
    try {
        const data = await pdfParse(pdfBuffer);
        return data.text;
    } catch (err) {
        console.error('Error extracting text from PDF:', err);
        throw new Error('Failed to extract text from PDF');
    }
};
