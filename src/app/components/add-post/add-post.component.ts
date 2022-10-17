import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategories } from 'src/app/models/Categories';
import { IPost } from 'src/app/models/Posts';
import { CategoryPostService } from 'src/app/services/category-post.service';
import { PostService } from 'src/app/services/post.service';
import axios from 'axios';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  categorys!: ICategories[];
  date = new Date().toLocaleDateString("vi-VI");
  post: IPost = {
    title: '',
    createAt: this.date,
    image:'',
    categoryPostId: 0,
    short_desc: '',
    description: ''
  };
  constructor(
    private activateRoute: ActivatedRoute,
    private postService: PostService,
    private categoryPostService: CategoryPostService,
    private routes: Router,
) { }

  ngOnInit(): void {
    const id = +this.activateRoute.snapshot.paramMap.get('id')!;
    if (id) {
      this.postService.getPost(id).subscribe(data => {
        this.post = data
      })
    }
    this.onGetAllCategoryPost();
  }
  onGetAllCategoryPost() {
    this.categoryPostService.getAllCategoryPost().subscribe((data) => {
      this.categorys = data;
    })
  }
   async uploadImg(event: any) {
    const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/bee-design/image/upload";
    const CLOUDINARY_PRESET = "doplxl6v";
    const file = event.target.files[0];
    // console.log(event.target.files);
    
    const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", CLOUDINARY_PRESET);

          const response = await axios.post(CLOUDINARY_API, formData, {
              headers: {
                  "Content-Type": "application/form-data",
              },
          });
    this.post.image = response.data.url;
    
  }
  onSubmitPost() {
    const id = +this.activateRoute.snapshot.paramMap.get('id')!;
    if (id) {
      this.postService.updatePost(this.post).subscribe(() => {
        setTimeout(() => {
          this.routes.navigate(['admin/post']);
        }, 1000)
      })
    }
    this.postService.addPost(this.post).subscribe(() => {
      setTimeout(() => {
        this.routes.navigate(['admin/post']);
      }, 1000)
    });

  }
}