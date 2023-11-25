import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../models/users';

export const registration = async (req: Request, res: Response) => {
	const { firstName, lastName, email, phoneNumber, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new Error('User already exist');
		}

		const newUser = new User({
			firstName,
			lastName,
			email,
			password,
			phoneNumber,
		});

		if (!newUser) {
			throw new Error('Unable to add Users');
		}

		await newUser.save();

		return res
			.status(StatusCodes.CREATED)
			.json({ message: 'New User has been added', newUser });
	} catch (err: any) {
		console.error(err.message);

		const statusMap: Record<string, number> = {
			'User already exist': StatusCodes.CONFLICT,
			'Unable to add Users': StatusCodes.BAD_REQUEST,
		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
