const app = require('express')();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const {cartRouter} = require('./routes');
const {productsRouter} = require('./routes');
const {indexRouter} = require('./routes');
const { PORT = 3001 } = process.env;

const { usersRouter } = require('./routes');
server.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Total-Count");
  res.header('Access-Control-Allow-Credentials', 'true')
  next();
});

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);

