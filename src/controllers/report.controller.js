

const getReportDashboard = async (req, res) => {
  res.render('report/home', {
    documentTitle: 'Báo cáo thống kê',
  })
}

const getReportClassroomSubject = async (req, res) => {
  res.render('report/classroom-subject', {
    documentTitle: 'Báo cáo thống kê',
  })
}

const getReportSubject = async (req, res) => {
  res.render('report/subject', {
    documentTitle: 'Báo cáo thống kê',
  })
}

const getReportSemeter = async (req, res) => {
  res.render('report/semester', {
    documentTitle: 'Báo cáo thống kê',
  })
}

module.exports = {
  getReportDashboard,
  getReportClassroomSubject,
  getReportSubject,
  getReportSemeter
}

