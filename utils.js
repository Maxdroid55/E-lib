function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function asyncWrapper(func) {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
}

module.exports = { capitalizeFirstLetter, asyncWrapper };
