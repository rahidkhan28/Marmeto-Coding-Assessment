// This event listener waits for the DOM content to be fully loaded before executing the provided function.
document.addEventListener("DOMContentLoaded", function() {
    // Select all elements with the class 'nav-item' and store them in the 'navItems' variable.
    const navItems = document.querySelectorAll('.nav-item');
    // Select all elements with the class 'card' and store them in the 'cards' variable.
    const cards = document.querySelectorAll('.card');

    // Function to update the display based on the target card ID.
    function updateDisplay(targetId) {
        // Hide all cards by setting their display style to 'none'.
        cards.forEach(card => {
            card.style.display = 'none';
        });

        // Remove the 'active' class from all navigation items.
        navItems.forEach(nav => {
            nav.classList.remove('active');
        });

        // Display the target card by setting its display style to 'flex'.
        const targetCard = document.getElementById(targetId);
        targetCard.style.display = 'flex';

        // Find the navigation item corresponding to the target card and add the 'active' class to it.
        const targetNavItem = Array.from(navItems).find(item => item.dataset.target === targetId);
        if (targetNavItem) {
            targetNavItem.classList.add('active');
        }
    }

    // Initially display the card with ID 'card1'.
    updateDisplay('card1');

    // Add click event listeners to all navigation items.
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior.

            // Get the ID of the target card from the 'data-target' attribute of the clicked navigation item.
            const targetId = this.getAttribute('data-target');
            // Update the display based on the target card ID.
            updateDisplay(targetId);
        });
    });
});

// Asynchronous function to fetch and display products from an API.
async function fetchAndDisplayProducts() {
    try {
        // Fetch data from the provided API endpoint.
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        // Parse the response as JSON.
        const completedata = await response.json(); 

        // Initialize variables to store HTML for products in different categories.
        let menProductsHTML = "";   
        let womenProductsHTML = ""; 
        let kidsProductsHTML = "";  

        // Iterate through each category in the API response.
        completedata.categories.forEach((category) => {
            // Convert category name to lowercase.
            const categoryName = category.category_name.toLowerCase(); 

            // Iterate through each product in the current category.
            category.category_products.forEach((product) => {
                // Create HTML markup for the product, including optional badge text.
                const productBadge = product.badge_text ? `<div class="product-badge">${product.badge_text}</div>` : ''; 
                const productHTML = `
                    <div class="product-card">
                        <div class="product-image">
                            <img src=${product.image} alt="">
                            ${productBadge}
                        </div>
                        <div class="product-details">
                            <div id="title-vendor">
                                <div class="product-title">${product.title} •</div>
                                <div class="product-vendor">${product.vendor}</div>
                            </div>
                            <div class="product-price">
                                Rs ${product.price}
                                <span class="original-price">${product.compare_at_price}</span>
                                <span class="discount"> 50% Off</span>
                            </div>
                            <div class="add-to-cart">
                                <button>Add to Cart</button>
                            </div>
                        </div>
                    </div>`;
                
                // Append the product HTML to the corresponding category's HTML string.
                if (categoryName === "men") {
                    menProductsHTML += productHTML;
                } else if (categoryName === "women") {
                    womenProductsHTML += productHTML;
                } else if (categoryName === "kids") {
                    kidsProductsHTML += productHTML;
                }
            });
        });

        // Update the HTML content of the cards with the generated product HTML.
        if (document.getElementById('card1')) {
            document.getElementById('card1').innerHTML = menProductsHTML;
        }
        if (document.getElementById('card2')) {
            document.getElementById('card2').innerHTML = womenProductsHTML;
        }
        if (document.getElementById('card3')) {
            document.getElementById('card3').innerHTML = kidsProductsHTML;
        }

    } catch (err) {
        console.log(err); // Log any errors that occur during the fetching process.
    }
}

// Call the fetchAndDisplayProducts function to fetch and display products when the script is executed.
fetchAndDisplayProducts();
