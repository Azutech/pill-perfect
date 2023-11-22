import { Schema, model } from "mongoose";
import { UserTypes } from "../utils/type"; 


const userSchema = new Schema<UserTypes>({
    firstName : {
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

    lastName : {
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
    }
})

export const User = model("User", userSchema)