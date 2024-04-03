const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
} = require("../utils/config");

const handleLogin = async (request, response, next) => {
  try {
    const { username, password } = request.body;
    const foundUser = await User.findOne({ username });

    const validUser =
      foundUser !== null && password != null
        ? await bcrypt.compare(password, foundUser.hashedPassword)
        : false;
    if (!validUser) {
      return response
        .status(401)
        .json({ error: "Username or Password is Invalid" });
    }
    const accessToken = jwt.sign(
      { userID: foundUser._id },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;
    foundUser.save();

    response.cookie("jwt_refresh", refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 86400000,
    });

    response.status(201).json({
      name: foundUser.name,
      username: foundUser.username,
      accessToken: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const handleNewUser = async (request, response, next) => {
  try {
    const { name, username, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
      name,
      username,
      hashedPassword,
    });

    const savedUser = await createdUser.save();
    response
      .status(201)
      .json({ name: savedUser.name, username: savedUser.username });
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (request, response, next) => {
  try {
    const cookies = request.cookies;
    if (!cookies?.jwt_refresh) return response.status(204).end();

    const refreshToken = cookies.jwt_refresh;
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser)
      return response
        .status(204)
        .clearCookie("jwt_refresh", {
          secure: true,
          httpOnly: true,
          maxAge: 86400000,
        })
        .end();

    foundUser.refreshToken = "";
    await foundUser.save();

    return response
      .status(204)
      .clearCookie("jwt_refresh", {
        secure: true,
        httpOnly: true,
        maxAge: 86400000,
      })
      .end();
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (request, response, next) => {
  try {
    const cookies = request.cookies;
    if (!cookies?.jwt_refresh) return response.status(403).end();

    const refreshToken = cookies.jwt_refresh;
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) return response.status(403).end();

    const decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    if (decodedToken.username != foundUser.username) {
      return response.status(403).end();
    }

    const accessToken = jwt.sign(
      { userID: foundUser._id },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    return response.status(201).json({ accessToken: accessToken });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleNewUser,
  handleLogout,
  handleRefreshToken,
};
