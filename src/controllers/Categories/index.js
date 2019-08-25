const boom = require('boom');
const categoriesRepository = require('../../repositories/categories-repository');

class CategoriesController {
  constructor(router) {
    this.router = router;
    this.router.get('/categories', this.getAllCategories);
    this.router.get('/categoriesByCompany', this.getCategoriesByCompany);
    this.router.get('/categories/:id', this.getOneCategories);
    this.router.post('/categories', this.storeCategories);
    this.router.put('/categories/:id', this.updateCategories);
    this.router.delete('/categories/:id', this.destroyCategories);
  }

  async getAllCategories(req, res, next) {
    try {
      const list = await categoriesRepository.all();
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getCategoriesByCompany(req, res, next) {
    try {
      const { company } = req.query;
      const list = await categoriesRepository.byCompany(company);
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getOneCategories(req, res, next) {
    try {
      const { id } = req.params;
      const item = await categoriesRepository.one(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async storeCategories(req, res, next) {
    try {
      const { body } = req;
      const item = await categoriesRepository.store(body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateCategories(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      const item = await categoriesRepository.update(id, body);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async destroyCategories(req, res, next) {
    try {
      const { id } = req.params;
      const item = await categoriesRepository.destroy(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }
}
module.exports = CategoriesController;
