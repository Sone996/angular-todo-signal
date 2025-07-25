import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { HomeService } from '@app/data/home';

@Component({
  selector: 'app-variant-detail',
  standalone: true,
  imports: [MatDividerModule, MatCheckboxModule, FormsModule],
  templateUrl: './variant-detail.component.html',
  styleUrl: './variant-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantDetailComponent {
  readonly variantService = inject(HomeService);

  readonly selectedItem = this.variantService.singleItem;

  readonly pathogenicityList = computed(() => [
    'Benign',
    'Likely Benign',
    'Uncertain Significance',
    'Likely Pathogenic',
    'Pathogenic',
  ]);

  onCheckedChange(pathogenicity: string): void {
    this.variantService.updateItem(this.selectedItem()!.id, pathogenicity);
  }
}
