import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { HomeService, Variant } from '@app/data/home';
import { MatListModule } from '@angular/material/list';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-variants-list',
  standalone: true,
  imports: [MatListModule, ReactiveFormsModule],
  templateUrl: './variants-list.component.html',
  styleUrl: './variants-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsListComponent implements OnInit {
  readonly variantsService = inject(HomeService);

  readonly search = new FormControl('');
  readonly filteredItems = signal<Variant[]>([]);

  readonly variantsList = this.variantsService.itemsList;

  ngOnInit(): void {
    this.variantsService.getList();
  }

  constructor() {
    effect(
      () => {
        this.filteredItems.set(
          this.variantsList().filter(({ name }) =>
            name.toLocaleLowerCase().startsWith(this.search.value?.toLocaleLowerCase() ?? '')
          )
        );
      },
      { allowSignalWrites: true }
    );

    this.search.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((searchTerm) =>
        this.filteredItems.set(
          this.variantsList().filter(({ name }) =>
            name.toLocaleLowerCase().startsWith(searchTerm?.toLocaleLowerCase() ?? '')
          )
        )
      );
  }

  setItem(id: string) {
    this.variantsService.getItem(id);
  }
}
