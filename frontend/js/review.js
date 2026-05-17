function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount)
}

const savedSelections =
  JSON.parse(
    localStorage.getItem(
      'validpointSelections'
    )
  ) || defaultSelections

function calculateSetupTotal() {
  let total =
    pricing.basePackage.setupCost

  const domain =
    pricing.domain[
      savedSelections.domain
    ]

  const hosting =
    pricing.hosting[
      savedSelections.hosting
    ]

  const email =
    pricing.email[
      savedSelections.email
    ]

  const newsletter =
    pricing.newsletter[
      savedSelections.newsletter
    ]

  if (domain.addToSetupCost) {
    total += domain.yearlyPrice
  }

  if (hosting.addToSetupCost) {
    total += hosting.monthlyPrice
  }

  if (email.addToSetupCost) {
    total += email.monthlyPrice
  }

  if (newsletter.addToSetupCost) {
    total += newsletter.monthlyPrice
  }

  return total
}

function calculateMonthlyTotal() {
  return (
    pricing.hosting[
      savedSelections.hosting
    ].monthlyPrice +
    pricing.maintenance[
      savedSelections.maintenance
    ].monthlyPrice +
    pricing.email[
      savedSelections.email
    ].monthlyPrice +
    pricing.newsletter[
      savedSelections.newsletter
    ].monthlyPrice
  )
}

function createReviewCard(title, description) {
  return `
    <div class="review-card">
      <div class="review-card-icon">
        ✓
      </div>

      <div>
        <h4 class="review-card-title">
          ${title}
        </h4>

        <p class="review-card-description">
          ${description}
        </p>
      </div>
    </div>
  `
}

function renderReviewSummary() {
  const container =
    document.getElementById(
      'review-summary'
    )

  const items = [
    pricing.domain[
      savedSelections.domain
    ],

    pricing.hosting[
      savedSelections.hosting
    ],

    pricing.maintenance[
      savedSelections.maintenance
    ],

    pricing.email[
      savedSelections.email
    ],

    pricing.newsletter[
      savedSelections.newsletter
    ],
  ]

  container.innerHTML = ''

  items.forEach((item) => {
    container.innerHTML +=
      createReviewCard(
        item.title,
        item.description
      )
  })
}

function updateReviewSidebar() {
  const setupTotal =
    calculateSetupTotal()

  const monthlyTotal =
    calculateMonthlyTotal()

  const initialPayment =
    setupTotal * 0.7

  const finalPayment =
    setupTotal * 0.3

  const domain =
    pricing.domain[
      savedSelections.domain
    ]

  const hosting =
    pricing.hosting[
      savedSelections.hosting
    ]

  const maintenance =
    pricing.maintenance[
      savedSelections.maintenance
    ]

  const email =
    pricing.email[
      savedSelections.email
    ]

  const newsletter =
    pricing.newsletter[
      savedSelections.newsletter
    ]

  document.getElementById(
    'review-sidebar-development'
  ).textContent = formatCurrency(
    pricing.basePackage.setupCost
  )

  document.getElementById(
    'review-sidebar-domain'
  ).textContent =
    domain.includedInPackage
      ? 'Included'
      : `${formatCurrency(
          domain.yearlyPrice
        )}/yr`

  document.getElementById(
    'review-sidebar-hosting'
  ).textContent =
    hosting.includedInPackage
      ? 'Included'
      : `${formatCurrency(
          hosting.monthlyPrice
        )}/mo`

  document.getElementById(
    'review-sidebar-maintenance'
  ).textContent =
    maintenance.monthlyPrice === 0
      ? '₦0'
      : `${formatCurrency(
          maintenance.monthlyPrice
        )}/mo`

  document.getElementById(
    'review-sidebar-email'
  ).textContent =
    email.monthlyPrice === 0
      ? '₦0'
      : `${formatCurrency(
          email.monthlyPrice
        )}/mo`

  document.getElementById(
    'review-sidebar-newsletter'
  ).textContent =
    newsletter.monthlyPrice === 0
      ? '₦0'
      : `${formatCurrency(
          newsletter.monthlyPrice
        )}/mo`

  document.getElementById(
    'review-sidebar-setup-total'
  ).textContent =
    formatCurrency(setupTotal)

  document.getElementById(
    'review-sidebar-monthly-total'
  ).textContent = `${formatCurrency(
    monthlyTotal
  )}/mo`

  document.getElementById(
    'review-setup-total'
  ).textContent =
    formatCurrency(setupTotal)

  document.getElementById(
    'review-monthly-total'
  ).textContent = `${formatCurrency(
    monthlyTotal
  )}/mo`

  document.getElementById(
    'initial-payment'
  ).textContent = `70% : ${formatCurrency(
    initialPayment
  )}`

  document.getElementById(
    'final-payment'
  ).textContent = `30% : ${formatCurrency(
    finalPayment
  )}`
}

document
  .getElementById(
    'submit-review'
  )
  .addEventListener(
    'click',
    async () => {
      const inputs =
        document.querySelectorAll(
          'input'
        )

      const textarea =
        document.querySelector(
          'textarea'
        )

      inputs.forEach((input) => {
        input.classList.remove(
          'input-error'
        )
      })

      let hasError = false

      inputs.forEach((input) => {
        if (
          input.value.trim() === ''
        ) {
          input.classList.add(
            'input-error'
          )

          hasError = true
        }
      })

      if (hasError) {
        document
          .getElementById(
            'validation-modal'
          )
          .classList.add('active')

        return
      }

      const fullName =
        inputs[0].value

      const companyName =
        inputs[1].value

      const email =
        inputs[2].value

      const phone =
        inputs[3].value

      const additionalNotes =
        textarea.value

      const setupTotal =
        calculateSetupTotal()

      const monthlyTotal =
        calculateMonthlyTotal()

      const initialPayment =
        setupTotal * 0.7

      const finalPayment =
        setupTotal * 0.3

      const payload = {
        clientInfo: {
          fullName,
          companyName,
          email,
          phone,
          additionalNotes,
        },

        selections:
          savedSelections,

        setupTotal,

        monthlyTotal,

        initialPayment,

        finalPayment,
      }

      const result =
        await submitQuotation(
          payload
        )

      if (result.quotation) {
        window.location.href =
          './success.html'
      }
    }
  )

document
  .getElementById(
    'close-validation'
  )
  .addEventListener(
    'click',
    () => {
      document
        .getElementById(
          'validation-modal'
        )
        .classList.remove('active')
    }
  )

renderReviewSummary()

updateReviewSidebar()

