import z from 'zod'

const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')

const sessionSchema = z.object({
    username: z.string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be a string'
    }),
    password: z.string().regex(pattern, {
        message: 'The password is in incorrect format, it must contain at least one digit, one lowercase letter, one uppercase letter, and have a minimum length of 8 characters.',
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    })
})

export const validateSession = (data) => sessionSchema.safeParse(data)