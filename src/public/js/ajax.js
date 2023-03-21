
const changePassword = async (id, oldPassword, newPassword, newPassword2) => {
  const url = `http://localhost:3000/api/doi-mat-khau/${id}`

  const body = {
    oldPassword,
    newPassword,
    newPassword2,  
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()


}
