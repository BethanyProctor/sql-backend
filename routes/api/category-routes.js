const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
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
    res.status(200).json(categoryData)

  } catch (err) {
    res.json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.json(categoryData)
  } catch (err) {
    res.json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    //make sure there is actually something to update
    if(!categoryData) {
      res.json({message: "No category found!"});
      return;
    }
    res.json(categoryData)

  } catch (err) {
    res.json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy ({
      where: {
        id: req.params.id
      }
    })
    //make sure there is actually something to delete
    if(!categoryData) {
      res.json({message: "No category found!"});
      return;
    }
    res.json("Category deleted!")
    
  } catch (err) {
    res.json(err)
  }
});

module.exports = router;
