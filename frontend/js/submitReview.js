async function submitQuotation(data) {
  try {
    const response = await fetch(
     '/api/quotations',
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify(data),
      }
    )

    const result =
      await response.json()

    return result
  } catch (error) {
    console.log(error)

    return {
      message:
        'Something went wrong',
    }
  }
}