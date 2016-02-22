'use strict'

const request = require('supertest')
const assert = require('chai').assert

describe('/api/arthemetic test', function () {
	let app
	
	before(function (beforeDone) {
		app = require('../app.js')
		beforeDone()
	})
	
	describe.only('simple test', function () {
		it('should return game', function (testDone) {
			request(app)
				.get('/api/ping')
				.expect(function (response) {
					console.log('1######', response.body);
				})
				.expect(200, function(err) {
					console.log('2######');
					request(app)
						.get('/api/ping')
						.expect(function (response) {
							console.log('1######', response.body);
						})
						.expect(200, testDone)
				})
		})
	})

	describe.skip('call twice', function () {
		let successRequestsCount = 0

		before(function (beforeDone) {
			request(app)
				.get('/api/ping')
				.expect(function (response) {
					console.log('1######');
					successRequestsCount += 1
					if (successRequestsCount === 2) {
						beforeDone()
					}
				})

			request(app)
				.get('/api/ping')
				.expect(function (response) {
					console.log('2######');
					successRequestsCount += 1
					if (successRequestsCount === 2) {
						beforeDone()
					}
				})
		})

		it('should return game', function (testDone) {
			assert.equal(successRequestsCount, 2)
		})
	})
})
