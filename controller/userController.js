const userService = require("../services/userService");

module.exports = {
    getUserProfileHandler: async (req, res) => {
        try {
            const user=req.user
            // Fix the typo in header field and method
           // const jwt = req.headers.authorization?.split(' ')[1];
            //if (!jwt) {
           //     return res.status(401).json({ error: "Token is missing" });
           // }

           // const user = await userService.findUserProfileByJwt(jwt);
            user.password = null; // Exclude sensitive information

            res.status(200).json(user);

        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
};
