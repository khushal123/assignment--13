const express = require('express');
const { param, validationResult } = require("express-validator")
const router = express.Router();
const { errorResponse } = require("../utils/response");
const { checkHeader } = require("../middleware/verifytoken")
const indexController = require("../controllers/indexController");

router.get('/get-client/:cid', checkHeader, [
  param("cid", "A valid client id is required")
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors, 400)
  }
  return indexController.getClient(req, res)
});


router.patch('/update-patch', checkHeader, [
  param("cid", "A valid client id is required")
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors, 400)
  }
  return indexController.updateTaxExemptAll(req, res)
})

router.put('/update-client/:cid', checkHeader, [
  param("cid", "A valid client id is required")
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors, 400)
  }
  return indexController.updateTaxExempt(req, res)
})

router.get('/tax-invoice/:ad_campaign_id', checkHeader, [
  param("ad_campaign_id", "A valid client id is required")
], (req, res) => {
  if (!errors.isEmpty()) {
    return errorResponse(res, errors, 400)
  }
  return indexController.renderInvoice(req, res)
})

module.exports = router;
