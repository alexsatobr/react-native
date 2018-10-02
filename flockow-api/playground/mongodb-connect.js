const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/FlockowApp', {useNewUrlParser: true}, (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server', err);
	}
	console.log('Connected to MongoDB server');
	const db = client.db('FlockowApp');

	// db.collection('Todos').insertOne({
	//	 text: 'Something to do',
	//	 completed: false
	// }, (err, result) => {
	//	 if (err) {
	//		 return console.log('Unable to insert todo');
	//	 }
	//	 console.log(JSON.stringify(result.ops, undefined, 2));
	// });
	const id = new ObjectID();
	db.collection('Users').insertOne({
		_id: id,
		name: 'Alex',
		age: 29,
		location: 'Sao Paulo'
	}, (err, result) => {
		if (err) {
			return console.log('Unable to insert user', err);
		}
		console.log(result.ops);
	});

	client.close();
});

