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
 *  
 */
const firstReportYearSelect = document.querySelector('#report-classroom-subject-score select#year')
const firstReportClassroomSelect = document.querySelector('#report-classroom-subject-score select#classroom')
const firstReportClassroomOptions = document.querySelectorAll('#report-classroom-subject-score select#classroom option')


const handleFirstReport = (yearSelect, classroomSelect, classroomOptions) => {
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

handleNotification(notification)
handleCheckClassSize(classSize, classSizeMax, assignStudentInputs)
handleFirstReport(firstReportYearSelect, firstReportClassroomSelect, firstReportClassroomOptions)
