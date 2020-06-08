const request = require('supertest');
const app = require('../index');

describe("get user details",function() {
	it('EmpId',function(done){

		request(app)
		.get('/employees/:id')
		.expect(200)
		.set('Accept', 'application/json')
		.expect('content-type','application/json; charset=utf-8')
		.end(function(err, res) {
			if(err)
				throw err
			console.log('Test Passed')
		},done());
		
	})
});

describe("insert employee details",function() {
	it('insert',function(done){

		request(app)
		.post('/employees')
		.send({EmpId: 11, Name: 'alexa', EmpCode: 'EMP666', Salary: 451700})
		.expect(200)
		.set('Accept', 'application/json')
		.expect('content-type','application/json/')
		.end(function(err, res) {
			if(err)
				return err
			
		},done());
		
	})
});

describe("update employee details",function() {
	it('update',function(done){

		request(app)
		.put('/employees')
		.send({EmpId: 5, Name: 'Harris', EmpCode: 'EMP943', Salary: 416500})
		.expect(200)
		.set('Accept', 'application/json')
		.expect('content-type','application/json/')
		.end(function(err, res) {
			if(err)
				return err
		},done());
		
	})
});

describe("delete employee",function() {
	it('EmpId',function(done){

		request(app)
		.delete('/employees/:id')
		.send({EmpId: 9})
		.expect(200)
		.set('Accept', 'application/json')
		.expect('content-type','application/json/')
		.end(function(err, res) {
			if(err)
				return err
		},done());
		
	})
});
