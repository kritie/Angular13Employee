import { Component, OnInit } from '@angular/core';
// import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides: any = [];

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.fetchCarousalData().subscribe((res) => {
      this.slides = res.images;
    })
  }
}
