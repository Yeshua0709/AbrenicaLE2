import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute module

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent{

  posts?: Post[] = [];
  username: string = "";
  constructor (private http: HttpClient, private route: ActivatedRoute){ // Inject ActivatedRoute in the constructor
    this.initData();
}

  initData():void {
    this.http.get<Post[]>('https://localhost:7027/api/post')
    .subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        console.log(this.posts);
       
      // this.username = this.posts[0].firstName + " " + this.posts[0].lastName
      }
    })

    // Get the query parameter from the URL
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }
  }

  

  

