import { Schema, model } from 'mongoose';
import { UserTypes } from '../utils/type';

const userSchema = new Schema<UserTypes>({
	firstName: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: function (value: string) {
				// Custom email validation logic using a regular expression
				const letters = /^[A-Za-z/-]+$/;
				return letters.test(value);
			},
			message: 'Alphabets and hyphens only',
		},
	},

	lastName: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: function (value: string) {
				// Custom email validation logic using a regular expression
				const letters = /^[A-Za-z/-]+$/;
				return letters.test(value);
			},
			message: 'Alphabets and hyphens only',
		},
	},

	email: {
		type: String,
		required: [false, 'Please provide your email'],
		unique: true,
		trim: true,
		validate: {
			validator: function (value: string) {
				// Custom email validation logic using a regular expression
				const emailRegex =
					/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(com|org|net|gov|co\.uk)$/i;
				return emailRegex.test(value);
			},
			message: 'Invalid email format',
		},
	},
	password: {
		type: String,
		required: false,
		minlength: 8,
		trim: true,
	},
	role: {
		type: String,
		required: false,
		enum: ['Patient', 'Doctor'],
	},
	gender: {
		type: String,
		required: false,
		enum: ['Male', 'Female'],
	},

	status: {
		type: String,
		enum: ['inactive', 'pending', 'active'],
		default: 'pending',
	},
});

export const User = model('User', userSchema);
