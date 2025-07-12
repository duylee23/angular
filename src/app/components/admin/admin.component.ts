import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
  stock: number;
}

interface Order {
  id: number;
  customerName: string;
  date: Date;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-admin',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  activeTab: 'dashboard' | 'products' | 'orders' | 'analytics' = 'dashboard';
  
  products: Product[] = [];
  showSuccessMessage = false;

  newProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    category: '',
    imageUrl: '',
    stock: 0
  };

  // Mock data for dashboard
  mockOrders: Order[] = [
    { id: 1001, customerName: 'John Doe', date: new Date('2024-01-15'), total: 299.99, status: 'delivered' },
    { id: 1002, customerName: 'Jane Smith', date: new Date('2024-01-14'), total: 149.99, status: 'shipped' },
    { id: 1003, customerName: 'Mike Johnson', date: new Date('2024-01-13'), total: 89.99, status: 'processing' },
    { id: 1004, customerName: 'Sarah Wilson', date: new Date('2024-01-12'), total: 199.99, status: 'pending' },
    { id: 1005, customerName: 'David Brown', date: new Date('2024-01-11'), total: 399.99, status: 'delivered' },
    { id: 1006, customerName: 'Lisa Davis', date: new Date('2024-01-10'), total: 79.99, status: 'cancelled' }
  ];

  mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'active' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'inactive' },
    { id: 5, name: 'David Brown', email: 'david@example.com', status: 'active' }
  ];

  onSubmit() {
    if (this.newProduct.name && this.newProduct.price > 0 && this.newProduct.category && this.newProduct.stock >= 0) {
      const product: Product = {
        ...this.newProduct,
        id: Date.now() // Simple ID generation
      };
      
      this.products.push(product);
      this.showSuccessMessage = true;
      
      // Reset form
      this.resetForm();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }
  }

  resetForm() {
    this.newProduct = {
      id: 0,
      name: '',
      price: 0,
      description: '',
      category: '',
      imageUrl: '',
      stock: 0
    };
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter(product => product.id !== productId);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  trackByOrderId(index: number, order: Order): number {
    return order.id;
  }

  // Dashboard statistics methods
  getTotalRevenue(): number {
    return this.mockOrders.reduce((total, order) => total + order.total, 0);
  }

  getLowStockProducts(): Product[] {
    return this.products.filter(product => product.stock < 10);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  // Analytics methods
  getMonthlySales(): number {
    const currentMonth = new Date().getMonth();
    return this.mockOrders
      .filter(order => order.date.getMonth() === currentMonth)
      .reduce((total, order) => total + order.total, 0);
  }

  getMonthlyOrders(): number {
    const currentMonth = new Date().getMonth();
    return this.mockOrders.filter(order => order.date.getMonth() === currentMonth).length;
  }

  getAverageOrderValue(): number {
    if (this.mockOrders.length === 0) return 0;
    return this.getTotalRevenue() / this.mockOrders.length;
  }

  getConversionRate(): number {
    // Mock conversion rate calculation
    return Math.round((this.mockOrders.length / (this.mockUsers.length * 10)) * 100);
  }

  getCategoryStats(): Array<{name: string, count: number, revenue: number}> {
    const categories = ['shoes', 'clothes', 'accessories', 'sports'];
    return categories.map(category => {
      const categoryProducts = this.products.filter(p => p.category === category);
      const count = categoryProducts.length;
      const revenue = categoryProducts.reduce((total, product) => total + (product.price * product.stock), 0);
      return { name: category, count, revenue };
    });
  }
}
