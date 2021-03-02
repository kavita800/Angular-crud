import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Post } from '../post/post';
   
@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor() { }
   
  // Fetch All Post
  public getAll(): any {
    return JSON.parse(localStorage.getItem('posts')) || [];
  }
   
  // Create Post
  public create(post): Observable<Post> {
    localStorage.setItem('posts', JSON.stringify(post));
    return JSON.parse(localStorage.getItem('posts'));
  }  
   
  // Find Post by Id
  public find(id): Observable<Post> {
    let posts ;
    JSON.parse(localStorage.getItem('posts')).map((data, index) => { 
      if(data.id == id)
       posts = JSON.parse(localStorage.getItem('posts'))[index];
    })
    return posts;
    
  }
   
  // Update Post
  public update(id, post): Observable<Post> {
    let posts = JSON.parse(localStorage.getItem('posts'));
    let newObjectKeys: any;
    posts.map((data, index) => { 
      if(data.id == id){
       // create an array of the keys in the object myMap1
        newObjectKeys = Object.keys(post);

        // loop through the array of object keys
        for (let i = 0; i < newObjectKeys.length; i++) {
          posts[index][newObjectKeys[i]] = post[newObjectKeys[i]];
        }
      }
    })
    localStorage.setItem('posts', JSON.stringify(posts));
    return posts;
  }
   
  // Delete Post
  public delete(id){
    let posts = JSON.parse(localStorage.getItem('posts'));
    posts.map((data, index) => { 
      if(data.id == id)
       posts.splice(index, 1);
    })
    localStorage.setItem('posts', JSON.stringify(posts));
    return posts;
  }

}