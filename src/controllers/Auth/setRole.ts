import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../models/users';

export const setRole = async (req: Request, res: Response) => {
	const { role, gender } = req.body;
	const { id } = req.params;

	try {

        if (Object.keys(req.body).length === 0) {
			throw new Error('Invalid Parameter');
		}

        if (role !== 'Patient' && role !== 'Doctor') {
            throw new Error('Invalid role. Role must be "patient" or "doctor"');
          }

        if (gender !== 'Male' && gender !== 'Female') {
            throw new Error('Invalid role. Role must be "patient" or "doctor"');
          }

		const findUser = await User.findByIdAndUpdate(
			{ _id: id },
			{
				$set: {
					role: role, gender: gender
				},
			},
			{ new: true },
		);

		if (!findUser) {
			throw new Error('User not found');
		}

        return res.status(StatusCodes.OK).json({message: "Success 🎉", })
	} catch (err: any) {
		console.error(err.message);

		const statusMap: Record<string, number> = {
			'User not found 🔍': StatusCodes.NOT_FOUND,

		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
