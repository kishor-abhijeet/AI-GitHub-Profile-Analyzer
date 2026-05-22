export const parseGithubUsername = (input = '') => {
  const decoded = decodeURIComponent(input).trim();

  if (!decoded) {
    const error = new Error('A GitHub username or profile URL is required.');
    error.statusCode = 400;
    throw error;
  }

  const withoutTrailingSlash = decoded.replace(/\/+$/, '');

  try {
    const url = new URL(withoutTrailingSlash);
    const isGithubHost = ['github.com', 'www.github.com'].includes(url.hostname.toLowerCase());

    if (!isGithubHost) {
      throw new Error('Not a GitHub URL');
    }

    const username = url.pathname.split('/').filter(Boolean)[0];
    return validateUsername(username);
  } catch {
    return validateUsername(withoutTrailingSlash.replace(/^@/, ''));
  }
};

const validateUsername = (username = '') => {
  const normalized = username.trim();
  const isValid = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(normalized);

  if (!isValid) {
    const error = new Error('Enter a valid GitHub username or profile URL.');
    error.statusCode = 400;
    throw error;
  }

  return normalized;
};
