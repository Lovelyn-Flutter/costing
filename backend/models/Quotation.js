const mongoose = require('mongoose')

const quotationSchema =
  new mongoose.Schema(
    {
      clientInfo: {
        fullName: {
          type: String,
          required: true,
        },

        companyName: {
          type: String,
          required: true,
        },

        email: {
          type: String,
          required: true,
        },

        phone: {
          type: String,
          required: true,
        },

        additionalNotes: {
          type: String,
          default: '',
        },
      },

      selections: {
        domain: {
          type: String,
          required: true,
        },

        hosting: {
          type: String,
          required: true,
        },

        maintenance: {
          type: String,
          required: true,
        },

        email: {
          type: String,
          required: true,
        },

        newsletter: {
          type: String,
          required: true,
        },
      },

      setupTotal: {
        type: Number,
        required: true,
      },

      monthlyTotal: {
        type: Number,
        required: true,
      },

      initialPayment: {
        type: Number,
        required: true,
      },

      finalPayment: {
        type: Number,
        required: true,
      },

      status: {
        type: String,

        enum: [
          'pending',
          'seen',
          'paid_initial',
          'work_in_progress',
          'paid_final',
          'delivered',
        ],

        default: 'pending',
      },
    },
    {
      timestamps: true,
    }
  )

module.exports = mongoose.model(
  'Quotation',
  quotationSchema
)