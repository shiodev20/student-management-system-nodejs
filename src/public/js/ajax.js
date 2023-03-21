
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
  
  if (!data.status) {
    console.log(data);
    const notification = document.createElement('div')
    notification.classList.add('notification')
    notification.classList.add('bg-danger')

    notification.innerHTML = `
      <button type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      ${data.message}
    `
    document.querySelector('#changePasswordModal').classList.remove('show')

    document.querySelector('body').classList.remove('modal-open')
    document.querySelector('.modal-backdrop').style.display = 'none'

    document.querySelector('body').appendChild(notification)
    
    document.querySelectorAll('.notification .close').forEach((btnClose) => {
      const snotification = btnClose.parentNode;
  
      btnClose.addEventListener('click', () => {
        snotification.parentNode.removeChild(notification);
      })
    })

    setTimeout(() => {
      notification.style.left = '10px';
    }, 100)

    setTimeout(() => {
      notification.style.left = '-600px';
    }, 5000)

    return
  }

  window.location.href = '/dang-xuat'

}
