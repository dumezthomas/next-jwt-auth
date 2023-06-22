export const isTokenExpired = (token: IToken): boolean => {
  const { date, validity } = token;
  const now = new Date();
  const tokenDate = new Date(date);

  const diff = now.getTime() - tokenDate.getTime();
  return diff > validity;
};
