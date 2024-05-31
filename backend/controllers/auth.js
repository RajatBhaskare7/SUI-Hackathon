const jwt = require("jsonwebtoken");
require("dotenv").config();
const checkTokenExpiration =async (req, res) => {
        const { token } = req.body;
        console.log(token);

    
        if (!token) {
            return res.status(400).json({ message: 'Token is required.' });
        }
    
        // Verify the token without attaching any user data
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.json({ expired: true, message: 'Token expired' });
                } else {
                    return res.json({ expired: false, message: 'Token is not expired' });
                }
            }
    
            // If the token is valid and not expired, respond accordingly
            return res.json({ expired: false, message: 'Token is not expired.' });
        });
}

module.exports = { checkTokenExpiration };