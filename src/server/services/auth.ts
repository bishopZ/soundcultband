export const verifyUser = (username: string, password: string) => {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    return null;
  }

  if (username !== adminUsername || password !== adminPassword) {
    return null;
  }

  return {
    name: 'Admin',
    email: adminUsername,
  };
};

