import PropTypes from 'prop-types'
const loginForm = (
  {
    handleLogin,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange
  }) => (
  <form onSubmit={handleLogin}>
    <div>
        username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
        password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)
loginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default loginForm