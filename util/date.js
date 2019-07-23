const moment = require('moment')


class Date {
  static getTodayStart() {
    return new Date().setHours(0, 0, 0, 0)
  }

}

module.exports = Date
