const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const AdmZip = require('adm-zip');

const app = express();
const port = 3000;

// 设置临时目录
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    console.log('Temporary directory does not exist, creating:', tempDir);
    fs.mkdirSync(tempDir);
} else {
    console.log('Temporary directory already exists:', tempDir);
}

// 配置 multer 用于文件上传
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Multer: Setting destination to:', tempDir);
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const newFilename = `${Date.now()}${ext}`;
        console.log('Multer: Original filename:', file.originalname);
        console.log('Multer: Generated new filename:', newFilename);
        file.decodedName = file.originalname;
        cb(null, newFilename);
    }
});
const upload = multer({ storage });

// 设置静态文件目录
console.log('Setting up static file directory:', path.join(__dirname, 'public'));
app.use(express.static('public'));

// 主页路由
app.get('/', (req, res) => {
    console.log('GET /: Received request for homepage');
    const indexPath = path.join(__dirname, 'public', 'index.html');
    console.log('GET /: Sending file:', indexPath);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('GET /: Error sending index.html:', err);
            res.status(500).send('Error loading homepage');
        } else {
            console.log('GET /: Successfully sent index.html');
        }
    });
});

// 上传文件路由
app.post('/upload', upload.single('comic'), (req, res) => {
    const startTime = Date.now();
    console.log('POST /upload: Received upload request at:', new Date().toISOString());
    console.log('POST /upload: Request headers:', req.headers);

    if (!req.file) {
        console.log('POST /upload: No file uploaded');
        res.status(400).json({ error: 'No file uploaded' });
        console.log('POST /upload: Response sent (400): No file uploaded, time taken:', `${Date.now() - startTime}ms`);
        return;
    }

    console.log('POST /upload: File received, size:', req.file.size, 'bytes');
    const decodedName = Buffer.from(req.file.decodedName, 'binary').toString('utf8');
    console.log('POST /upload: Original filename (decoded):', decodedName);
    console.log('POST /upload: File saved as:', req.file.filename);
    console.log('POST /upload: File path:', req.file.path);

    const response = { filename: req.file.filename, originalName: decodedName };
    console.log('POST /upload: Sending response:', response);
    res.json(response);
    console.log('POST /upload: Response sent (200), time taken:', `${Date.now() - startTime}ms`);
});

// 获取漫画内容
app.get('/comic/:filename', async (req, res) => {
    const startTime = Date.now();
    const filename = req.params.filename;
    const zipPath = path.join(tempDir, filename);
    console.log('GET /comic/:filename: Received request for filename:', filename);
    console.log('GET /comic/:filename: Zip file path:', zipPath);

    if (!fs.existsSync(zipPath)) {
        console.error('GET /comic/:filename: Zip file not found:', zipPath);
        res.status(404).json({ error: 'Zip file not found' });
        console.log('GET /comic/:filename: Response sent (404): Zip file not found, time taken:', `${Date.now() - startTime}ms`);
        return;
    }

    try {
        console.log('GET /comic/:filename: Starting to read zip file...');
        const zip = new AdmZip(zipPath);
        console.log('GET /comic/:filename: Zip file loaded successfully');
        const zipEntries = zip.getEntries();
        console.log('GET /comic/:filename: Total entries in zip:', zipEntries.length);

        const images = [];
        for (const entry of zipEntries) {
            const fileName = entry.entryName;
            console.log('GET /comic/:filename: Processing entry:', fileName);
            if (/\.(jpg|jpeg|png|gif|webp)$/i.test(fileName)) {
                console.log('GET /comic/:filename: Found image:', fileName);
                images.push(fileName);
            } else {
                console.log('GET /comic/:filename: Skipping non-image file:', fileName);
            }
        }

        console.log('GET /comic/:filename: Total images found:', images.length);
        console.log('GET /comic/:filename: Images list:', images);
        console.log('GET /comic/:filename: Sorting images...');
        images.sort();
        console.log('GET /comic/:filename: Sending response with images...');
        res.json(images);
        console.log('GET /comic/:filename: Response sent (200), time taken:', `${Date.now() - startTime}ms`);
    } catch (err) {
        console.error('GET /comic/:filename: Error reading comic:', err);
        res.status(500).json({ error: 'Error reading comic: ' + err.message });
        console.log('GET /comic/:filename: Response sent (500): Error reading comic, time taken:', `${Date.now() - startTime}ms`);
    }
});

