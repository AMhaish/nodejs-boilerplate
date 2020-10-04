
const BaseRepo = require('./baseRepo');
const { Record } = require('../models');

// Records Repository Class
module.exports = class RecordsRepo extends BaseRepo {
    constructor() {
        super();
        this.dataProvider = Record;
    }

    // For custom ways of fetching and dealing with data:
}