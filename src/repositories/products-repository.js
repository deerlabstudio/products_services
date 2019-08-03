const { Products, Categories } = require('../database/models');

const all = async () => {
  const list = await Products.findAll();
  return list;
};

const one = async (id) => {
  const item = await Products.findOne({ where: { id }, include: [Categories] });
  return item;
};

const store = async (product) => {
  const item = await Products.create({
    title: product.title,
    description: product.description,
    vendor: product.vendor,
    height: product.height,
    width: product.width,
    weigth: product.weigth,
    price: product.price,
    sku: product.sku,
    status: true,
    categoriesId: product.categoriesId,
  });
  return item;
};

const update = async (id, product) => {
  let item = await Products.update({
    title: product.title,
    description: product.description,
    vendor: product.vendor,
    height: product.height,
    width: product.width,
    weigth: product.weigth,
    price: product.price,
    sku: product.sku,
    status: product.status,
    categoriesId: product.categoriesId,
  }, { where: { id } });

  if (item[0] === 1) {
    item = await Products.findOne({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

const destroy = async (id) => {
  let item = await Products.findOne({ where: { id } });
  if (item) {
    await Products.destroy({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

module.exports = {
  all,
  one,
  store,
  update,
  destroy,
};
