const statusCodes = require("../config/statusCodes");
const RecordsRequestValidator = require('./requestValidators/recordsRequestValidator');

module.exports = class RecordsController {
  constructor(recordsService) {
    this.recordsService = recordsService;
    this.getRecordsSummary = this.getRecordsSummary.bind(this);
  }

  async getRecordsSummary(req, res) {
    new RecordsRequestValidator(req).validate();
    let summary = await this.recordsService.getRecordsSummary(
      req.body.startDate,
      req.body.endDate,
      req.body.minCount,
      req.body.maxCount,
    );
    // Building the response
    let responseRecords = summary.map((record) => ({
      key: record.key,
      createdAt: record.createdAt,
      totalCount: record.totalCount,
    }));
    // returning the response
    return res.status(statusCodes.Success).json({
      code: 0,
      msg: 'Success',
      records: responseRecords
    });
  }
};
