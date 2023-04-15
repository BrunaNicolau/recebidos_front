import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recebidos_front';

  constructor(
    private changeDetector: ChangeDetectorRef
  ){}

  ngAfterContentChecked(){
    this.changeDetector.detectChanges();
  }
}
