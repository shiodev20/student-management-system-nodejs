
const getAccountInfo = async (id) => {
  const url = `http://localhost:3000/api/cap-tai-khoan/${id}`
  const rawData = await fetch(url)
  const data = await rawData.json()

  const formTitle =  `Cấp tài khoản`
  const submitTitle = `Cấp tài khoản`
  const accountInput = `
    <div class="field">
      <label class="label">Mã tài khoản</label>
      <div class="control">
        <input class="input" type="text" name="accountId" value="${data.accountId}" readonly>
      </div>
    </div>
  `
  const usernameInput = `
    <div class="field">
      <label class="label">Tên đăng nhập</label>
      <div class="control">
        <input class="input" type="text" name="username" value="${data.emplId}" readonly>
      </div>
    </div>
  `
  const passwordInput =  `
    <div class="field" style="flex: 1;">
      <label class="label">Mật khẩu</label>
      <input class="input" type="text" name="password">
    </div>
  `

  let roleOpts = ''
  data.roles.forEach(role => roleOpts += `<option value=${role.id}>${role.name}</option>`)
  const roleInput = `
    <div class="field" style="flex: 1;">
      <label class="label">Vai trò</label>
      <div class="select" style="width: 100%;">
        <select name="role" style="width: 100%;">
          ${roleOpts}
        </select >
      </div >
    </div >
  `

  let html =
  `
    <div class="form-container">
      <div class="box form-content">
        <p class="form-title">${formTitle}</p>

        <form id="account-add-form" action="/tai-khoan/tao-tai-khoan" method="POST">

          <div class="field is-horizontal">
            <div class="field-body">
              ${accountInput}              
              ${usernameInput}
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-body">
              ${passwordInput}
              ${roleInput}
            </div >

          </div >

          <div class="mt-5 has-text-right">
            <button type="submit" class="button is-primary">${submitTitle}</button>
          </div>
        </form >

      </div >
    </div >
  `
  const modal = document.querySelector('#modal')
  const modelContent = document.querySelector('#modal .modal-content')

  modelContent.innerHTML = html

  modal.classList.add('is-active')
}
