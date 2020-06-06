const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
/*const fileupload = require('express-fileupload')
app.use(fileupload());*/
const multer = require('multer');
const logger = require('./logger');

app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));


var mysqlConnection =mysql.createConnection({
	//properties..
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'Employeedb',
	multipleStatements: true
});

mysqlConnection.connect((err) => {
	if(!err)
		console.log('DB Connection succeded');
	else
		console.log('DB connection failed\n ERROR: ' + json.stringify(err,undefined,2));
});



//get all employees
app.get('/employees',(req,res) => {
	mysqlConnection.query('SELECT * FROM Employee',(err,rows,fields) =>{
		if(!err){
			console.log(rows)
			res.send(rows);
		}
		else
			console.log(err);
	})
});

//get an mployee
app.get('/employees/:id',(req,res) => {
	mysqlConnection.query('SELECT * FROM Employee WHERE EmpId = ?',[req.params.id],(err,rows,fields) =>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});

//delete an employee
app.delete('/employees/:id',(req,res) => {
	mysqlConnection.query('DELETE FROM Employee WHERE EmpId = ?',[req.params.id],(err,rows,fields) =>{
		if(!err)
			res.send('deleted successfuly');

		else
			console.log(err);
	})
});

//insert an employee
app.post('/employees',(req,res) => {
    let EmpId = req.body.EmpId;
 	let Name = req.body.Name;
	let	EmpCode = req.body.EmpCode;
	let	Salary = req.body.Salary;
	
	var sql =`INSERT INTO Employee (EmpId,Name,EmpCode,Salary) VALUES('${EmpId}','${Name}','${EmpCode}','${Salary}')`;
	mysqlConnection.query(sql,(err,rows) =>{
		if(!err){
			if(rows.affectedRows && rows.insertId){
				res.send('inserted employee EmpId');
			}
			
		}
			
		else
			console.log(err);
	})
});


//update an employee
app.put('/employees',(req,res) => {
    let EmpId = req.body.EmpId;
 	let Name = req.body.Name;
	
	
	var sql ="UPDATE Employee SET Name='"+Name+"' WHERE EmpId="+req.body.EmpId;
	mysqlConnection.query(sql,(err,rows,fields) =>{
		if(!err)
			res.send('updated succesfully');
		else
			console.log(err);
		res.send('Some error occured');
	})
});


// To upload file on server
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

const upload = multer({storage: storage});

//Post API to upload file
app.post('/file', upload.single('file'), (req, res) => {
  try {
    logger.log('info',"File uploaded successfully");
    res.send(req.file);
  }catch(err) {
    logger.log('error',"Error while uploading file");
    res.send(400);
  }
});

app.listen(3000,() => console.log('express serveris running at port : 3000'));
