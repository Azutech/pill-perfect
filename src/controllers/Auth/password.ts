import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validatePassword } from '../../utils/validatePassword';
import { hashPassword } from '../../utils/brcypt';
import { User } from '../../models/users';




export const password = async (req: Request, res: Response) => {
	const { password, comfirmPassword } = req.body;
	const { id } = req.params;

	try {

        if (Object.keys(req.body).length === 0) {
			throw new Error('Invalid Parameter');
		}

       
		if (password !== comfirmPassword) {
			throw new Error('password does not match');
		}

        const validPassword = validatePassword(password);
		if (!validPassword) {
			throw new Error(
				'Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 symbol',
			);
		}

        const hash = await hashPassword(password);

		const findUser = await User.findByIdAndUpdate(
			{ _id: id },
			{
				$set: {
					password: hash
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