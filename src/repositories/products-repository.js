const { Op } = require('sequelize');
const { Products, Categories, Inventory } = require('../database/models');

const all = async () => {
  const list = await Products.findAll();
  return list;
};

const byCompany = async (company) => {
  const list = await Products.findAll({ where: { company } });
  return list;
};

const one = async (id) => {
  const item = await Products.findOne({ where: { id }, include: [Categories] });
  return item;
};

const findByTextAndCompany = async (company, text) => {
  const list = await Products.findAll({
    where: {
      company,
      [Op.or]: [
        { title: { [Op.like]: `%${text}%` } },
        { description: { [Op.like]: `%${text}%` } },
        { sku: { [Op.like]: `%${text}%` } },
        { vendor: { [Op.like]: `%${text}%` } },
      ],
    },
    raw: true,
  });

  const productsIds = list.map(item => item.id);
  const inventories = await Inventory.findAll({
    where: {
      company,
      product: {
        [Op.in]: productsIds,
      },
    },
    raw: true,
  });

  const clonedList = list.map((product) => {
    const inventory = inventories.find(inv => inv.product === product.id);
    const stock = inventory ? inventory.stock : 0;
    const newProduct = Object.assign({}, product, { stock });
    return newProduct;
  });

  return clonedList;
};

const store = async (product) => {
  const item = await Products.create({
    title: product.title,
    description: product.description,
    vendor: product.vendor,
    height: parseFloat(product.height),
    width: parseFloat(product.width),
    weigth: parseFloat(product.weigth),
    price: parseFloat(product.price),
    sku: product.sku,
    status: true,
    categoriesId: product.categoriesId,
    company: product.company,
  });
  return item;
};

const update = async (id, product) => {
  let item = await Products.update({
    title: product.title,
    description: product.description,
    vendor: product.vendor,
    height: parseFloat(product.height),
    width: parseFloat(product.width),
    weigth: parseFloat(product.weigth),
    price: parseFloat(product.price),
    sku: product.sku,
    status: product.status,
    categoriesId: product.categoriesId,
    company: product.company,
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
  byCompany,
  findByTextAndCompany,
  one,
  store,
  update,
  destroy,
};
