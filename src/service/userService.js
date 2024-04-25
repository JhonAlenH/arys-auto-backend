import INMA from '../db/INMA.js';
import Maestros from '../db/Maestros.js';
import Plan from '../db/Plan.js';
import User from '../db/User.js';

const getUserInfo = async (id) => {
  const userResult = await User.getOneUserById(id);
  if (userResult.error) {
    return { error: userResult.error, code: 500 };
  }
  if (userResult.rowsAffected < 1) {
      return { error: "Error", code: 401 };
  }
  const userInfo = userResult.recordset[0]
  if(!userInfo) {
    return { error: "Error", code: 401 };
  }
  const ownerResult = await User.getOwnerInfo(userInfo.cpropietario.toString());
  if (ownerResult.error) {
    return { error: ownerResult.error, code: 500 };
  }
  if (ownerResult.rowsAffected < 1) {
    return { error: "Error", code: 401 };
  }
  const ownerInfo = ownerResult.recordset[0]
  
  const gettedUserSubscription = await getUserSubscription(ownerInfo.cpropietario)
  
  const result = {...ownerInfo, ...userInfo}
  result.subscription = gettedUserSubscription

  const gettedMetPago = await Maestros.getMaMetPago(gettedUserSubscription.cmetodologiapago)
  if (ownerResult.error) {
    return { error: ownerResult.error, code: 500 };
  }
  if (ownerResult.rowsAffected < 1) {
    return { error: "Error", code: 401 };
  }
  result.subscription.metodologiapago = gettedMetPago.result.recordset[0]
  return result;
}

const getUserSubscription = async (cpropietario) => {
  const subscriptionInfo = await User.getUserSubscription(cpropietario.toString());
  if (subscriptionInfo.error) {
    return { error: subscriptionInfo.error, code: 500 };
  }
  const getPlanInfo = await Plan.searchPlanInfo(subscriptionInfo.recordset[0].cplan)
  if (getPlanInfo.error) { 
    return { error: getPlanInfo.error, code: 500 };
  }
  if (getPlanInfo.result.xplan.includes('DIAMANTE')) {
    getPlanInfo.result.color = 'diamond'
    getPlanInfo.result.icon = 'fa-regular fa-gem'
  } else if (getPlanInfo.result.xplan.includes('GOLD')) {
    getPlanInfo.result.color = 'gold'
    getPlanInfo.result.icon = 'fa-solid fa-coins'
  } else if (getPlanInfo.result.xplan.includes('PLUS')) {
    getPlanInfo.result.color = 'plus'
    getPlanInfo.result.icon = 'fa-solid fa-plus'
  } else if (getPlanInfo.result.xplan.includes('BASICO')) {
    getPlanInfo.result.color = 'basic'
    getPlanInfo.result.icon = 'fa-solid fa-ticket-simple'
  }
  subscriptionInfo.recordset[0].plan = getPlanInfo.result

  const gettedStatus = await Maestros.getStatus(subscriptionInfo.recordset[0].cestatusgeneral)
  if (gettedStatus.error) { 
    return { error: gettedStatus.error, code: 500 };
  }

  subscriptionInfo.recordset[0].estatusgeneral = gettedStatus.result.recordset[0]
  
  return subscriptionInfo.recordset[0]
}
const getINMAInfo = async (id_vehiculo) => {
  const gettedINMAInfo = await INMA.getINMAInfo(id_vehiculo)
  if (gettedINMAInfo.error) { 
    return { error: gettedINMAInfo.error, code: 500 };
  }
  
  const gettedColor = await INMA.getColor(gettedINMAInfo.ccolor.toString())
  if (gettedColor.error) { 
    return { error: gettedColor.error, code: 500 };
  }
  gettedINMAInfo.color = gettedColor
  return gettedINMAInfo
}


export default {
  getUserInfo,
  getUserSubscription,
  getINMAInfo,
}