import userService from '../service/userService.js';

const getUserInfo = async (req, res) => {
    const user = await userService.getUserInfo(req.params.id);
    if (user.error) { 
      res.status(user.code).send({ 
        status: false,
        message: user.error
      });
      return;
    }
    res.status(201).send({ 
      status: true, 
      message: 'Informacion del Usuario Obtenida',
      data: user
    });
    return;
};

export default {
  getUserInfo,
}