import { Component, OnInit, Input } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material';
// import { ApiService } from 'src/app/services/api.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {
  @Input() postagem: any;
  form: FormGroup;
  public config: SwiperOptions = {
    slidesPerView: 1, // Slides Visible in Single View Default is 1
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true,
    autoHeight: true,
  };
  constructor(private formBuilder: FormBuilder, public api: ApiService, public snack: MatSnackBar, public ngxBar: LoadingBarService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      com_text: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    })
  }
  salvarComentario() {
    this.ngxBar.start()
    if (this.form.valid) {
      var obj = { user_id: this.api.usuario._id, post_id: this.postagem._id, com_text: this.form.get('com_text').value }
      this.api.postData('comments', obj).subscribe(res => {
        this.ngxBar.complete()
        this.api.getPostagens()
      }, err => {

        this.ngxBar.complete()
      })
    } else {
      this.ngxBar.complete()
    }
  }



}
