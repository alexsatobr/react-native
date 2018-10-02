const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()
// Todo.findOneAndRemove({_id: '5b73914ef9681815e39db7a8'}).then((todo) => {

// })
Todo.findByIdAndRemove('5b73914ef9681815e39db7a8').then((todo) => {
	console.log(todo);
});
