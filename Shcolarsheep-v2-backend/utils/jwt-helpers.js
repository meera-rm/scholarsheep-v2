const jwt = require('jsonwebtoken');

function generateTokens(user) {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.user_role || user.role,
    avatar: user.user_avatar || user.avatar || '',
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30d',
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
}

module.exports = generateTokens;
