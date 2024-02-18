// products.js

// Function to get URL parameters
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function displayProductDetails() {
    // Retrieve product details from URL parameters
    var productId = getParameterByName('id');
    var productName = getParameterByName('name');
    var productPrice = getParameterByName('price');
    var productImage = getParameterByName('image');
    var productDescription = getParameterByName('description'); // Add this line to retrieve the description

    // Display product details on the page
    var productDetailsDiv = document.getElementById('productDetails');
    if (productId && productName && productPrice && productImage && productDescription) {
        productDetailsDiv.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${productImage}" class="img-fluid rounded-start" alt="${productName}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${productName}</h5>
                            <p class="card-text">Price: ${productPrice}</p>
                            <p class="card-text">${productDescription}</p> <!-- Display the description -->
                            <button class="btn btn-success" onclick="addToCart('${productId}')">Add to Cart</button> <!-- Add to Cart button -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        productDetailsDiv.innerHTML = '<p>Product details not found.</p>';
    }
}


// Function to show products based on category
function showProducts(category) {
    var categoryTitle = document.getElementById('categoryTitle');
    var productsDiv = document.getElementById('products');

    categoryTitle.textContent = 'Products in ' + category;

    var products = getProductsByCategory(category);

    productsDiv.innerHTML = '';
    products.forEach(function (product) {
        // Create product card
        var cardDiv = document.createElement('div');
        cardDiv.classList.add('col-lg-3', 'col-md-6', 'col-sm-12', 'p-1');
        cardDiv.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Price: ${product.price}</p>
                    <button class="btn btn-primary" onclick="viewDetails('${product.id}', '${product.name}', '${product.price}','${product.image}','${product.description}')">View Details</button>
                    <button class="btn btn-success" onclick="addToCart('${product.id}')">Add to Cart</button>
                </div>
            </div>
        `;
        productsDiv.appendChild(cardDiv);
    });
}


function getProductsByCategory(category) {
    var dummyData = {
         clothing: [
            { id: '5', name: 'Full OutFit', price: '$120', image: './Assets/clothes/clothes2.jpg', description: 'Classic denim jeans with a modern fit.' },
            { id: '6', name: 'Full OutFit', price: '$145', image: './Assets/clothes/clothes4.jpg', description: 'Warm and cozy sweater for chilly days.' },
            { id: '6', name: 'Full OutFit', price: '$150', image: './Assets/clothes/clothes5.jpg', description: 'Warm and cozy sweater for chilly days.' },
            { id: '6', name: 'Full OutFit', price: '$160', image: './Assets/clothes/clothes6.jpg', description: 'Warm and cozy sweater for chilly days.' },
            { id: '6', name: 'Full OutFit', price: '$115', image: './Assets/clothes/clothes7.jpg', description: 'Warm and cozy sweater for chilly days.' },
            { id: '6', name: 'Full OutFit', price: '$234', image: './Assets/clothes/clothes8.jpg', description: 'Warm and cozy sweater for chilly days.' },
            { id: '6', name: 'Full OutFit', price: '$154', image: './Assets/clothes/clothes9.jpg', description: 'Warm and cozy sweater for chilly days.' },
            { id: '6', name: 'Full OutFit', price: '$213', image: './Assets/clothes/clothes10.jpg', description: 'Warm and cozy sweater for chilly days.' },
        ],
        electronics: [
            { id: '1', name: 'Laptop', price: '$999', image: './Assets/electronics/labtop.jpg', description: 'Powerful laptop for all your computing needs.' },
            { id: '2', name: 'I Phone', price: '$699', image: './Assets/electronics/phone.jpg', description: 'Feature-packed smartphone with advanced camera technology.' },
            { id: '3', name: 'Air Pods', price: '$399', image: './Assets/electronics/airPods.jpg', description: 'Portable tablet for entertainment and productivity on the go.' }
        ],
        books: [
            { id: '7', name: 'zero to one', price: '$10', image: './Assets/books/book1.jpg', description: 'Classic novel exploring themes of love and the American Dream.' },
            { id: '8', name: 'Ego in the enemy', price: '$12', image: './Assets/books/book2.jpg', description: 'Pulitzer Prize-winning novel addressing racial injustice in the American South.' },
            { id: '9', name: 'physology of money', price: '$8', image: './Assets/books/book3.jpg', description: 'Dystopian novel depicting a totalitarian society.' },
            { id: '9', name: '101', price: '$8', image: './Assets/books/book4.jpg', description: 'Dystopian novel depicting a totalitarian society.' }
        ]
    };
    return dummyData[category] || [];
}

function viewDetails(productId, productName, productPrice, productImg, productDescription) {
    var productDetailsUrl = 'productDetails.html?id=' + productId +
        '&name=' + encodeURIComponent(productName) +
        '&price=' + encodeURIComponent(productPrice) + 
        '&image=' + encodeURIComponent(productImg) +
        '&description=' + encodeURIComponent(productDescription);
    window.open(productDetailsUrl, '_blank');
}
var x = 0;
function addToCart(productId) {
    var x =localStorage.getItem('cartItems');
    if(x){
    x++;
    document.getElementById('cartItems').textContent = x;
    localStorage.setItem('cartItems', x);
    }else{
    x = 0;
    x++;
    document.getElementById('cartItems').textContent = x;
    localStorage.setItem('cartItems', x);
    }
   
}
function getItems(){
    var x =0;
    x = localStorage.getItem('cartItems');
    document.getElementById('cartItems').textContent = x;
}
getItems();
showProducts('clothing');
