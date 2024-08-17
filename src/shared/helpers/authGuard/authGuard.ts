import jwt from 'jsonwebtoken';

export const authGuard = (token: string): boolean => {
  const newToken = token.split(' ')[1];
  
  return !!jwt.verify(newToken, 'secret')?.sub;
}