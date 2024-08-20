import jwt from 'jsonwebtoken';

export const getTokenPayload = (token: string) => {
  const newToken = token.split(' ')[1];
  
  return jwt.verify(newToken, 'secret');
}