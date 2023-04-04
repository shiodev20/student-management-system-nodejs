/**
 * Flash message
 */
const notification = document.querySelector('.notification')

const handleNotification = (notification) => {
  if(notification) {
    document.addEventListener('DOMContentLoaded', () => {
      (document.querySelectorAll('.notification .close') || []).forEach((btnClose) => {
        const snotification = btnClose.parentNode;
    
        btnClose.addEventListener('click', () => {
          snotification.parentNode.removeChild(notification);
        });
      });
    });

    setTimeout(() => {
      notification.style.left = '10px';
    }, 100)
  
    setTimeout(() => {
      notification.style.left = '-600px';
    }, 5000)
  }
}



/**
 * Check class size
 */
const classSize = document.querySelector('#classSize')
const classSizeMax = document.querySelector('#classSizeMax')
const assignStudentInputs = document.querySelectorAll('input[name=studentIds]')

const handleCheckClassSize = (classSize, classSizeMax, assignStudentInputs) => {
  if(classSize && classSizeMax && assignStudentInputs) {

    if(Number(classSize.value) == Number(classSizeMax.innerHTML)) {
      assignStudentInputs.forEach(input => {
        input.disabled = true
      })
    }
    else {
      let defaultClassSize = Number(classSize.value)

      assignStudentInputs.forEach(input => {

        input.addEventListener('change', () => {
          let count = 0
          assignStudentInputs.forEach(item => {
            if(item.checked) count += 1
          })

          classSize.value = defaultClassSize + count
      
          if(Number(classSize.value) >= Number(classSizeMax.innerHTML)) {
            assignStudentInputs.forEach(item => {
              if(!item.checked) item.disabled = true
            })
          } else {
            assignStudentInputs.forEach(item => {
              if(!item.checked) item.disabled = false
            })
          }
          
        })
      
      })
    }
  }
}

/**
 *  change password modal
 */
const userIdInput =document.querySelector('#changePasswordModal input[name=id]')
const oldPasswordInput = document.querySelector('#changePasswordModal input[name=oldPassword]')
const newPasswordInput = document.querySelector('#changePasswordModal input[name=newPassword]')
const newPassword2Input = document.querySelector('#changePasswordModal input[name=newPassword2]')
const changePasswordSubmit = document.querySelector('#changePasswordModal #changePasswordSubmit')
const changePasswordError = document.querySelector('#changePasswordModalErrorMsg')

const handleChangePasswordModal = (userIdInput, oldPasswordInput, newPasswordInput, newPassword2Input, changePasswordSubmit, changePasswordError) => {

  if(
    userIdInput &&
    oldPasswordInput &&
    newPasswordInput &&
    newPassword2Input &&
    changePasswordSubmit &&
    changePassword
  ) {
    changePasswordSubmit.addEventListener('click', () => {
      if(!oldPasswordInput.value || !newPasswordInput.value || !newPassword2Input.value) {
        changePasswordError.innerHTML = `
          <ul class="my-3 py-3">
            <li>Vui lòng nhập đầy đủ thông tin</li>
          </ul>
        `
      }
    
      else if(newPasswordInput.value.length < 6 || newPassword2Input.value.length < 6) {
        changePasswordError.innerHTML = `
        <ul class="my-3 py-3">
          <li>Mật khẩu phải từ 6 ký tự trở lên</li>
        </ul>
      `
      }
    
      else if(newPasswordInput.value !== newPassword2Input.value) {
        changePasswordError.innerHTML = `
          <ul class="my-3 py-3">
            <li>Mật khẩu nhập lại không chính xác</li>
          </ul>
        `
      }
    
      else {
        changePassword(userIdInput.value, oldPasswordInput.value, newPasswordInput.value, newPassword2Input.value)
      }
    })

  }
}



const firstReportYearSelect = document.querySelector('#report-classroom-subject-score select#year')
const firstReportClassroomSelect = document.querySelector('#report-classroom-subject-score select#classroom')
const firstReportClassroomOptions = document.querySelectorAll('#report-classroom-subject-score select#classroom option')


const handleFirstReport = (yearSelect, classroomSelect, classroomOptions) => {

  if(yearSelect && classroomSelect && classroomOptions) {
    yearSelect.addEventListener('change', (e) => {
      const year = e.target.value
    
      let html = ''
    
      classroomOptions.forEach(option => {
        let value = option.innerHTML.split(' - ')[0]
    
        if(value == year) {
          html += `<option value="${option.value}">${option.innerHTML}</option>`
        }
      })
    
      classroomSelect.innerHTML = html
    })
  }

}

handleNotification(notification)
handleCheckClassSize(classSize, classSizeMax, assignStudentInputs)
handleFirstReport(firstReportYearSelect, firstReportClassroomSelect, firstReportClassroomOptions)
handleChangePasswordModal(userIdInput, oldPasswordInput, newPasswordInput, newPassword2Input, changePasswordSubmit, changePasswordError)


document.querySelector('.navbar-toggler.navbar-toggler-right.d-lg-none.align-self-center')
.addEventListener('click', () => {
  document.querySelector('.sidebar.sidebar-offcanvas').classList.toggle('active')
})