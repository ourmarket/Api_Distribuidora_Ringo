const { Schema, model } = require('mongoose');

const SupplierSchema = Schema(
	{
		businessName: { type: String },
		cuit: { type: String },
		email: { type: String },
		phone: { type: String },
		address: { type: String },
		province: { type: String },
		city: { type: String },
		zip: { type: String },
		state: { type: Boolean, default: true },
		superUser: {
			type: Schema.Types.ObjectId,
			ref: 'SuperUser',
			required: true,
		},
	},
	{ timestamps: true }
);

SupplierSchema.methods.toJSON = function () {
	const { __v, ...supplier } = this.toObject();
	return supplier;
};

module.exports = model('Supplier', SupplierSchema);
