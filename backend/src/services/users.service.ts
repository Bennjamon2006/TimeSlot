const createUser = async (userData: any) => {
  // Logic to create a user in the database
  console.log("Creating user with data:", userData);

  // Simulate database operation
  return { id: 1, ...userData };
};

const usersService = {
  createUser,
};

export default usersService;
