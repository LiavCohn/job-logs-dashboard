const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  SWITCH_INDEX: Boolean,
  TOTAL_RECORDS_IN_FEED: Number,
  TOTAL_JOBS_FAIL_INDEXED: Number,
  TOTAL_JOBS_IN_FEED: Number,
  TOTAL_JOBS_SENT_TO_ENRICH: Number,
  TOTAL_JOBS_DONT_HAVE_METADATA: Number,
  TOTAL_JOBS_DONT_HAVE_METADATA_V2: Number,
  TOTAL_JOBS_SENT_TO_INDEX: Number,
}, { _id: false });

const jobLogSchema = new mongoose.Schema({
  country_code: String,
  currency_code: String,
  progress: progressSchema,
  status: String,
  timestamp: Date,
  transactionSourceName: String,
  noCoordinatesCount: Number,
  recordCount: Number,
  uniqueRefNumberCount: Number,
}, { timestamps: true });

module.exports = mongoose.model('JobLog', jobLogSchema); 