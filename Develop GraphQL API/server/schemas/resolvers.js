const { User } = require ('../models');
const { AuthenticationError } = require ("apollo-server-express")
const { signToken }= require ('../utils/auth');

const resolvers = {
    Query: {
        me: async (args, context) => {
            if (context.user) {
                const userData = await User
                    .findOne({ _id: context.user._id })
                    .select ("-__v -password")
                    .populate("books");
                return userData;
            };
            throw new AuthenticationError("You must be logged in!");
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw AuthenticationError;
            };

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: { savedBooks: bookData }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                )
                .populate("books");
                return updatedUser;
            }
            throw AuthenticationError;
        },
        removeBook: async (parent, { bookId }, context) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks:{ bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw AuthenticationError;
        }
    },
};

module.exports = resolvers;