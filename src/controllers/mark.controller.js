
function markController() {

  const getMarkAdd = async (req, res) => {
      res.render('mark/add', { 
        documentTitle: 'Nhập điểm',
      })
  }
  
  const postMarkAdd = async (req, res) => {
  }

  return {
    getMarkAdd,
    postMarkAdd,
  }
}

module.exports = markController
