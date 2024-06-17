import INMA from '../db/INMA.js';
import Maestros from '../db/Maestros.js';
import Plan from '../db/Plan.js';
import User from '../db/User.js';
import dayjs from "dayjs";

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
  const ownerResult = await User.getOwnerInfo(userInfo.xcedula.toString());
  if (ownerResult.error) {
    return { error: ownerResult.error, code: 500 };
  }
  if (ownerResult.rowsAffected < 1) {
    return { error: "Error", code: 401 };
  }
  const ownerInfo = ownerResult.recordset[0]
  
  const gettedUserSubscription = await getUserSubscription(ownerInfo.cpropietario)
  
  

  const gettedDocuments = await User.getUserDocuments(userInfo.cusuario)
  if (gettedDocuments.error) {
    return { error: gettedDocuments.error, code: 500 };
  }

  const result = {...ownerInfo, ...userInfo}
  result.subscription = gettedUserSubscription
  if(gettedDocuments) {
    result.documents = gettedDocuments
  } else {
    result.documents = []
  }

  if (ownerResult.rowsAffected < 1) {
    return { error: "Error", code: 401 };
  }
  // result.subscription.metodologiapago = gettedMetPago.result.recordset[0]
  return result;
}
const getUserSubscription = async (cpropietario) => {
  const subscriptionInfo = await User.getUserSubscription(cpropietario.toString());
  if (subscriptionInfo.error) {
    return { error: subscriptionInfo.error, code: 500 };
  }
  // const getPlanInfo = await Plan.searchPlanInfo(subscriptionInfo.recordset[0].cplan)
  // if (getPlanInfo.error) { 
  //   return { error: getPlanInfo.error, code: 500 };
  // }
  for (const sub of subscriptionInfo.recordset) {
    
    if (sub.xplan.includes('DIAMANTE')) {
      sub.xplancolor = 'diamond'
      sub.xplanicon = 'fa-regular fa-gem'
    } else if (sub.xplan.includes('GOLD')) {
      sub.xplancolor = 'gold'
      sub.xplanicon = 'fa-solid fa-coins'
    } else if (sub.xplan.includes('PLUS')) {
      sub.xplancolor = 'plus'
      sub.xplanicon = 'fa-solid fa-plus'
    } else if (sub.xplan.includes('BASICO')) {
      sub.xplancolor = 'basic'
      sub.xplanicon = 'fa-solid fa-ticket-simple'
    }
    sub.xfdesde = dayjs(sub.fdesde).format('DD/MM/YYYY')
    sub.xfhasta = dayjs(sub.fhasta).format('DD/MM/YYYY')
  }
  // subscriptionInfo.recordset[0].plan = getPlanInfo.result

  // const gettedStatus = await Maestros.getStatus(subscriptionInfo.recordset[0].cestatusgeneral)
  // if (gettedStatus.error) { 
  //   return { error: gettedStatus.error, code: 500 };
  // }

  // subscriptionInfo.recordset[0].estatusgeneral = gettedStatus.result.recordset[0]
  
  return subscriptionInfo.recordset
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