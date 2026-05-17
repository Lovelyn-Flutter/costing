const selections = {
  ...defaultSelections,
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount)
}

function createSelectionRow({
  category,
  key,
  item,
  recurringType,
}) {
  const button = document.createElement('button')

  button.className = 'selection-row'

  if (selections[category] === key) {
    button.classList.add('active')
  }

  button.dataset.category = category
  button.dataset.value = key

  const recurringLabel =
    recurringType === 'monthly'
      ? '/mo'
      : recurringType === 'yearly'
      ? '/yr'
      : ''

  const price =
    item.monthlyPrice ??
    item.yearlyPrice ??
    0

  button.innerHTML = `
    <div class="selection-content">
      <div class="selection-left">
        <div class="radio-circle">
          <div class="radio-dot"></div>
        </div>

        <div>
          <div class="title-row">
            <h4 class="selection-title">
              ${item.title}
            </h4>

            ${
              item.recommended
                ? `
                  <span class="recommended-badge">
                    Recommended
                  </span>
                `
                : ''
            }

            ${
              item.includedInPackage
                ? `
                  <span class="included-badge">
                    Included
                  </span>
                `
                : ''
            }
          </div>

          <p class="selection-description">
            ${item.description}
          </p>
        </div>
      </div>

      <p class="selection-price">
        ${formatCurrency(price)}${recurringLabel}
      </p>
    </div>
  `

  button.addEventListener('click', () => {
    selections[category] = key

    localStorage.setItem(
      'validpointSelections',
      JSON.stringify(selections)
    )

    updateSelectionUI(category)

    updateSidebar()

    if (
      typeof updateMobileDrawer ===
      'function'
    ) {
      updateMobileDrawer()
    }
  })

  return button
}

function updateSelectionUI(category) {
  const rows = document.querySelectorAll(
    `[data-category="${category}"]`
  )

  rows.forEach((row) => {
    if (
      row.dataset.value ===
      selections[category]
    ) {
      row.classList.add('active')
    } else {
      row.classList.remove('active')
    }
  })
}

function renderSelections() {
  const domainContainer =
    document.getElementById(
      'domain-options'
    )

  const hostingContainer =
    document.getElementById(
      'hosting-options'
    )

  const maintenanceContainer =
    document.getElementById(
      'maintenance-options'
    )

  const emailContainer =
    document.getElementById(
      'email-options'
    )

  const newsletterContainer =
    document.getElementById(
      'newsletter-options'
    )

  Object.entries(pricing.domain).forEach(
    ([key, item]) => {
      domainContainer.appendChild(
        createSelectionRow({
          category: 'domain',
          key,
          item,
          recurringType: 'yearly',
        })
      )
    }
  )

  Object.entries(pricing.hosting).forEach(
    ([key, item]) => {
      hostingContainer.appendChild(
        createSelectionRow({
          category: 'hosting',
          key,
          item,
          recurringType:
            item.recurring
              ? 'monthly'
              : '',
        })
      )
    }
  )

  Object.entries(
    pricing.maintenance
  ).forEach(([key, item]) => {
    maintenanceContainer.appendChild(
      createSelectionRow({
        category: 'maintenance',
        key,
        item,
        recurringType:
          item.recurring
            ? 'monthly'
            : '',
      })
    )
  })

  Object.entries(pricing.email).forEach(
    ([key, item]) => {
      emailContainer.appendChild(
        createSelectionRow({
          category: 'email',
          key,
          item,
          recurringType:
            item.recurring
              ? 'monthly'
              : '',
        })
      )
    }
  )

  Object.entries(
    pricing.newsletter
  ).forEach(([key, item]) => {
    newsletterContainer.appendChild(
      createSelectionRow({
        category: 'newsletter',
        key,
        item,
        recurringType:
          item.recurring
            ? 'monthly'
            : '',
      })
    )
  })
}

function calculateSetupTotal() {
  let total =
    pricing.basePackage.setupCost

  const domain =
    pricing.domain[
      selections.domain
    ]

  const hosting =
    pricing.hosting[
      selections.hosting
    ]

  const email =
    pricing.email[
      selections.email
    ]

  const newsletter =
    pricing.newsletter[
      selections.newsletter
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
      selections.hosting
    ].monthlyPrice +
    pricing.maintenance[
      selections.maintenance
    ].monthlyPrice +
    pricing.email[
      selections.email
    ].monthlyPrice +
    pricing.newsletter[
      selections.newsletter
    ].monthlyPrice
  )
}

function updateSidebar() {
  const setupTotal =
    calculateSetupTotal()

  const monthlyTotal =
    calculateMonthlyTotal()

  document.getElementById(
    'sidebar-development'
  ).textContent = formatCurrency(
    pricing.basePackage.setupCost
  )

  const domain =
    pricing.domain[
      selections.domain
    ]

  document.getElementById(
    'sidebar-domain'
  ).textContent =
    domain.includedInPackage
      ? 'Included'
      : `${formatCurrency(
          domain.yearlyPrice
        )}/yr`

  const hosting =
    pricing.hosting[
      selections.hosting
    ]

  document.getElementById(
    'sidebar-hosting'
  ).textContent =
    hosting.includedInPackage
      ? 'Included'
      : `${formatCurrency(
          hosting.monthlyPrice
        )}/mo`

  const maintenance =
    pricing.maintenance[
      selections.maintenance
    ]

  document.getElementById(
    'sidebar-maintenance'
  ).textContent =
    maintenance.monthlyPrice === 0
      ? '₦0'
      : 'Free First Month'

  const email =
    pricing.email[
      selections.email
    ]

  document.getElementById(
    'sidebar-email'
  ).textContent =
    email.monthlyPrice === 0
      ? '₦0'
      : `${formatCurrency(
          email.monthlyPrice
        )}/mo`

  const newsletter =
    pricing.newsletter[
      selections.newsletter
    ]

  document.getElementById(
    'sidebar-newsletter'
  ).textContent =
    newsletter.monthlyPrice === 0
      ? '₦0'
      : `${formatCurrency(
          newsletter.monthlyPrice
        )}/mo`

  document.getElementById(
    'setup-total'
  ).textContent =
    formatCurrency(setupTotal)

  document.getElementById(
    'monthly-total'
  ).textContent = `${formatCurrency(
    monthlyTotal
  )}/mo`

  document.getElementById(
    'maintenance-notice'
  ).textContent =
    pricing.maintenanceNotice
}

renderSelections()

updateSidebar()

localStorage.setItem(
  'validpointSelections',
  JSON.stringify(selections)
)

document
  .getElementById(
    'continue-button'
  )
  .addEventListener('click', () => {
    localStorage.setItem(
      'validpointSelections',
      JSON.stringify(selections)
    )

    window.location.href =
      './review.html'
  })