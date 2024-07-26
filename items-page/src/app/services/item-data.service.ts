import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Item, ItemsService } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class ItemDataService {
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private itemsService: ItemsService) {
    this.loadItems();
  }

  loadItems() {
    this.itemsService.list().subscribe(items => this.itemsSubject.next(items));
  }

  addItem(formData: FormData) {
    this.itemsService.create(formData).subscribe({
      next: (createdItem: Item) => {
        this.fetchImageForItem(createdItem);
      },
      error: (error) => {
        console.error('Erro ao criar item:', error);
      }
    });
  }

  fetchImageForItem(item: Item) {
    this.itemsService.getItemImageUrl(item.id).subscribe(blob => {
      const url = URL.createObjectURL(blob);


      this.items$.pipe(take(1)).subscribe(currentItems => {
        const updatedItems = currentItems.map(i => i.id === item.id ? { ...i, displayPicture: url } : i);
        this.itemsSubject.next(updatedItems);
      });
    });
  }
}

