const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ mconst adminOnly = (req, res, next) => {
  if (
    req.user &&
    req.user.role === 'admin'
  ) {
    return next();
  }

  return res.status(403).json({
    message: 'Access denied: Admin only'
  });
};

export default adminOnly;essage: 'Access denied:  Admin only' });
  }
};

export default adminOnly;
