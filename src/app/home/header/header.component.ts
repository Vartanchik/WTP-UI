import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private fragment: string;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription.add(
      this.route.fragment.subscribe(fragment => {
        this.fragment = fragment;
      }));
    this.subscription.add(
      this.router.events.subscribe(s => {
        if (s instanceof NavigationEnd) {
          const tree = this.router.parseUrl(this.router.url);
          if (tree.fragment) {
            const element = document.querySelector('#' + tree.fragment);
            if (element) {
              element.scrollIntoView({behavior: "smooth"});
            }
          }
        }
      }));
  }

  onAnchorCLick() {
    this.subscription.add(
      this.route.fragment.subscribe(f => {
        const element = document.querySelector('#' + this.fragment);
        if (element) {
          element.scrollIntoView({behavior: "smooth"});
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
