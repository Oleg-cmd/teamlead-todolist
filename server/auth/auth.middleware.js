import { addon } from "../../app.js";

export const authMiddleware = (req, res, next) => {
  try {
    addon.checkValidToken()(req, res, () => {
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "Authentication required" });
  }
};
