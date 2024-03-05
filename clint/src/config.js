const isProd = process.env.NODE_ENV === 'production'

const config = {
  isProd,
  serverUrlPrefix: isProd ? 'https://wd10.cloud-workshop.online' : 'http://localhost:1337'
}

export default config;