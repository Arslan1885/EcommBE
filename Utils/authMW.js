import jwt from 'jsonwebtoken'

export const authenticationRole = (role) => {
    return async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ Message: 'Authentication Failed' })

        }
        try {
            const decoded =  jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded;
            if (req.user.userRole !== role) {
                return res.status(401).json({ Message: 'You do not have the required permissions' })

            }
            next();


        } catch (error) {
            console.log(`Error : ${error}`)

        }
    }
} 