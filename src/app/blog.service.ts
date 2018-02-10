import { Injectable } from '@angular/core';
import { port } from '_debugger';

@Injectable()
export class BlogService {
  private posts: Post[]= []; //memory cache of all blog posts
  private currentId: number = 0 //

  constructor() {
    this.fetchPosts();
    let dummyPost = this.newPost();
    dummyPost.title="updated title";
    this.updatePost(dummyPost);
    console.log(this.getPost(dummyPost.postid));
    this.deletePost(dummyPost.postid);
    // console.log(this.getPost(dummyPost.postid));
    
  }

  fetchPosts(): void {
    /* DONE:
      This method "populates" the posts property by retrieving 
      all all blog posts from localStorage. This function must be 
      called inside the constructor so that all posts are retrieved 
      and be ready in memory when BlogService is created. 
    */
    console.log(localStorage.length);
    for(var i =0; i < localStorage.length; i++){
      let currentPost = JSON.parse(localStorage.getItem(localStorage.key(i)));
      console.log("fetch posts current post: ", currentPost);
      this.posts.push(currentPost);
    }

    console.log("this.posts after Fetch Post: ", this.posts);
  }

  getPosts(): Post[] {
    /* DONE: This method simply returns posts */
    console.log(this.posts);
    return this.posts;
  }

  getPost(id: number): Post{
    /* DONE: Find the post with postid=id from posts and return it */
    let retrievedPost: Post = JSON.parse(localStorage.getItem(id.toString()));
    console.log("Got Post ID: ", retrievedPost.postid);

    // returns null if post is not found
    return retrievedPost; 
  }

  newPost(): Post {
    /* DONE
    Create a new post with a new postid, an empty title
    and body, and current creation and modification times,
    save it to localStorage, add it to posts, and return it.
    The postid of a new post should start at 1 and increase
    linearly.
    */
    let currentDate = new Date();
    let newPost:Post = new Post;

    // create new post
    newPost.postid = this.currentId + 1;
    newPost.created = currentDate;
    newPost.modified = currentDate;
    newPost.title='default title';
    newPost.body='default body';

    // save to localStorage
    localStorage.setItem(newPost.postid.toString(), JSON.stringify(newPost));
    
    // Add to posts
    this.posts.push(newPost);
    
    // update id
    this.currentId += 1; 

    console.log("Just created new post: ", newPost, " current id is now:  ", this.currentId);
    console.log("Posts: ", this.posts);
    return newPost; 
  }

  updatePost(post: Post): void {
    /* DONE
    From posts, find a post whose postid is the same as 
    post.postid, update its title and body with the passed-in
    values, change its modification time to now, and update
    the post in localStorage. If no such post exists, do nothing.
    */
    let currentTime = new Date();
    let retrievedPost = JSON.parse(localStorage.getItem(post.postid.toString()));
    retrievedPost.title = post.title;
    retrievedPost.body = post.body;
    retrievedPost.modified = currentTime;
    
    // update post in localStorage
    localStorage.setItem(retrievedPost.postid.toString(), JSON.stringify(retrievedPost));

  }

  deletePost(postid: number): void {
    /* DONE
    From posts, find a post whose postid is the same as
    post.postid, delete it from posts, and delete a 
    corresponding post from localStorage. If no such post
    exists, do nothing.
    */

    let retrievedPost = JSON.parse(localStorage.getItem(postid.toString()));
    let postidToString = postid.toString();
    if(retrievedPost){
      // delete post from localStorage
      localStorage.removeItem(localStorage.postidToString);
    }

    this.posts.splice(this.currentId-1, 1);
    console.log("Deleted Post: ", retrievedPost.postid);
    console.log("Posts after delete: ", this.getPosts());
  }

}

export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}
