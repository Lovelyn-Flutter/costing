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
  return (
    pricing.basePackage.setupCost +
    pricing.domain[
      drawerSelections.domain
    ].yearlyPrice
  )
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
    'mobile-drawer'

  drawer.innerHTML = `
    <div class="mobile-drawer-header">
      <div>
        <p class="mobile-drawer-label">
          Current Estimate
        </p>

        <h3
          class="mobile-drawer-total"
          id="mobile-setup-total"
        ></h3>
      </div>

      <button
        class="mobile-drawer-toggle"
        id="mobile-drawer-toggle"
      >
        ↑
      </button>
    </div>

    <div
      class="mobile-drawer-content"
      id="mobile-drawer-content"
    >
      <div class="mobile-drawer-rows">
        <div class="mobile-drawer-row">
          <p>Monthly Services</p>

          <span
            id="mobile-monthly-total"
          ></span>
        </div>

        <div class="mobile-drawer-row">
          <p>Maintenance</p>

          <span>
            Free First Month
          </span>
        </div>

        <div class="mobile-drawer-row">
          <p>Timeline</p>

          <span>
            3 Weeks
          </span>
        </div>

        <div class="mobile-drawer-row">
          <p>Initial Payment</p>

          <span>
            70%
          </span>
        </div>
      </div>

      <p class="mobile-drawer-note">
        Maintenance billing begins after the
        first free month.
      </p>
    </div>
  `

  document.body.appendChild(drawer)

  updateMobileDrawer()

  setupMobileDrawerToggle()
}

function updateMobileDrawer() {
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
}

function setupMobileDrawerToggle() {
  const toggle =
    document.getElementById(
      'mobile-drawer-toggle'
    )

  const content =
    document.getElementById(
      'mobile-drawer-content'
    )

  let isOpen = false

  toggle.addEventListener('click', () => {
    isOpen = !isOpen

    if (isOpen) {
      content.style.maxHeight =
        content.scrollHeight + 'px'

      toggle.textContent = '↓'
    } else {
      content.style.maxHeight = '0px'

      toggle.textContent = '↑'
    }
  })
}

createMobileDrawer()