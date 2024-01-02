const { User } =require ('../models');
const {signToken} = require ('../utils/auth');
const {AuthenticationError} =require('apollo-server-express')



const resolvers = {
    Query: {
        async getSingleUser(_,{id}){
            return await User.findById(id).populate('savedBooks')
        }
        },
    
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
 
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email})
            if(!user) {
                throw  new AuthenticationError('Invalid Credential');
            }
            const correctPw = await user.isCorrectPassword(password)
            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const token = signToken(user);
            return {token, user};
        },
// save book mutation
        saveBook:async (_, { userId, bookData }) => {
            return await User.findOneAndUpdate(
              { _id: userId },
              { $addToSet: { savedBooks: bookData } },
              { new: true, runValidators: true }
            );
          },
      
        removeBook: async (_, {userId, bookId} ) => {
            return await User.findByIdAndUpdate(
                {_id:userId},
                {$pull:{savedBooks:{bookId}}},
                {new:true}
            );
        }
    },
};
    module.exports = resolvers;

        
        //     if (context.user) {
        //         const updatedUser = await User.findByIdAndUpdate(
        //             {_id:context.user._id},
        //             {$pull: {savedBooks:{bookId}}},
        //             {new:true}
        //         );
        //         return updatedUser;
        //     }
        //     throw new AuthenticationError('You need to be logged in!');
        //     },
        // },
        // };




