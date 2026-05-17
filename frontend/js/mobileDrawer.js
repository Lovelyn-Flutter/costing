const drawerSelections =
  JSON.parse(
    localStorage.getItem(
      'validpointSelections'
    )
  ) || defaultSelections

function formatDrawerCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount)
}

function calculateDrawerSetupTotal() {
  let total =
    pricing.basePackage.setupCost

  const domain =
    pricing.domain[
      drawerSelections.domain
    ]

  const hosting =
    pricing.hosting[
      drawerSelections.hosting
    ]

  const email =
    pricing.email[
      drawerSelections.email
    ]

  const newsletter =
    pricing.newsletter[
      drawerSelections.newsletter
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

function calculateDrawerMonthlyTotal() {
  return (
    pricing.hosting[
      drawerSelections.hosting
    ].monthlyPrice +
    pricing.maintenance[
      drawerSelections.maintenance
    ].monthlyPrice +
    pricing.email[
      drawerSelections.email
    ].monthlyPrice +
    pricing.newsletter[
      drawerSelections.newsletter
    ].monthlyPrice
  )
}

function createMobileDrawer() {
  const drawer =
    document.createElement('div')

  drawer.className =
    'mobile-estimate-bar'

  drawer.innerHTML = `
    <div
      class="mobile-bar-collapsed"
      id="mobile-bar-toggle"
    >
      <div class="mobile-bar-pricing">
        <div>
          <p class="mobile-bar-label">
            Setup
          </p>

          <h3
            class="mobile-bar-price"
            id="mobile-setup-total"
          ></h3>
        </div>

        <div>
          <p class="mobile-bar-label">
            Monthly
          </p>

          <h3
            class="mobile-bar-price"
            id="mobile-monthly-total"
          ></h3>
        </div>
      </div>

      <button class="mobile-expand-btn">
        ↑
      </button>
    </div>

    <div
      class="mobile-bar-expanded"
      id="mobile-bar-expanded"
    >
      <div class="mobile-expanded-header">
        <h3>
          Current Estimate
        </h3>

        <button
          id="mobile-close-btn"
        >
          ✕
        </button>
      </div>

      <div class="mobile-estimate-totals">
  <div class="mobile-estimate-total-card">
    <p>
      Initial Setup
    </p>

    <h3
      id="mobile-expanded-setup"
    ></h3>
  </div>

  <div class="mobile-estimate-total-card">
    <p>
      Monthly Recurring
    </p>

    <h3
      id="mobile-expanded-monthly"
    ></h3>
  </div>
</div>

<div
  class="mobile-estimate-content"
  id="mobile-estimate-content"
></div>

<div class="mobile-estimate-note">
        Maintenance billing begins
        after the first free month.
      </div>
    </div>
  `

  document.body.appendChild(drawer)

  setupDrawerEvents()

  updateMobileDrawer()
}

function updateMobileDrawer() {
  const latestSelections =
    JSON.parse(
      localStorage.getItem(
        'validpointSelections'
      )
    ) || defaultSelections

  Object.assign(
    drawerSelections,
    latestSelections
  )

  const setupTotal =
    calculateDrawerSetupTotal()

  const monthlyTotal =
    calculateDrawerMonthlyTotal()

  const setupElement =
    document.getElementById(
      'mobile-setup-total'
    )

  const monthlyElement =
    document.getElementById(
      'mobile-monthly-total'
    )

  if (setupElement) {
    setupElement.textContent =
      formatDrawerCurrency(setupTotal)
  }

  if (monthlyElement) {
    monthlyElement.textContent = `${formatDrawerCurrency(
      monthlyTotal
    )}/mo`
  }

  const expandedSetup =
  document.getElementById(
    'mobile-expanded-setup'
  )

const expandedMonthly =
  document.getElementById(
    'mobile-expanded-monthly'
  )

if (expandedSetup) {
  expandedSetup.textContent =
    formatDrawerCurrency(setupTotal)
}

if (expandedMonthly) {
  expandedMonthly.textContent = `${formatDrawerCurrency(
    monthlyTotal
  )}/mo`
}

  const content =
    document.getElementById(
      'mobile-estimate-content'
    )

  if (content) {
    const domain =
      pricing.domain[
        drawerSelections.domain
      ]

    const hosting =
      pricing.hosting[
        drawerSelections.hosting
      ]

    const maintenance =
      pricing.maintenance[
        drawerSelections.maintenance
      ]

    const email =
      pricing.email[
        drawerSelections.email
      ]

    const newsletter =
      pricing.newsletter[
        drawerSelections.newsletter
      ]

    content.innerHTML = `
      <div class="mobile-estimate-row">
        <p>Development</p>

        <span>
          ${formatDrawerCurrency(
            pricing.basePackage.setupCost
          )}
        </span>
      </div>

      <div class="mobile-estimate-row">
        <p>Domain</p>

        <span>
          ${
            domain.includedInPackage
              ? 'Included'
              : `${formatDrawerCurrency(
                  domain.yearlyPrice
                )}/yr`
          }
        </span>
      </div>

      <div class="mobile-estimate-row">
        <p>Hosting</p>

        <span>
          ${
            hosting.includedInPackage
              ? 'Included'
              : `${formatDrawerCurrency(
                  hosting.monthlyPrice
                )}/mo`
          }
        </span>
      </div>

      <div class="mobile-estimate-row">
        <p>Maintenance</p>

        <span>
          ${
            maintenance.monthlyPrice ===
            0
              ? '₦0'
              : `${formatDrawerCurrency(
                  maintenance.monthlyPrice
                )}/mo`
          }
        </span>
      </div>

      <div class="mobile-estimate-row">
        <p>Email</p>

        <span>
          ${
            email.monthlyPrice === 0
              ? '₦0'
              : `${formatDrawerCurrency(
                  email.monthlyPrice
                )}/mo`
          }
        </span>
      </div>

      <div class="mobile-estimate-row">
        <p>Newsletter</p>

        <span>
          ${
            newsletter.monthlyPrice ===
            0
              ? '₦0'
              : `${formatDrawerCurrency(
                  newsletter.monthlyPrice
                )}/mo`
          }
        </span>
      </div>
    `
  }
}

function setupDrawerEvents() {
  const toggle =
    document.getElementById(
      'mobile-bar-toggle'
    )

  const expanded =
    document.getElementById(
      'mobile-bar-expanded'
    )

  const closeBtn =
    document.getElementById(
      'mobile-close-btn'
    )

  toggle.addEventListener(
    'click',
    () => {
      expanded.classList.add(
        'active'
      )
    }
  )

  closeBtn.addEventListener(
    'click',
    () => {
      expanded.classList.remove(
        'active'
      )
    }
  )
}

createMobileDrawer()