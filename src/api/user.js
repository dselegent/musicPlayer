/*
密码登录
示例:https://dselegentmusic.cf/login/cellphone?phone=xxx&md5_password=yyy
*/
export const reqPasswordLogin = data => service.post('login/cellphone', data)
