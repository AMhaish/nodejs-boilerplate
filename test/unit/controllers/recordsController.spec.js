require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
const resultCodes = require('../../../server/config/statusCodes');
const sinon = require('sinon');
const RecordsService = require('../../../server/services/recordsService');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Records Controller', function () {
    // Arrange
    var servicesStubs = [];
    afterEach(function () {
        let stub;
        while (stub = servicesStubs.pop()) {
            stub.restore();
        }
    });
    describe('POST /records/summary', function () {
        it("should return 200 for a correct request", (done) => {
            // Given
            let request = {
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            }
            let serviceResult = [
                {
                    "_id": "1",
                    "key": "TAKwGc6Jr4i8Z487",
                    "createdAt": "2017-01-28T01:22:14.398Z",
                    "totalCount": 2800,
                    "value": "test"
                },
                {
                    "_id": "2",
                    "key": "NAeQ8eX7e5TEg7oH",
                    "createdAt": "2017-01-27T08:19:14.135Z",
                    "totalCount": 2900,
                    "value": "test"
                }
            ];
            servicesStubs.push(sinon.stub(RecordsService.prototype, 'getRecordsSummary').resolves(serviceResult));
            // Act
            chai.request(app)
                .post('/records/summary')
                .send(request)
                .end((err, res) => {
                    // Assert
                    res.should.have.status(resultCodes.Success);
                    res.body.should.have.own.property('code', 0);
                    res.body.should.have.own.property('msg', 'Success');
                    res.body.should.have.own.property('records');
                    done();
                });
        });
        it("should return 400 for a request without startDate", (done) => {
            // Given
            let request = {
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            }
            // Act
            chai.request(app)
                .post('/records/summary')
                .send(request)
                .end((err, res) => {
                    // Assert
                    res.should.have.status(resultCodes.BusinessError);
                    res.body.should.have.own.property('code', 400);
                    res.body.should.have.own.property('exceptionType', 'PARAMETER_VALIDATION');
                    done();
                });
        });
        it("should return 400 for a request without endDate", (done) => {
            // Given
            let request = {
                "startDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            }
            // Act
            chai.request(app)
                .post('/records/summary')
                .send(request)
                .end((err, res) => {
                    // Assert
                    res.should.have.status(resultCodes.BusinessError);
                    res.body.should.have.own.property('code', 400);
                    res.body.should.have.own.property('exceptionType', 'PARAMETER_VALIDATION');
                    done();
                });
        });
        it("should return 400 for a request with invalid minCount", (done) => {
            // Given
            let request = {
                "startDate": "2018-02-02",
                "endDate": "2018-02-02",
                "minCount": "Test",
                "maxCount": 3000
            }
            // Act
            chai.request(app)
                .post('/records/summary')
                .send(request)
                .end((err, res) => {
                    // Assert
                    res.should.have.status(resultCodes.BusinessError);
                    res.body.should.have.own.property('code', 400);
                    res.body.should.have.own.property('exceptionType', 'PARAMETER_VALIDATION');
                    done();
                });
        });
        it("should return 400 for a request with invalid maxCount", (done) => {
            // Given
            let request = {
                "startDate": "2018-02-02",
                "endDate": "2018-02-02",
                "maxCount": "Test",
                "minCount": 3000
            }
            // Act
            chai.request(app)
                .post('/records/summary')
                .send(request)
                .end((err, res) => {
                    // Assert
                    res.should.have.status(resultCodes.BusinessError);
                    res.body.should.have.own.property('code', 400);
                    res.body.should.have.own.property('exceptionType', 'PARAMETER_VALIDATION');
                    done();
                });
        });
    });
});
