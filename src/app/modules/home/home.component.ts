import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent, VariantDetailComponent, VariantsListComponent } from './components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, VariantsListComponent, VariantDetailComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
