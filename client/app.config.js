import env from './app.environment'
console.log(env[process.env['MY_ENV']])
export default env[process.env['MY_ENV']]

