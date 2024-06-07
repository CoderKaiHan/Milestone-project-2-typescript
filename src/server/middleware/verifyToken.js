import jwt from "jsonwebtoken"
import "dotenv/config.js"

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // extracts the "authorization" header from the incoming HTTP request
  if (authHeader && authHeader.startsWith('Bearer ')) { // checks if the "authorization" header exists and if it starts with "Bearer "
    const token = authHeader.split(' ')[1]; // if conditions are met, it splits the header string by spaces and takes the second part.

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // the parameters in this callback function are returning an error if an error occurs during verification, and the decoded payload of the token if it is successful.
      if (err) {
        return res.status(403).json({ message: "Token is invalid or expired." });
      }
      req.user = decoded; // Add the decoded user payload to the request object
      next();
    });
  } else {
    return res.status(401).json({ message: "A token is required for authentication" });
  }
};

export default verifyToken;