import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Item, ItemsService } from '../../services/items.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-items-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './items-edit.component.html',
  styleUrls: ['./items-edit.component.scss']
})
export class ItemsEditComponent implements OnInit {
  @Input() item: Item | null = null;
  @Output() itemUpdated = new EventEmitter<Item>();
  @Output() closeModal = new EventEmitter<void>();

  selectedFile: File | null = null;
  originalItem: Item | null = null; // Armazena o item original

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    if (this.item) {
      this.originalItem = { ...this.item }; // Clona o item original
    }
  }

  get safeItem(): Item {
    return this.item || { id: '', title: '', description: '', category: '', price: 0, displayPicture: '' };
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateItem() {
    if (this.item && this.originalItem) {
      const formData = new FormData();
      let hasChanges = false;

      if (this.safeItem.title !== this.originalItem.title) {
        formData.append('title', this.safeItem.title);
        hasChanges = true;
      }
      if (this.safeItem.description !== this.originalItem.description) {
        formData.append('description', this.safeItem.description);
        hasChanges = true;
      }
      if (this.safeItem.category !== this.originalItem.category) {
        formData.append('category', this.safeItem.category);
        hasChanges = true;
      }
      if (this.safeItem.price !== this.originalItem.price) {
        formData.append('price', this.safeItem.price.toString());
        hasChanges = true;
      }


      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
        hasChanges = true;
      }

      if (hasChanges) {
        this.itemsService.update(this.item.id, formData).subscribe({
          next: (updatedItem: Item) => {
            this.itemUpdated.emit(updatedItem);
            this.closeModal.emit();
          },
          error: () => {
            console.error('Erro ao atualizar item');
          }
        });
      } else {
        console.log('Nenhuma alteração detectada.');
        this.closeModal.emit();
      }
    }
  }

  cancel() {
    this.closeModal.emit();
  }
}
