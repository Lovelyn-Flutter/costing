const Quotation = require('../models/Quotation')

const createQuotation = async (
  req,
  res
) => {
  try {
    const quotation =
      await Quotation.create(req.body)

    res.status(201).json({
      quotation,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message:
        'Server error while creating quotation',
    })
  }
}

const getQuotations = async (
  req,
  res
) => {
  try {
    const quotations =
      await Quotation.find().sort({
        createdAt: -1,
      })

    res.status(200).json(
      quotations
    )
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message:
        'Server error while fetching quotations',
    })
  }
}

const updateQuotationStatus =
  async (req, res) => {
    try {
      const quotation =
        await Quotation.findById(
          req.params.id
        )

      if (!quotation) {
        return res
          .status(404)
          .json({
            message:
              'Quotation not found',
          })
      }

      quotation.status =
        req.body.status

      await quotation.save()

      res.status(200).json({
        message:
          'Status updated successfully',

        quotation,
      })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message:
          'Server error while updating quotation',
      })
    }
  }

module.exports = {
  createQuotation,
  getQuotations,
  updateQuotationStatus,
}