// 提供图片文件（支持多层目录）
app.get('/image/:filename/:imagePath', (req, res) => {
    const startTime = Date.now();
    console.log('GET /image/:filename/:imagePath: Received request');
    const filename = req.params.filename;
    let imagePath = req.params.imagePath;
    const zipPath = path.join(tempDir, filename);

    console.log('GET /image/:filename/:imagePath: Filename:', filename);
    console.log('GET /image/:filename/:imagePath: Image path (raw):', imagePath);
    imagePath = decodeURIComponent(imagePath);
    console.log('GET /image/:filename/:imagePath: Image path (decoded):', imagePath);
    console.log('GET /image/:filename/:imagePath: Zip file path:', zipPath);

    if (!fs.existsSync(zipPath)) {
        console.error('GET /image/:filename/:imagePath: Zip file not found:', zipPath);
        res.status(404).send('Zip file not found');
        console.log('GET /image/:filename/:imagePath: Response sent (404): Zip file not found, time taken:', `${Date.now() - startTime}ms`);
        return;
    }

    try {
        console.log('GET /image/:filename/:imagePath: Starting to read zip file...');
        const zip = new AdmZip(zipPath);
        console.log('GET /image/:filename/:imagePath: Zip file loaded successfully');
        const zipEntries = zip.getEntries();
        console.log('GET /image/:filename/:imagePath: Total entries in zip:', zipEntries.length);

        let imageFound = false;
        for (const entry of zipEntries) {
            const entryPath = entry.entryName;
            console.log('GET /image/:filename/:imagePath: Processing entry:', entryPath);
            if (entryPath === imagePath) {
                console.log('GET /image/:filename/:imagePath: Match found, streaming image:', imagePath);
                imageFound = true;
                const ext = path.extname(entryPath).toLowerCase();
                const contentType = {
                    '.jpg': 'image/jpeg',
                    '.jpeg': 'image/jpeg',
                    '.png': 'image/png',
                    '.gif': 'image/gif',
                    '.webp': 'image/webp'
                }[ext] || 'application/octet-stream';
                console.log('GET /image/:filename/:imagePath: Setting Content-Type:', contentType);
                res.set('Content-Type', contentType);
                console.log('GET /image/:filename/:imagePath: Reading image data...');
                const imageData = zip.readFile(entry);
                console.log('GET /image/:filename/:imagePath: Image data size:', imageData.length, 'bytes');
                res.send(imageData);
                console.log('GET /image/:filename/:imagePath: Response sent (200), time taken:', `${Date.now() - startTime}ms`);
                break;
            }
        }

        if (!imageFound) {
            console.log('GET /image/:filename/:imagePath: Image not found in zip:', imagePath);
            res.status(404).send('Image not found in zip');
            console.log('GET /image/:filename/:imagePath: Response sent (404): Image not found, time taken:', `${Date.now() - startTime}ms`);
        }
    } catch (err) {
        console.error('GET /image/:filename/:imagePath: Error reading zip:', err);
        res.status(500).send('Error reading zip: ' + err.message);
        console.log('GET /image/:filename/:imagePath: Response sent (500): Error reading zip, time taken:', `${Date.now() - startTime}ms`);
    }
});

// 清理临时文件
process.on('SIGINT', () => {
    console.log('SIGINT received, cleaning up temporary files...');
    fs.readdirSync(tempDir).forEach(file => {
        const filePath = path.join(tempDir, file);
        console.log('Deleting temporary file:', filePath);
        fs.unlinkSync(filePath);
    });
    console.log('Temporary files cleaned up, exiting...');
    process.exit();
});

// 定时清理（每 5 分钟清理 30 分钟前的文件）
setInterval(() => {
    console.log('Starting scheduled cleanup of temporary files...');
    const now = Date.now();
    fs.readdirSync(tempDir).forEach(file => {
        const filePath = path.join(tempDir, file);
        const stats = fs.statSync(filePath);
        const age = now - stats.mtimeMs;
        console.log(`Checking file: ${filePath}, age: ${age / 1000} seconds`);
        if (age > 30 * 60 * 1000) {
            console.log('File is older than 30 minutes, deleting:', filePath);
            fs.unlinkSync(filePath);
            console.log('Deleted old file:', file);
        } else {
            console.log('File is not old enough, keeping:', filePath);
        }
    });
    console.log('Scheduled cleanup completed');
}, 5 * 60 * 1000);

// 调试：打印所有路由
console.log('Setting up routes...');
app._router.stack.forEach((r, i) => {
    if (r.route) {
        console.log(`Route ${i}:`, r.route.path);
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Comic reader running at http://localhost:${port}`);
    console.log('Server started successfully');
});
