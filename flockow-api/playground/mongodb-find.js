const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/FlockowApp', {useNewUrlParser: true}, (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server', err);
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// db.collection('Todos').find().toArray().then((docs) => {
	//	 console.log(`Todos count: ${count}`);
	//	 console.log(JSON.stringify(docs, null, 2));
	// }, (err) => {
	//	 console.log('Unable to fetch todos', err);
	// });
	// db.collection('Todos').find().count().then((count) => {
	//		 console.log(`Todos count: ${count}`);
	//	 }, (err) => {
	//		 console.log('Unable to fetch todos', err);
	// });

	db.collection('Users').find({name: 'Alexandre'}).toArray().then((docs) => {
		console.log(JSON.stringify(docs, undefined, 2));
	});
	// client.close();
	// });
});
