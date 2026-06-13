const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

let client;
let isReady = false;

exports.initialize = () => {
  try {
    client = new Client({
      authStrategy: new LocalAuth({
        dataPath: './.wwebjs_auth'
      }),
      puppeteer: {
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    });

    client.on('qr', (qr) => {
      console.log('\n========================================================');
      console.log('📱 SCAN THE QR CODE BELOW WITH WHATSAPP TO CONNECT 📱');
      console.log('========================================================\n');
      qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
      console.log('✅ WhatsApp Web Client is Ready!');
      isReady = true;
    });

    client.on('auth_failure', (msg) => {
      console.error('❌ WhatsApp Authentication Failure:', msg);
    });

    client.on('disconnected', (reason) => {
      console.log('🔌 WhatsApp Client Disconnected:', reason);
      isReady = false;
    });

    client.initialize().catch(err => {
      console.error('❌ Failed to initialize WhatsApp client:', err);
    });
  } catch (err) {
    console.error('❌ Error creating WhatsApp client:', err);
  }
};

exports.isReady = () => isReady;

exports.sendReceipt = async (phone, message) => {
  if (!isReady || !client) {
    throw new Error('WhatsApp client is not authenticated or connected.');
  }

  // Format phone number
  let cleanNum = phone.replace(/\D/g, '');
  if (cleanNum.length === 10) {
    cleanNum = '91' + cleanNum; // default to India country code
  }
  
  const chatId = `${cleanNum}@c.us`;
  
  try {
    await client.sendMessage(chatId, message);
    console.log(`✅ WhatsApp receipt sent successfully to ${cleanNum}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send WhatsApp message to ${cleanNum}:`, error);
    throw error;
  }
};
