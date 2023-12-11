const { response } = require('express');
const { Salary } = require('../models');
const { getTokenData } = require('../helpers');
const { logger } = require('../helpers/logger');

const getSalaries = async (req, res = response) => {
	try {
		const jwt =
			req.cookies.jwt_dashboard ||
			req.cookies.jwt_tpv ||
			req.cookies.jwt_deliveryApp;
		const tokenData = getTokenData(jwt);
		const { limit = 1000, from = 0 } = req.query;
		const query = { state: true, superUser: tokenData.UserInfo.superUser };

		const [total, salaries] = await Promise.all([
			Salary.countDocuments(query),
			Salary.find(query).skip(Number(from)).limit(Number(limit)),
		]);

		res.status(200).json({
			ok: true,
			status: 200,
			total,
			data: {
				salaries,
			},
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

const getSalary = async (req, res = response) => {
	try {
		const { id } = req.params;
		const salary = await Salary.findById(id);

		res.status(200).json({
			ok: true,
			status: 200,
			data: {
				salary,
			},
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

const postSalary = async (req, res = response) => {
	try {
		const { state, ...body } = req.body;
		const jwt =
			req.cookies.jwt_dashboard ||
			req.cookies.jwt_tpv ||
			req.cookies.jwt_deliveryApp;
		const tokenData = getTokenData(jwt);

		// Generar la data a guardar
		const data = {
			...body,
			superUser: tokenData.UserInfo.superUser,
		};

		const salary = new Salary(data);

		// Guardar DB
		await salary.save();

		res.status(200).json({
			ok: true,
			status: 200,
			data: {
				salary,
			},
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

const putSalary = async (req, res = response) => {
	try {
		const { id } = req.params;
		const { state, ...data } = req.body;

		const salary = await Salary.findByIdAndUpdate(id, data, { new: true });

		res.status(200).json({
			ok: true,
			status: 200,
			data: {
				salary,
			},
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

const deleteSalary = async (req, res = response) => {
	try {
		const { id } = req.params;
		await Salary.findByIdAndUpdate(id, { state: false }, { new: true });

		res.status(200).json({
			ok: true,
			status: 200,
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

module.exports = {
	postSalary,
	getSalaries,
	getSalary,
	putSalary,
	deleteSalary,
};
