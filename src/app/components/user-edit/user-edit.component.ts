import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/User';
import axios from 'axios';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: IUser = {
    id: 0,
    name: '',
    position: '',
    about:'',
    image:'',
    fb:'',
    ins:'',
    gmail:'',
    firstname:'',
    lastname:''
  }
  id!: number;
  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id']
    this.userService.getUserId(this.id).subscribe((responsive) => {
      this.user = responsive;
      // console.log(this.user);
    })
  }

    async uploadImg(event: any) {
    const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/assignment22/image/upload";
    const CLOUDINARY_PRESET = "img-angular";
    const file = event.target.files[0];
    
    const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", CLOUDINARY_PRESET);

          const response = await axios.post(CLOUDINARY_API, formData, {
              headers: {
                  "Content-Type": "application/form-data",
              },
          });
    this.user.image = response.data.url;
  }

  onEdit(){
    this.userService.edit(this.user).subscribe(() =>{
    })
    if(this.user){
      alert('bạn đã cập nhật thành công')
      this.router.navigate([this.user])
      console.log(this.user.image );
      
    }
  }
}


