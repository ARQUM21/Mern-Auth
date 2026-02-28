import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  try {
    
    // pick token form cookie
    const { token } = req.cookies
    
    if (!token) {
      return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!tokenDecode.userId) {

      return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }
    
    // Attach userId with token
    req.userId = tokenDecode.userId;
    
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
