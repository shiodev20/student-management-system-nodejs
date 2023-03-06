/**
 *  Navbar mobile
 */

const navbarToggleBtn = document.querySelector('.navbar-burger')
const navbarMenu = document.querySelector('.navbar-menu')

const handleMobileNavbar = (navbarToggleBtn, navbarMenu) => {
  if(navbarToggleBtn && navbarMenu) {
    navbarToggleBtn.addEventListener('click', () => {
      navbarMenu.classList.toggle('is-active')
    })
  }
}

/** 
 * Classroom detail tab
*/

const tabItems = document.querySelectorAll('.tab-item')
const paneItems = document.querySelectorAll('.pane-item')

const handleTab = (tabItems, paneItems) => {
  if(tabItems.length > 0 && paneItems.length > 0) {
    tabItems.forEach(tab => {
      tab.addEventListener('click', () => {
    
        tabItems.forEach(tab => tab.classList.remove('is-active'))
    
        tab.classList.add('is-active')
    
        const tabId = tab.attributes.id.value
    
        let paneActive = null
    
        paneItems.forEach(pane => {
          pane.style.display = 'none'
          if(pane.attributes.id.value == tabId) paneActive = pane
        })
        
        paneActive.style.display = 'block'
      })
    })
  }
}

/**
 * Account active checkbox
 */
const accountActiveInputs = document.querySelectorAll('.account-active-input')

const disableAccountActiveInputClick = (accountActiveInputs) => {
  if(accountActiveInputs) {
    accountActiveInputs.forEach(input => {
      input.addEventListener('click', (e) => {
        e.preventDefault();
      })
    })
  }
}


/**
 * Flash message
 */
const notification = document.querySelector('.notification')

const handleNotification = (notification) => {
  if(notification) {
    document.addEventListener('DOMContentLoaded', () => {
      (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
        const $notification = $delete.parentNode;
    
        $delete.addEventListener('click', () => {
          $notification.parentNode.removeChild($notification);
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
 * Account modal
 */
const accountAddBtns = document.querySelectorAll('.add-account-btn')
const accountAddFormModal = document.querySelector('#account-add-form-modal')
const accountAddFormModalClose = document.querySelector('#account-add-form-modal .modal-close')
const accountUsernameInput = document.querySelector('#account-add-form input[name="username"]')


const handleModal = (accountAddBtns, accountAddFormModal, accountAddFormModalClose, accountUsernameInput) => {

  if(
    accountAddBtns &&
    accountAddFormModal &&
    accountAddFormModalClose &&
    accountUsernameInput
  ) {
    accountAddBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const accountId = btn.parentNode.parentNode.children[0].innerHTML
        accountUsernameInput.value = accountId
        accountAddFormModal.classList.add('is-active')
      })
    })
    
    accountAddFormModalClose.addEventListener('click', () => {
      accountAddFormModal.classList.remove('is-active')
    })
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


handleTab(tabItems, paneItems)
handleMobileNavbar(navbarToggleBtn, navbarMenu)
handleNotification(notification)
handleModal(accountAddBtns, accountAddFormModal, accountAddFormModalClose, accountUsernameInput)
handleCheckClassSize(classSize, classSizeMax, assignStudentInputs)
disableAccountActiveInputClick(accountActiveInputs)
