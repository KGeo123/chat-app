import jwt from 'jsonwebtoken';

export default async function fetchProtected(url, accessToken, options = null) {
  const decodedToken = jwt.decode(accessToken);
  let token = accessToken;
  let shouldRefreshToken = false;
  const hasTokenExpired = Date.now() >= decodedToken.exp * 1000;
  if (hasTokenExpired) {
    console.log('token expired');
    const response = await fetch('http://localhost:5000/auth/refresh-token', {
      credentials: 'include'
    });
    shouldRefreshToken = true;
    const data = await response.json();
    token = data.accessToken;
  }
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options?.headers ? options.headers : null)
    }
  });
  const data = await response.json();
  return { data, newToken: shouldRefreshToken ? token : null };
}
