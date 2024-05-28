const axios = require('axios');

const ONESIGNAL_APP_ID = '256cfce6-82e6-4810-9300-b421cf4ed03b';
const ONESIGNAL_API_KEY = 'ZmJkMDNiODgtNTI4OC00NGExLTkwYmUtZTRhZGY5OWU5NjAy';

const playerId = 'bcb0558e-635c-42b3-b6c2-e335999499f7'; // Replace with the actual OneSignal player ID

const message = {
    app_id: ONESIGNAL_APP_ID,
    contents: { en: 'Your message goes here' },
    include_player_ids: [playerId] // Send to a specific user
};

axios.post('https://onesignal.com/api/v1/notifications', message, {
    headers: {
        'Authorization':`Basic ${ONESIGNAL_API_KEY}`,
        'Content-Type': 'application/json'
    }
})
.then(response => {
    console.log('Message sent successfully:', response.data);
})
.catch(error => {
    console.error('Error sending message:', error.response.data);
});