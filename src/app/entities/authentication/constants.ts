export const jwtConstants = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  return {
    secret: process.env.JWT_SECRET,
  };
};
