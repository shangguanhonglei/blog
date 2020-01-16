import Model from './model'
export class Login extends Model {
  /**
   * 登录
   * @param {*} data 
   */
  static login(data){
    return this.Post('login',data)
  }
}
export default Login