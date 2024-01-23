const sidebarLearn = require('../src/sidebarLearn.json');
const generateRecordObjs = require('./recordObjHelpers/generateRecordObjs');

/**
 * yarn lint-algolia-records --> Generate Algolia Index Records
 */

// Learn
generateRecordObjs(sidebarLearn, 'src/records/recordsLearn.json');
