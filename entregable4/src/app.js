import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import { productManager } from './product.manager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/', viewsRouter);

const httpServer = app.listen(8080, () => console.log('Server started on port 8080'));

socketServer.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('createProduct', async (product) => {
    const newProduct = await productManager.addProduct(product);
    socket.emit('productCreated', newProduct);
  });
});
