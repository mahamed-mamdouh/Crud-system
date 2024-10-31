var productName = document.getElementById("ProductName");
var productPrice = document.getElementById("ProductPrice");
var productDesc = document.getElementById("ProductDesc");
var productCat = document.getElementById("ProductCat");
var addAndUpdate = document.getElementById("addbutton");
var currentIndex;
var productContainer = [];
var namePattern = /^[a-z A-Z 0-9 ]{3,10}$/;
if (localStorage.getItem("allProducts") != null) {
	productContainer = JSON.parse(localStorage.getItem("allProducts"));
	displayProduct(productContainer);
}

addAndUpdate = function(){
	if(addAndUpdate.innerHTML == "Add Product" == true){
		addProduct();
	}
	else {
		updateObject();
	}
	
}



function addProduct(){
	if (!namePattern.test(productName.value)) {
        alert("Product name must be 3-10 letters only.");
        return;
    }
	var product = {
		name: productName.value,
		price: productPrice.value,
		desc: productDesc.value,
		cat: productCat.value,
	}
	productContainer.push(product);
	localStorage.setItem("allProducts", JSON.stringify(productContainer));
	displayProduct(productContainer);
	clearProduct();
}

function clearProduct(){
	productName.value = "";
	productPrice.value = "";
	productCat.value = "";
	productDesc.value = "";
}

function displayProduct(arrayContainer){
    var box =``;
    for(var i = 0; i < arrayContainer.length; i++){
        box += `<tr>
            <td>${ i + 1 }</td>
            <td>${ arrayContainer[i].name }</td>
            <td>${ arrayContainer[i].price }</td>
            <td>${ arrayContainer[i].desc }</td>
            <td>${ arrayContainer[i].cat }</td>
            <td>
                <button class="btn btn-success" onclick="deleteProduct(${ i });">Delete</button>
                <button class="btn btn-secondary " onclick="getObject(${i})">Update</button>
            </td>
        </tr>`;
    }
    tableBody.innerHTML = box;
}

function getObject(indexEdit){
	var product = productContainer[indexEdit];
	currentIndex = indexEdit;
	productName.value = product.name;
	productPrice.value = product.price;
	productDesc.value = product.desc;
	productCat.value = product.cat;
	addAndUpdate.innerHTML = "Update Product";
}

function deleteProduct(index){
	productContainer.splice(index, 1);
	localStorage.setItem("allProducts", JSON.stringify(productContainer));
	displayProduct(productContainer);
}

function searchProduct(term){
	var filterProducts = [];
	for(var i=0; i<productContainer.length; i++){
		if(productContainer[i].name.toUpperCase().includes(term.toUpperCase()) == true){
			filterProducts.push(productContainer[i]);
		}
	}
	displayProduct(filterProducts);

}


function updateObject ()
{
	if (!namePattern.test(productName.value)) {
        alert("Product name must be 3-10 letters only.");
        return;
    }
	var product = {
		name: productName.value,
		price: productPrice.value,
		cat: productCat.value,
		desc: productDesc.value,
	};
	productContainer[currentIndex] = product;
	localStorage.setItem("allProducts", JSON.stringify(productContainer));
	displayProduct(productContainer);
	addAndUpdate.innerHTML = "Add Product";
}

function clearInputs() {
    var tableBody = document.getElementById("tableBody");
    if (tableBody) {
        tableBody.innerHTML = "";
    }
	productContainer = [];
    localStorage.removeItem("allProducts");
}