const boom = require('boom');
const productsRepository = require('../../repositories/products-repository');

class ProductsController {
  constructor(router) {
    this.router = router;
    this.router.get('/products', this.getAllProducts);
    this.router.get('/products/:id', this.getOneProducts);
    this.router.post('/products', this.storeProducts);
    this.router.put('/products/:id', this.updateProducts);
    this.router.delete('/products/:id', this.destroyProducts);
  }

  async getAllProducts(req, res, next) {
    try {
      const list = await productsRepository.all();
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getOneProducts(req, res, next) {
    try {
      const { id } = req.params;
      const item = await productsRepository.one(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async storeProducts(req, res, next) {
    try {
      const { body } = req;
      const item = await productsRepository.store(body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateProducts(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      const item = await productsRepository.update(id, body);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async destroyProducts(req, res, next) {
    try {
      const { id } = req.params;
      const item = await productsRepository.destroy(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ProductsController;
