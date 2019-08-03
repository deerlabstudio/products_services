const { Categories } = require('../database/models');

const all = async () => {
  const list = await Categories.findAll();
  return list;
};

const one = async (id) => {
  const item = await Categories.findOne({ where: { id } });
  return item;
};

const store = async (category) => {
  const item = await Categories.create({
    name: category.name,
    description: category.description,
    status: true,
  });
  return item;
};

const update = async (id, category) => {
  let item = await Categories.update({
    name: category.name,
    description: category.description,
    status: category.status,
  }, { where: { id } });

  if (item[0] === 1) {
    item = await Categories.findOne({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

const destroy = async (id) => {
  let item = await Categories.findOne({ where: { id } });
  if (item) {
    await Categories.destroy({ where: { id } });
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
