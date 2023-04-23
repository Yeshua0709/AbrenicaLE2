import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {

  private routeSub: Subscription = new Subscription ();
  private id :number = 0;
  username:string = "";

  // Declare 'password' variable
  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) {}

  ngOnInit(): void{
    this.routeSub = this.route.params.subscribe( params =>{
      this.id = params['id'];
      this.initData();
     
    
    })
  }

  initData(): void{
    this.http.get<Post>("https://localhost:7027/api/post/"+this.id ).subscribe({
      next: (data:Post) => {
        this.post = data;
        
        
      }
    })

      // Get the query parameter from the URL
      this.route.queryParams.subscribe(params => {
        this.username = params['username'];
      });
  }
}