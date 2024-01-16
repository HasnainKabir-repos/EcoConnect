const Post = require('../models/post');
const Community = require('../models/community');
const path = require('path');

// Controller for creating a new post
const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const author = req.user._id;
        const communityId = req.params.communityId;
        
        const PostImagePath = req.file ? req.file.path : undefined;

        const newPost = new Post({
            content,
            postImage: PostImagePath ? path.basename(PostImagePath) : undefined,
            author,
        });

        await newPost.save();

        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
        }

        community.posts.push(newPost);
        await community.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating post' });
    }
};

// Controller for getting all posts of a community
const getPosts = async (req, res) => {
    try {
        const communityId = req.params.communityId;

        // Find the community and populate its posts with author, likes, and comments
        const community = await Community.findById(communityId).populate({
            path: 'posts',
            populate: [
                {
                    path: 'author',
                    model: 'user'
                },
                {
                    path: 'likes',
                    model: 'user'
                },
                {
                    path: 'comments.author',
                    model: 'user'
                }
            ]
        }).sort({ date: -1 });

        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
        }

        // Retrieve the posts associated with the community
        const communityPosts = community.posts;

        res.status(200).json({ communityPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching community posts' });
    }
};

const getPostById = async(req, res) => {
    try{
        const id = req.params.postId;

        const post = await Post.findById(id);

        res.status(200).json(post);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error", error});
    }
};

// Controller for inserting a comment to a post
const insertComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { text } = req.body;
        const author = req.user;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const newComment = {
            text,
            author,
        };

        post.comments.push(newComment);
        await post.save();

        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding comment' });
    }
};

// Controller for inserting a like to a post
const insertLike = async (req, res) => {
    try {
        const postId = req.params.postId;
        const author = req.user;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(author._id)) {
            return res.status(400).json({ message: 'User has already liked the post' });
        }

        post.likes.push(author);
        await post.save();

        res.status(201).json({ message: 'Like added successfully', likes: post.likes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding like' });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const user = req.user;

        const communities = await Community.find({ members: { $in: [user._id] } }).populate({
            path: 'posts',
            populate: [
                {
                    path: 'author',
                    model: 'user'
                },
                {
                    path: 'likes',
                    model: 'user'
                },
                {
                    path: 'comments.author',
                    model: 'user'
                }
            ]
        }).sort({ date: -1 }).exec();

        if (!communities || communities.length === 0) {
            return res.status(404).json({ message: 'User is not a member of any community' });
        }

        const allPosts = communities.flatMap(community => community.posts);

        const filteredPosts = allPosts.filter(post => post.author._id.toString() !== user._id.toString());

        res.status(200).json(filteredPosts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching community posts' });
    }
};





module.exports = { createPost, getPosts, insertComment, insertLike ,getAllPosts};
