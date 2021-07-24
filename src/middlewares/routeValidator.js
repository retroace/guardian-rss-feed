/**
 * Checks for valid param from url. Hyphens and lowercase allowed
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const validUrlType = async (req, res, next) => {
  const { subject } = req.params;

  let regexp = /^[a-z0-9-]+$/;
  if (subject.search(regexp) === -1) {
    return res.status(400).json({
      message: 'Url should contain only lowercase and hyphens characters',
    });
  }
  return next();
};

module.exports = validUrlType;
