const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/FlockowApp', {useNewUrlParser: true}, (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server', err);
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// db.collection('Todos').findOneAndUpdate({
	//	 _id: new ObjectID('5b70b29be8b00edeab2a2488')
	// }, {
	//	 $set: {
	//		 completed: true
	//	 }
	// }, {
	//		 returnOriginal: false
	// }).then((result) => {
	//	 console.log(result);
	// });
	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5b70b5ab439ce10533ba5151')
	}, {
		$set: {
			name: 'Alexandre'
		},
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});
	// client.close();
	// });
});
