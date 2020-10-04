require('dotenv').config();
const { expect } = require('chai');
const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const RecordsRepo = require('../../../server/repositories/recordsRepo');
const RecordsService = require('../../../server/services/recordsService');
chai.use(require('chai-as-promised'))

describe('Records Service', function () {
    // Given
    let recordsRepo = new RecordsRepo();
    let recordsService = new RecordsService(recordsRepo);
    let stubs = [];
    let repoResult = [
        {
            "_id": "1",
            "key": "TAKwGc6Jr4i8Z487",
            "createdAt": "2017-01-28T01:22:14.398Z",
            "counts": [1, 2, 3],
            "value": "test"
        },
        {
            "_id": "2",
            "key": "NAeQ8eX7e5TEg7oH",
            "createdAt": "2017-01-27T08:19:14.135Z",
            "counts": [0, 0, 0],
            "value": "test"
        },
        {
            "_id": "3",
            "key": "NAeQ8eX7e5TEg7oH",
            "createdAt": "2017-01-27T08:19:14.135Z",
            "counts": [1, 0, 0],
            "value": "test"
        },
        {
            "_id": "4",
            "key": "NAeQ8eX7e5TEg7oH",
            "createdAt": "2017-01-27T08:19:14.135Z",
            "counts": [1, 1, 3],
            "value": "test"
        }
    ];
    afterEach(function () {
        let stub;
        while (stub = stubs.pop()) {
            stub.restore();
        }
    });
    describe('getRecordsSummary function', function () {
        it("should return filtered records after computing the totalCount", async () => {
            // Given
            stubs.push(sinon.stub(recordsRepo, 'findAll').resolves(repoResult));
            // Act
            let records = await recordsService.getRecordsSummary('2018-02-02', '2018-02-02', 1, 5);
            // Assert
            sinon.assert.calledOnce(stubs[0]);
            expect(records).to.have.length(2); // After filtering two items should be there
            assert.property(records[0], 'totalCount');
            assert.propertyVal(records[0], 'totalCount', 1);
            assert.property(records[1], 'totalCount');
            assert.propertyVal(records[1], 'totalCount', 5);
        });
    });
});