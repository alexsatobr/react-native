import mongoose from 'mongoose';

const DesafiosComunidade = mongoose.model('Desafios_Comunidade', {
	total_challenges: Number,
	stage_3: [
		{
			id: Number,
			descricao: String,
			interest: String,
			rating: {
				likes: Number,
				dislikes: Number
			},
			createdAt: String,
			timeZone: String,
			dateTzUtc: String,
			createdBy: String,
			userIdBy: Number
		}
	],
});

module.exports = {DesafiosComunidade};