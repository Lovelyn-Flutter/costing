const express = require('express')

const router = express.Router()

const {
  createQuotation,
  getQuotations,
  updateQuotationStatus,
} = require('../controllers/quotationController')

router.post(
  '/',
  createQuotation
)

router.get(
  '/',
  getQuotations
)

router.put(
  '/:id/status',
  updateQuotationStatus
)

module.exports = router