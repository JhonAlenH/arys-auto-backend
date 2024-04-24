import User from '../db/User.js';

const getUserInfo = async (id) => {
  const userResult = await User.getOneUserById(id);
  if (userResult.error) {
      return { error: userResult.error, code: 500 };
  }
  if (userResult.rowsAffected < 1) {
      return { error: "Authentication Error", code: 401 };
  }
  const userInfo = userResult.recordset[0]
  const ownerResult = await User.getOwnerInfo(userInfo.cpropietario.toString());
  if (ownerResult.error) {
      return { error: ownerResult.error, code: 500 };
  }
  if (ownerResult.rowsAffected < 1) {
      return { error: "Authentication Error", code: 401 };
  }
  const ownerInfo = ownerResult.recordset[0]
  const result = {...ownerInfo, ...userInfo}
  return result;
}

export default {
  getUserInfo,
}