import express from 'express';
import handlebars from 'express-handlebars';
import mysql from 'mysql2/promise';

const hbs = handlebars.create({
	defaultLayout: 'main',
	extname: 'hbs',
});

const connection = await mysql.createConnection({
	host: 'localhost',
	user: 'Skiper',
	password: '123456',
	database: 'mybase',
});

const app = express();
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/results', async (req, res) => {
	let message = '';
	let query = 'SELECT * FROM users';

	try {
		let [result] = await connection.query(query);

		message = 'Ok!';

		res.render('results', { result: result, message: message });
	} catch (err) {
		console.log('Error: ', err);

		message = err;
	}
});

app.get('/show', async (req, res) => {
	let message = '';
	let query = 'SELECT * FROM users';
	try {
		let [result] = await connection.query(query);
		message = 'OK!';
		res.render('show', { message: message, result: result });
	} catch (err) {
		message = 'Error';
		console.log('Error: ', err);
	}
});

app.get('/show/:id', async (req, res) => {
	let id = req.params.id;
	let query = `SELECT * FROM users WHERE id=${id}`;
	let message = '';

	try {
		let [result, info] = await connection.query(query);
		message = 'Ok!';
		console.log(result);

		res.render('showUser', { message: message, result: result });
	} catch (err) {
		message = 'Error';
		console.log('Error:', err);
	}
});

app.get('/delete', (req, res) => res.render('delete'));

app.listen(3000, () => console.log('Server work'));
