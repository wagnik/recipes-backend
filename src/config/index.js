module.exports = {
  DATABASE: process.env.DATABASE || 'mongodb://127.0.0.1:27017/recipes',
  PORT: process.env.PORT || 3001,
  PUBLIC_DIR: '/js/recipes-backend/public/',
}