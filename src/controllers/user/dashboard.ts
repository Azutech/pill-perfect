import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../models/users';



export const userdashboard = async (req: Request, res: Response) => {

    const {id } = req.params

    try {

        const user = await User.findOne({_id: id})
        if (!user) {
            throw new Error('User not found 🔍')
        }

        return res.status(StatusCodes.OK).json(user)
        
    } catch (err: any ) {
        console.error(err.message);

		const statusMap: Record<string, number> = {
			'User not found 🔍': StatusCodes.NOT_FOUND,

		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
    
  
}