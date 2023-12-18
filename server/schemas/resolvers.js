const { Book, User } =require ('../models');
const {signToken, AuthenticationError} = require ('../utils/auth');


const resolvers = {
    Query: {
        async getSingleUser(_,{id}){
            return await User.findById(id).populate('savedBooks');
        },
    },
    Mutation: {
        //add user mutuation
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        //login mutuation
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email})
            if(!user) {
                throw  new AuthenticationError('Invalid Credential');
            }
            const correctPw = await user.iscorrectPassword(password)
            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const token = signToken(user);
            return {token, user};
        },
        //save book mutuation
        saveBook: async (parent,{newBook},context)=>{
            if (context.user){
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {savedBooks:newBook}},
                    {new:true}
                );
                return updatedUser;
                
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        //removebook mutuation
        removeBook: async (parent, {bookId}, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id:context.user._id},
                    {$pull: {savedBooks:{bookId}}},
                    {new:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
            },
        },
        };

module.exports = resolvers;


