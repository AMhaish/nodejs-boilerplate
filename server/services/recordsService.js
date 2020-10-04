module.exports = class RecordsService {
    constructor(recordsRepo) {
        this.recordsRepo = recordsRepo;
    }

    async getRecordsSummary(startDate, endDate, minCount, maxCount) {
        // Fetching the records in the specified date range
        let targetRecords = await this.recordsRepo.findAll({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });
        console.log(targetRecords);
        if (targetRecords && targetRecords.length > 0) {
            // Computing the sum for each entity
            targetRecords.forEach((record) => {
                if (record.counts && record.counts.length > 0)
                    record.totalCount = record.counts.reduce((total, item) => total + item);
                else
                    record.totalCount = 0;
            });
            // Filtering the results according the the minCount and maxCount
            return targetRecords.filter(m => m.totalCount >= minCount && m.totalCount <= maxCount);
        } else {
            return [];
        }
    }

}