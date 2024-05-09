import Menus from '../db/Menus.js';

const getAdminMenus = async (req, res) => {
  console.log('empieza');
  try {
    const menus = await Menus.getMenus(1);
    if (menus.error) {
      return res.status(menus.code).send({
        status: false,
        message: menus.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Menus Obtenidos',
      data: menus
    });
    
  } catch (error) {
    
  }
}
const getClubMenus = async (req, res) => {
  try {
    const menus = await Menus.getMenus(2);
    if (menus.error) {
      return res.status(menus.code).send({
        status: false,
        message: menus.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Menus Obtenidos',
      data: menus
    });
    
  } catch (error) {
    
  }
}

export default {
  getAdminMenus,
  getClubMenus,
}