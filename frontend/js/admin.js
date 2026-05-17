async function fetchQuotations() {
  try {
    const response = await fetch(
     'https://costing-backend-i91t.onrender.com/api/quotations'

    )

    const quotations =
      await response.json()

    renderQuotations(
      quotations
    )
  } catch (error) {
    console.log(error)
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount)
}

async function updateStatus(
  id,
  status
) {
  try {
    await fetch(
      `https://costing-backend-i91t.onrender.com/api/quotations/${id}/status`,
      {
        method: 'PUT',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          status,
        }),
      }
    )
  } catch (error) {
    console.log(error)
  }
}

function renderQuotations(
  quotations
) {
  const container =
    document.getElementById(
      'admin-grid'
    )

  container.innerHTML = ''

  quotations.forEach(
    (quotation) => {
      const card =
        document.createElement('div')

      card.className = 'admin-card'

      card.innerHTML = `
      <div class="admin-top">
        <div>
          <h3 class="admin-name">
            ${quotation.clientInfo.fullName}
          </h3>

          <p class="admin-company">
            ${quotation.clientInfo.companyName}
          </p>
        </div>

        <select
          class="status-select"
          data-id="${quotation._id}"
        >
          <option value="pending">
            Pending
          </option>

          <option value="seen">
            Seen
          </option>

          <option value="paid_initial">
            Paid Initial
          </option>

          <option value="work_in_progress">
            Work In Progress
          </option>

          <option value="paid_final">
            Paid Final
          </option>

          <option value="delivered">
            Delivered
          </option>
        </select>
      </div>

      <div class="admin-details">
        <div class="admin-row">
          <p>Email</p>

          <span>
            ${quotation.clientInfo.email}
          </span>
        </div>

        <div class="admin-row">
          <p>Phone</p>

          <span>
            ${quotation.clientInfo.phone}
          </span>
        </div>

        <div class="admin-row">
          <p>Setup Total</p>

          <span>
            ${formatCurrency(
              quotation.setupTotal
            )}
          </span>
        </div>

        <div class="admin-row">
          <p>Monthly Total</p>

          <span>
            ${formatCurrency(
              quotation.monthlyTotal
            )}/mo
          </span>
        </div>
      </div>

      <div class="admin-notes">
        <h4>
          Additional Notes
        </h4>

        <p>
          ${
            quotation.clientInfo
              .additionalNotes ||
            'No additional notes.'
          }
        </p>
      </div>
    `

      container.appendChild(card)

      const select =
        card.querySelector(
          '.status-select'
        )

      select.value =
        quotation.status

      select.addEventListener(
        'change',
        async (e) => {
          await updateStatus(
            quotation._id,
            e.target.value
          )
        }
      )
    }
  )
}

fetchQuotations()