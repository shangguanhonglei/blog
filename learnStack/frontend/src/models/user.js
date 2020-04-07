import Model from './model'
export class User extends Model {
  static getList(){
    return this.Get('user')
  }
  static addUser(data){
    return this.Post('user',data)
  }
}
export default User