import User from "../models/user.model";
import md5 from "md5";
import { generateRandomString} from "../helpers/generate.helper"

export const resolversUser = {
  Mutation: {
    register: async (_, args) => {
      const { user } = args;

      const exitstUser = await User.findOne({
        email: user.email,
        deleted: false
      });
      
      if(exitstUser){
        return {
          code: 400,
          message: "Email da ton tai"
        }
      }
    
      const userData = {
        fullName: user.fullName,
        email: user.email,
        password: md5(user.password),
        tokenUser: generateRandomString(30)
      };
    
      const newUser = new User(userData);
      await newUser.save();

      return {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        token: newUser.token,
        code: 200,
        message: "Đăng ký thành công!"
      };      
    }
  }
}