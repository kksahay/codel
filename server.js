import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    return res.send({
        message: "Success"
    });
});

const filePath = 'data.json';

app.post('/api/add', (req, res) => {
    const { name } = req.body;
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath));
        data.language.push(name);
        fs.writeFileSync(filePath, JSON.stringify(data));
        return res.status(200).send({
            message: "Inserted",
        })
    } else {
        return res.status(400).send({
            message: "Server Unavailable",
        })
    }
});

app.get('/api/get', (req, res) => {
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath));
        const turn = data.language[data.turn];
        return res.send({
            turn
        })
    } else {
        return res.status(400).send({
            message: "Server Unavailable",
        })
    }
});

app.get('/api/cron', (req, res) => {
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath));
        const num = Math.floor(Math.random() * data.language.length);
        data.turn = num;
        fs.writeFileSync(filePath, JSON.stringify(data));
        return res.send({
            message: "turn updated"
        });
    } else {
        return res.status(400).send({
            message: "Server Unavailable",
        })
    }
});

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})