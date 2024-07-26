import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Item, ItemsService } from '../../services/items.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-items-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.scss']
})
export class ItemsFormComponent implements OnInit {
  @Output() itemAdded = new EventEmitter<Item>();
  @Output() closeModal = new EventEmitter<void>();
  newItem: Item = {
    id: '',
    title: '',
    description: '',
    category: '',
    price: 0,
    displayPicture: ''
  };
  selectedFile: File | null = null;

  constructor(
    private itemsService: ItemsService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addItem() {
    const formData = new FormData();
    formData.append('title', this.newItem.title);
    formData.append('description', this.newItem.description);
    formData.append('category', this.newItem.category);
    formData.append('price', this.newItem.price.toString());
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.itemsService.create(formData).subscribe({
      next: (createdItem: Item) => {
        this.itemAdded.emit(createdItem);
        this.newItem = { id: '', title: '', description: '', category: '', price: 0, displayPicture: '' };
        this.selectedFile = null;
        this.toastrService.success('Item adicionado com sucesso!');
        this.closeModal.emit();
      },
      error: (error) => {
        this.toastrService.error('Erro ao adicionar item', error);
      }
    });
  }
}
