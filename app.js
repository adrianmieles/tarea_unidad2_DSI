new Vue({
    el: '#app',
    data: {
        userName: '',  // Nombre de la persona
        tempUserName: '',  // Variable temporal para almacenar el nombre ingresado
        newProduct: {
            name: '',
            price: 0,
            quantity: 1,
            date: ''
        },
        products: [],
        totalSales: 0,
        sortOption: 'nameAsc'
    },
    methods: {
        startApp() {
            // Verifica que el nombre temporal no esté vacío
            if (this.tempUserName.trim() === '') {
                alert('Por favor, ingresa tu nombre antes de iniciar.');
                return;
            }

            // Asigna el nombre ingresado a la propiedad userName y restablece la variable temporal
            this.userName = this.tempUserName;
            this.tempUserName = '';
        },
        addProduct() {
            if (
                this.newProduct.name.trim() === '' ||
                this.newProduct.price <= 0 ||
                this.newProduct.quantity <= 0
            ) {
                alert('Por favor, ingresa información válida para el producto.');
                return;
            }

            this.newProduct.date = document.getElementById('productDate').value;
            
            this.products.push({
                name: this.newProduct.name,
                price: parseFloat(this.newProduct.price),
                quantity: parseInt(this.newProduct.quantity),
                date: this.newProduct.date
            });

            this.calculateTotalSales();

            this.newProduct.name = '';
            this.newProduct.price = 0;
            this.newProduct.quantity = 1;
            this.newProduct.date = '';
        },
        editProduct(index) {
            const editedProduct = prompt("Editar producto", this.products[index].name);
            const editedPrice = prompt("Editar precio", this.products[index].price);
            const editedQuantity = prompt("Editar cantidad", this.products[index].quantity);
            const editedDate = prompt("Editar fecha", this.products[index].date);

            if (editedProduct !== null && editedPrice !== null && editedQuantity !== null && editedDate !== null) {
                this.products[index].name = editedProduct.trim();
                this.products[index].price = parseFloat(editedPrice);
                this.products[index].quantity = parseInt(editedQuantity);
                this.products[index].date = editedDate;

                this.calculateTotalSales();
            }
        },
        removeProduct(index) {
            if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
                this.products.splice(index, 1);

                this.calculateTotalSales();
            }
        },
        calculateTotalSales() {
            this.totalSales = this.products.reduce((total, product) => total + product.price * product.quantity, 0);
        },
        sortProducts() {
            switch (this.sortOption) {
                case 'nameAsc':
                    this.products.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'nameDesc':
                    this.products.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'priceAsc':
                    this.products.sort((a, b) => a.price - b.price);
                    break;
                case 'priceDesc':
                    this.products.sort((a, b) => b.price - a.price);
                    break;
                default:
                    break;
            }
        }
    }
});
