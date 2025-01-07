import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet]
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
