const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findOneAndDelete(req.params.id);

    req.flash('success', `${user.name} has been deleted successfully`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
