import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatIconModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'artisan';
}