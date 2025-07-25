import { computed, Injectable, signal } from '@angular/core';
import { Variant, variants } from '..';
import { delay, map, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  protected readonly _itemsList = signal<Variant[]>([]);
  protected readonly _singleItem = signal<Variant | null>(null);

  readonly itemsList = computed(() => this._itemsList());
  readonly singleItem = computed(() => this._singleItem());

  // bolje je zbog performanse jer ne rekalkulise vrednost
  // get itemsList() {
  //   return this._itemsList.asReadonly();
  // }

  getList() {
    if (this._itemsList().length) {
      return;
    }
    of(variants)
      .pipe(delay(300))
      .subscribe((items) => this._itemsList.set(items));
  }

  getItem(selectedId: string) {
    of(this._itemsList())
      .pipe(
        delay(300),
        map((items) => items.find(({ id }) => id === selectedId)),
        switchMap((item) => (item ? of(item) : throwError(() => new Error('item not found!'))))
      )
      .subscribe((item) => {
        this._singleItem.set(item);
      });
  }

  updateItem(selectedId: string, pathogenicity: string) {
    of(this._itemsList())
      .pipe(
        delay(300),
        map((items) => items.find(({ id }) => id === selectedId)),
        switchMap((item) => (item ? of({ ...item, pathogenicity }) : throwError(() => new Error('item not found!'))))
      )
      .subscribe((changedItem) => {
        const index = this.itemsList().findIndex((item) => item.id === changedItem.id);

        this._itemsList.set([...this.itemsList().slice(0, index), changedItem, ...this.itemsList().slice(index + 1)]);
        this._singleItem.set(changedItem);
      });
  }
}
