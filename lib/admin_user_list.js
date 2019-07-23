const md5 = require('md5')

module.exports = [
  {
    username: 'admin',
    password: md5(123456),
    phone: '110110',
    email: 'admin@admin.com',
    description: 'admin super',
    role_ids: '1000000'
  }, 
  {
    username: 'test',
    password: '81dc9bdb52d04dc20036dbd8313ed055', //1234
    phone: '110110',
    email: 'test@admin.com',
    description: 'test',
    role_ids: '1'
  }
]