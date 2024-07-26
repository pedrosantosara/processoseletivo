import { Component, OnInit } from '@angular/core';
import { Item, ItemsService } from '../../services/items.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ItemsFormComponent } from '../items-form/items-form.component';
import { FormsModule } from '@angular/forms';
import { ItemsEditComponent } from '../items-edit/items-edit.component';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemsFormComponent, ItemsEditComponent],
  providers: [ItemsService],
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  items: Item[] = [];
  imageUrls = new Map<string, string>();
  showModal = false;
  showDeleteConfirmation = false;
  itemIdToDelete: string | null = null;
  showEditModal = false;
  itemToEdit: Item | null = null;

  constructor(
    private itemsService: ItemsService,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.itemsService.list().subscribe({
      next: (items: Item[]) => {
        this.items = items;
        this.fetchImages(items);
      },
      error: () => this.toastService.error('Erro ao carregar itens'),
    });
  }

  fetchImages(items: Item[]) {
    items.forEach(item => {
      this.itemsService.getItemImageUrl(item.id).subscribe({
        next: (blob: Blob) => {
          const url = URL.createObjectURL(blob);
          this.imageUrls.set(item.id, url);
          const itemToUpdate = this.items.find(i => i.id === item.id);
          if (itemToUpdate) {
            itemToUpdate.displayPicture = url;
          }
        },
        error: () => this.toastService.error(`Erro ao carregar imagem para o item ${item.id}`),
      });
    });
  }

  getImageUrl(itemId: string): string | undefined {
    return this.imageUrls.get(itemId);
  }

  addItem(newItem: Item) {
    this.items.push(newItem);
    this.fetchImages([newItem]);
    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onModalClose() {
    this.showModal = false;
  }

  confirmDelete(itemId: string) {
    this.itemIdToDelete = itemId;
    this.showDeleteConfirmation = true;
  }

  cancelDelete() {
    this.itemIdToDelete = null;
    this.showDeleteConfirmation = false;
  }

  deleteItem() {
    if (this.itemIdToDelete !== null) {
      this.itemsService.delete(this.itemIdToDelete).subscribe({
        next: () => {
          this.items = this.items.filter(item => item.id !== this.itemIdToDelete);
          this.imageUrls.delete(this.itemIdToDelete!);
          this.toastService.success('Item apagado com sucesso!');
          this.itemIdToDelete = null;
          this.showDeleteConfirmation = false;
        },
        error: () => {
          this.toastService.error('Erro ao apagar item');
          this.itemIdToDelete = null;
          this.showDeleteConfirmation = false;
        },
      });
    }
  }

  editItem(item: Item) {
    console.log('Edit button clicked', item);
    this.itemToEdit = { ...item }; // Cria uma cópia do item para edição
    this.showEditModal = true;
  }

  onEditModalClose() {
    this.showEditModal = false;
  }

  onItemUpdated(updatedItem: Item) {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem; // Atualiza o item na lista
      this.fetchImages([updatedItem]); // Atualiza a imagem, se necessário
    }
    this.onEditModalClose();
  }
}
