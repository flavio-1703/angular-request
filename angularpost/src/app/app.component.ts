import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from './post';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularpost';
  closeResult: string = '';

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  posts: any;

  readonly url = "https://jsonplaceholder.typicode.com";

  userId: string = '1';
  id: number = 1;

  setUerId(userId: string) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }

  getPosts() {
    let params = new HttpParams().set('userId', this.userId);
    this.posts = this.http.get(this.url + '/posts', { params } );
  }

  open(content: any) { 
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
