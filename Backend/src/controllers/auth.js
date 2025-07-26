const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, roleId } = req.body;

  const newUser = {
    _id: Date.now(),
    firstName,
    lastName,
    email,
    password,
    roleId,
  };

  res.status(201).json(newUser);
};

module.exports = { registerUser };
