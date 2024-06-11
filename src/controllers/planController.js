// import Maestros from '../db/Maestros.js';
// import Plan from '../db/Plan.js';
// import Servicio from '../db/Servicio.js';

// const createPlan = async (req, res) => {
//   const data = req.body
//   try {
//     const newPlan = await Plan.createPlan(data);
//     if (newPlan.error) {
//       return res.status(newPlan.code).send({
//         status: false,
//         message: newPlan.error
//       });
//     }
//     const linkedServicios = await Servicio.linkServicios(data.cservicio, newPlan.result.recordset[0].cplan);
//     if (linkedServicios.error) {
//       return res.status(linkedServicios.code).send({
//         status: false,
//         message: linkedServicios.error
//       });
//     }
//     res.status(201).send({
//       status: true, 
//       message: 'Plan Creado',
//       data: newPlan
//     });
    
//   } catch (error) {
    
//   }
// }
// // const editPlanInfo = async (req, res) => {
// //   const data = req.body
// //   try {
// //     const editedPlan = await Plan.editPlan(req.params.id, data);
// //     if (editedPlan.error) {
// //       return res.status(editedPlan.code).send({
// //         status: false,
// //         message: editedPlan.error
// //       });
// //     }
// //     const linkedServicios = await Servicio.linkServicios(data.cservicio, parseInt(req.params.id));
// //     if (linkedServicios.error) {
// //       return res.status(linkedServicios.code).send({
// //         status: false,
// //         message: linkedServicios.error
// //       });
// //     }
// //     res.status(201).send({
// //       status: true, 
// //       message: 'Plan Editado',
// //       data: editedPlan
// //     });
    
// //   } catch (error) {
    
// //   }
// // }
// // const searchPlanInfo = async (req, res) => {
// //   try {
// //     const plan = await Plan.searchPlanInfo(req.params.id);
// //     if (plan.error) {
// //       return res.status(plan.code).send({
// //         status: false,
// //         message: plan.error
// //       });
// //     }
// //     const planServices = await Servicio.searchPlanServices(plan.result.id);
// //     if (planServices.error) {
// //       return res.status(planServices.code).send({
// //         status: false,
// //         message: planServices.error
// //       });
// //     }
// //     let i = 0
// //     plan.result.cservicio = ''
// //     if(planServices.length> 0){
// //       for (const service of planServices) {     
// //         if(typeof service.cservicio == 'number'){
// //           plan.result.cservicio += `${service.cservicio}?${service.ctiposervicio}`
// //           i++
// //           if(i < planServices.length) {
// //             plan.result.cservicio += `,`
// //           }
// //         } else {
// //           i++
// //         }
// //       }
// //     }
// //     plan.result.ctiposervicio = planServices
// //     res.status(201).send({
// //       status: true, 
// //       message: 'Informacion del Plan Obtenida',
// //       data: plan
// //     });
    
// //   } catch (error) {
    
// //   }
// // }
// const searchPlans = async (req, res) => {
//   const ccompania = req.params.ccompania
//   try {
//     const plans = await Plan.searchPlans(ccompania);
//     // console.log(plans)
//     if (plans.error) {
//       return res.status(plans.code).send({
//         status: false,
//         message: plans.error
//       });
//     }
//     const monedas = await Maestros.getMaMonedas();
    
//     for (const plan of plans) {
//       const gettedMoneda = monedas.result.recordset.find(moneda => moneda.cmoneda == plan.cmoneda)
//       plan.mcosto = `${plan.mcosto.toFixed(2)} ${gettedMoneda.xmoneda}`;
//     }
//     res.status(201).send({
//       status: true, 
//       message: 'Planes Obtenidos',
//       data: plans
//     });
    
//   } catch (error) {
    
//   }
// }

// export default {
//   createPlan,
//   searchPlans,
//   // searchPlanInfo,
//   editPlanInfo
// }