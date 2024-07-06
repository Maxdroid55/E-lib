module.exports = function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = function asyncWrapper(func) {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
