import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../../shared/common.service';
import { Post } from '../post';
  
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
   
  public id: Number;
  public closeResult: string;
  modal: any;
  post: any;
  form: FormGroup;
  posts : any = [];
  changedData: any = {};
  
  constructor(public postService: PostService, private modalService: NgbModal, private router: Router
    ) { 
      this.form = new FormGroup({
        id: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.required]),
        body: new FormControl('', Validators.required)
      });
    }
  
  ngOnInit(): void {
    this.posts = this.postService.getAll();
  }

  public open(content, event) {
    // For Edit case
    if(event){
      this.id = event;
      this.post = this.postService.find(this.id)
        this.form.setValue({id : this.post.id, title: this.post.title, body: this.post.body});
    }else{
      // For Add case
      this.id = 0;
      this.form.reset();
    }
    this.openModal(content);
  }

  // Open Modal
  private openModal(content){
    this.modal = content;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // Close Modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Compact form controls use
  get f(){
    return this.form.controls;
  }
  
  //Delete any Post
  public deletePost(id){
    this.posts = this.postService.delete(id);
  }

  public submit(event){
    // If Form is invalid
    if(this.form.invalid){
      alert('Please fill full information')
      return;
    }
    // In case of Edit
    if(this.id){
      this.posts = this.postService.update(this.id, this.changedData);
      this.modalService.dismissAll(ModalDismissReasons.BACKDROP_CLICK);
    }else{
      // In case of Create
      let posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.push(this.form.value);
      this.posts = this.postService.create(posts);
      this.modalService.dismissAll(ModalDismissReasons.BACKDROP_CLICK);
    }
  }

  // On Value Change(In case of Edit)
  public onChange(field, data){
    if(this.id){
      this.changedData[field] = data;
    }

  }
  
}