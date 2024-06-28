const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories// be sure to include its associated Products
  Category.findAll({
    include: [Product]
  })
  .then(categories => {
    res.json(categories)
  })
  .catch(err => {
    res.json(err)
  });
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if(!categoryData) {
      res.status(404).json({
        message: "No category found."
      })
      return;
    }
  } catch (err) {
    res.json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
