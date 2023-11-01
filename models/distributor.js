const { Schema, model } = require('mongoose');

const DistributorSchema = Schema(
	{
		businessName: { type: String },
		cuit: { type: Number },
		email: { type: String },
		phone: { type: String },
		maximum: { type: Number }, // tope
		address: { type: String },
		province: { type: String },
		city: { type: String },
		zip: { type: Number },
		state: { type: Boolean, default: true },
		superUser: {
			type: Schema.Types.ObjectId,
			ref: 'SuperUser',
			required: true,
		},
	},
	{ timestamps: true }
);

DistributorSchema.methods.toJSON = function () {
	const { __v, ...distributor } = this.toObject();

	return distributor;
};

module.exports = model('Distributor', DistributorSchema);
