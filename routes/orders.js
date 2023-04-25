const { Router } = require("express");
const {
  getOrders,
  postOrder,
  putOrder,
  deleteOrder,
  getOrder,
  getUserOrder,
  getClientOrder,
  getOrdersToday,
  getOrdersActives,
  getOrdersByDay,
  getOrdersTotalsByMonth,
  getOrdersPaginate,
  getClientOrderDebt,
} = require("../controllers/orders");
const {
  postOrderValidator,
  getOrderValidator,
  putOrderValidator,
  deleteOrderValidator,
  getOrderUserValidator,
  getOrderClientValidator,
  postOrderLocalValidator,
} = require("../validations/order-validator");

const router = Router();

// /api/orders?limit=20&init=10
/* router.get("/", getAllorders);

router.get("/:id",  getAllordersByNumber);

router.post("/",[validarUsuarioWhatsapp, validateFields], postNewOrder);

router.put("/:id",[validarUsuarioWhatsapp, validateFields], postNewOrder);

router.delete("/:id",[validarUsuarioWhatsapp, validateFields], postNewOrder); */
router.get("/", getOrders);
router.get("/paginate", getOrdersPaginate);
router.get("/today", getOrdersToday);
router.get("/active", getOrdersActives);
router.get("/days/:days", getOrdersByDay);

router.get("/:id", getOrderValidator, getOrder);
router.get("/user/:id", getOrderUserValidator, getUserOrder);
router.get("/client/:id", getOrderClientValidator, getClientOrder);
router.get("/clientDebt/:id", getOrderClientValidator, getClientOrderDebt);

router.post("/", postOrderValidator, postOrder);
router.post("/local", postOrderLocalValidator, postOrder);

router.put("/:id", putOrderValidator, putOrder);

router.delete("/:id", deleteOrderValidator, deleteOrder);

module.exports = router;
