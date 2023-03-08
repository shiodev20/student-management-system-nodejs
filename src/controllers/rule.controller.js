

const getRuleDashboard = async (req, res) => {
  res.render('rule/home', {
    documentTitle: 'Quản lý quy định',
  })
}

const getRuleUpdate = async (req, res) => {
  res.render('rule/update', {
    documentTitle: 'Cập nhật quy định',
  })
}

const putRuleUpdate = async (req, res) => {
}

module.exports = {
  getRuleDashboard,
  getRuleUpdate,
  putRuleUpdate,
}

