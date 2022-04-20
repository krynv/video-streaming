const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

app.get('/video', (req, res) => {
    const { range } = req.headers;
    if (!range) {
        res.status(400).send('Requires Range Header');
    }

    const path = 'bigbuck.mp4';
    const { size } = fs.statSync('bigbuck.mp4');

    const CHUNK_SIZE = 10 ** 6; // should be 1MB chunks
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, size - 1);

    const contentLength = end - start + 1;
    const headers = {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(path, { start, end });

    videoStream.pipe(res);
});

app.listen(8000, () => console.log('Listening on port 8000'));
