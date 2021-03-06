import { Injectable } from '@angular/core';

@Injectable()
export class BlogService {
  private posts: Post[]= []; //memory cache of all blog posts

  constructor() {
    this.fetchPosts();
  }

  fetchPosts(): void {
    /* DONE:
      This method "populates" the posts property by retrieving 
      all all blog posts from localStorage. This function must be 
      called inside the constructor so that all posts are retrieved 
      and be ready in memory when BlogService is created. 
    */
    for(var i =0; i < localStorage.length; i++){
      let currentPost = JSON.parse(localStorage.getItem(localStorage.key(i)));
      // console.log("fetch posts current post from local storage: ", currentPost);
      this.posts.push(currentPost);
    }

    // console.log("this.posts after Fetch Post: ", this.posts);
  }

  getPosts(): Post[] {
    /* DONE: This method simply returns posts */
    return this.posts;
  }

  getPost(id: number): Post{
    /* DONE: Find the post with postid=id from posts and return it */
    let retrievedPost: Post = JSON.parse(localStorage.getItem(id.toString()));

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

    // Find existing max postid
    let maxID = Math.max.apply(Math,this.posts.map(function(item){return item.postid;}));

    // For Clear Storage case 
    if (maxID < 0) {
      maxID = 0;
    }
    console.log("maxid", maxID);

    // create new post

    newPost.postid = maxID + 1;
    newPost.created = currentDate;
    newPost.modified = currentDate;
    newPost.title='default title';
    newPost.body='default body';

    // save to localStorage
    console.log("saving to local storage: ", newPost.postid.toString());
    localStorage.setItem(newPost.postid.toString(), JSON.stringify(newPost));
    
    // Add to posts
    console.log("push post: ", this.posts.push(newPost));

    console.log("Just created new post: ", newPost, " current id is now:  ", maxID + 1);
    // console.log("Posts: ", this.getPosts());
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

    // update post in local array
    let localPost = this.posts.find(x => x.postid === post.postid);
    localPost.title = post.title;
    localPost.body = post.body;
    localPost.modified = post.modified;
  }

  deletePost(postid: number): void {
    /* DONE
    From posts, find a post whose postid is the same as
    post.postid, delete it from posts, and delete a 
    corresponding post from localStorage. If no such post
    exists, do nothing.
    */

    let retrievedPost = JSON.parse(localStorage.getItem(postid.toString()));
    if(retrievedPost){
      // delete post from localStorage
      localStorage.removeItem(postid.toString());
      
      // delete from local array
      // get index of object with id:postid
      let removeIndex = this.posts.map(function(item) { return (item.postid).toString(); }).indexOf(postid.toString());
      this.posts.splice(removeIndex, 1);
    }

    
    console.log("Deleted Post: ", retrievedPost.postid);
  }

}

export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}
