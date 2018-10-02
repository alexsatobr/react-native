const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/FlockowApp', {useNewUrlParser: true}, (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server', err);
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	//  db.collection('Users').find({name: 'Alexandre'}).toArray().then((docs) => {
	//	 console.log(JSON.stringify(docs, undefined, 2));
	//  });

	//deleteMany
	// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
	//	 console.log(result);
	// });
	//deleteOne
	// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
	//	 console.log(result);
	// });

	//findOneAndDelete
	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	//	 console.log(result);
	// });
	// db.collection('Users').deleteMany({name: 'Alexandre'});
	db.collection('Users').findOneAndDelete({
		_id: new ObjectID('5b70b59dc3a0d405320d2084')
	}).then((results) => {
		console.log(JSON.stringify(results, undefined, 2));
	});
	// client.close();
	// });
});
