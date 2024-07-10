const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product
      }]
    })
    res.json(tagData)
  } catch (err) {
    res.json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    })
    //make sure there is data to pull up
    if (!tagData) {
      res.json({message: "Tag not found!"})
      return;
    }
    res.json(tagData)

  } catch (err) {
    res.json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.json(tagData)
  } catch (err) {
    res.json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    //make sure there is something to update
    if (!tagData) {
      res.json({message: "Tag not found!"})
      return;
    }
    res.json(tagData)

  } catch (err) {
    res.json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destory({
      where: {
        id: req.params.id
      }
    })
    if (!tagData) {
      res.json({message: "Tag not found!"})
      return;
    }
    res.json("Category deleted!")

  } catch (err) {
    res.json(err)
  }
});

module.exports = router;
