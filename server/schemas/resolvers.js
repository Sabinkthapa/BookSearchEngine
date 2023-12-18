const { User } =require ('../models/User');
const {signToken, AuthenticationError} = require ('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
           if (context.user) {
            const userData = await User.findOne({_id: context.user._id}).select('-__v -password');
            return userData;
           }
           throw AuthenticationError;
        },
    },


    mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email})
            if(!user) {
                throw  AuthenticationError;
            }
            const correctPw = await user.iscorrectPassword(password)
            if(!correctPw) {
                throw  AuthenticationError('Incorrect credentials')
            }
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent,{newBook},context)=>{
            if (context.user){
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {savedBooks:newBook}},
                    {new:true}
                );
                return updatedUser;
                
            }
            throw AuthenticationError;
        },

        removeBook: async (parent, {bookId}, context)=>{
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id:context.user._id},
                    {$pull: {savedBooks:{bookId}}},
                    {new:true}
                );
                return updatedUser;
            }
            throw AuthenticationError;
            },
        },
        };

module.exports = resolvers;


