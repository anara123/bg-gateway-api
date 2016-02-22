'use strict'

const app = require('../app.js')
const request = require('supertest').agent(app.listen())
const assert = require('chai').assert

describe('/api/arthemetic test', function () {
	describe('simple test', function () {
		it('should return game', function (testDone) {
			request
				.get('/api/ping')
				.expect(function (response) {
					console.log('1######', response.body);
				})
				.expect(200, function(err) {
					console.log('2######');
					request
						.get('/api/ping')
						.expect(function (response) {
							console.log('1######', response.body);
						})
						.expect(200, testDone)
				})
		})
	})

	describe('call ping twice', function () {
		let successRequestsCount = 0

		before(function (beforeDone) {
			request
				.get('/api/ping')
				.expect(200, function(err) {
					successRequestsCount += 1
					if (successRequestsCount === 2) {
						beforeDone()
					}
				})

			request
				.get('/api/ping')
				.expect(200, function(err) {
					successRequestsCount += 1
					if (successRequestsCount === 2) {
						beforeDone()
					}
				})
		})

		it('should return game', function (testDone) {
			assert.equal(successRequestsCount, 2)
			testDone()
		})
	})
})
