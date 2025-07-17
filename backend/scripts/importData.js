const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const JobLog = require('../models/JobLog');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
const dataPath = path.resolve(__dirname, '../../data/transformedFeeds.json');

async function importData() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const rawData = fs.readFileSync(dataPath);
    const jobLogs = JSON.parse(rawData);
    await JobLog.deleteMany({}); // Optional: clear existing data
    await JobLog.insertMany(jobLogs);
    console.log('Data imported successfully!');
    process.exit();
  } catch (err) {
    console.error('Error importing data:', err);
    process.exit(1);
  }
}

importData(); 