import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../models/users';



export const allUsers = async (req: Request, res: Response) => {

   

    try {

        const user = await User.find()
        if (user.length === 0) {
            throw new Error('Users not found 🔍')
        }

        return res.status(StatusCodes.OK).json(user)
        
    } catch (err: any ) {
        console.error(err.message);

		const statusMap: Record<string, number> = {
			'Users not found 🔍': StatusCodes.NOT_FOUND,

		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
    
  
}