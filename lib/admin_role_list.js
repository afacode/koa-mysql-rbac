const admin_auth_list = require('./admin_auth_list')


let admin_auth_ids_list = []

admin_auth_list.map(item => {
  if (item.auth_type === '2') {
    admin_auth_ids_list.push(item.auth_id)
  }
})

module.exports = [
  {
    role_id: '1000000',
    role_name: 'super admin',
    role_description: 'super admin description',
    auth_ids: admin_auth_ids_list.join(',')
  }
]

