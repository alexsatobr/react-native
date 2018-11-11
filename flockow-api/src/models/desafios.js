import mongoose from 'mongoose';

const DesafiosGerais = mongoose.model('Desafios_Gerais', {
	stage_1: [
		{
			id: Number,
			descricao: String,
			interest: String,
			difficult: String,
			createdAt: String,
			timeZone: String,
			dateTzUtc: String
		}
	],
	stage_1_total: Number,
	stage_2: [
		{
			id: Number,
			descricao: String,
			interest: String,
			difficult: String,
			createdAt: String,
			timeZone: String,
			dateTzUtc: String
		}
	],
	stage_2_total: Number,
});

module.exports = {DesafiosGerais};