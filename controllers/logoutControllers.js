const logout_user = (req, res) => {
  // Clear the JWT token stored in local storage or cookie
  res.clearCookie("access_token");

  // Send a response indicating successful logout
  res.status(200).send({
    message: "Successfully logged out",
  });
};

module.exports = {
  logout_user,
};
