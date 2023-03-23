const {
  getProductValidator,
  postProductValidator,
  putProductValidator,
  deleteProductValidator,
} = require("../validations/product-validator");
const {
  getProduct,
  getProducts,
  postProduct,
  putProduct,
  deleteProduct,
  updateProductStock,
  getOfertByProductId,
} = require("../controllers/product");
const { Router } = require("express");
const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductValidator, getProduct);
router.get("/ofert/:id", getOfertByProductId);
router.post("/", postProductValidator, postProduct);

// Actualizar - privado - cualquiera con token válido
router.put("/updateStock/:id", updateProductStock);
router.put("/:id", putProductValidator, putProduct);

// Borrar un producto - Admin
router.delete("/:id", deleteProductValidator, deleteProduct);

module.exports = router;
