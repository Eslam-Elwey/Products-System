// var arrList = [5, 4, 2, 33, 24];

// // var newList = arrList.slice(-8,-1) ;

// // arrList.sort();

// arrList.splice(1, 0, "Eslam");

// console.log(arrList);

// // var firstName = document.getElementById("firstName");
// // var lastName = document.getElementById("lastName");

// // function sayHello() {
// //   console.log("Hello", firstName.value, lastName.value);
// // }

// var proName = "productName";

// var proValue = "OPPO";

// var product = {};

// product.proName = proValue;

// console.log(product);

// var arr = [5, 66, 88];

// var newlen = arr.push(44);

// console.log(newlen);

// let val = arr.shift(5);

// console.log("val = ", val);

// console.log(typeof arr.toString());

// arr.push(55, 44, 66, 99, 22, 100);
// console.log(arr);

// let newArr = arr.slice(1, 4);
// newArr.push("Eslam");

// console.log(newArr);

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");

function sayHello() {
  console.log("Hello,", firstName.value, lastName.value);
  console.log();
}

function clearForm() {
  console.log("Clear");
  firstName.value = "";
  lastName.value = "";
}

const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productCategoryInput = document.getElementById("productCat");
const productImageInput = document.getElementById("productImage");
const productDescrpInput = document.getElementById("productDesc");
const SearchInput = document.getElementById("searchBtn");

const productNameRegex = /^[A-Z][a-z]{3,12}$/;

const productCatRegex = /^(TV|Mobile|Electronics)$/;

const mainButton = document.getElementById("mainBtn");
mainButton.textContent = "ADD";
let editProductIndex;

const rowContent = document.getElementById("data-row");

let allProducts = [];
let imageVal = "chair.jpeg";

// allProducts = JSON.parse(localStorage.getItem("allproducts"));

// console.log(JSON.parse(localStorage.getItem("allproducts")));

if (localStorage.getItem("allproducts") != null) {
  allProducts = JSON.parse(localStorage.getItem("allproducts"));

  console.log(allProducts);

  addProductToUI(allProducts);
}

function addProduct() {
  /*Check if an image has benn added */
  if (productImageInput.files["0"] !== undefined) {
    imageVal = productImageInput.files["0"].name;
  } else {
    imageVal = "chair.jpeg";
  }

  let productData = {
    name: productNameInput.value,
    price: Number(productPriceInput.value),
    cat: productCategoryInput.value,
    desc: productDescrpInput.value,
    image: imageVal,
  };

  allProducts.push(productData);
  deleteFields();
  addProductToUI(allProducts);
  // console.log(allProducts);
}

function deleteFields() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescrpInput.value = "";
  productImageInput.value = "";
}

function addProductToUI(specifiedProducts) {
  let dataContent = "";
  let impIndex;

  for (let i = 0; i < specifiedProducts.length; i++) {
    // console.log(imageVal);
    impIndex =
      specifiedProducts[i].foundIndex == undefined
        ? i
        : specifiedProducts[i].foundIndex;
    console.log(impIndex);
    dataContent += `<div class="col-lg-2 col-md-4 my-4">
    <div class="product text-center bg-primary">
          <img
            src="./images/${specifiedProducts[i].image}"
            alt="photo"
            class="w-100 img-thumbnail"
          />
          <h2 class="fs-4">${specifiedProducts[i].name}</h2>
          <h5>Price : <strong>${specifiedProducts[i].price}</strong></h5>
          <h5>Category : <strong>${specifiedProducts[i].cat}</strong></h5>
          <p>Description :<span>${specifiedProducts[i].desc}</span></p>
          <div class="d-flex justify-content-between mx-3 py-3">
            <button onclick="deleteProduct(${impIndex})" class="btn btn-danger">
              <i class="fa-solid fa-trash"></i>
            </button>
            <button class="btn btn-warning" onclick="updateProduct(${impIndex})">
              <i class="fa-solid fa-pen"></i>
            </button>
          </div>
        </div>
        </div>`;
  }

  localStorage.setItem("allproducts", JSON.stringify(allProducts));

  rowContent.innerHTML = dataContent;
}

function deleteProduct(product_no) {
  let inputVal = confirm("Are you Sure To Delete This Product?");
  if (inputVal) {
    allProducts.splice(product_no, 1);
    addProductToUI(allProducts);
    SearchInput.value = "";
  } else {
    console.log("No Deletion");
  }
}

function updateProduct(index) {
  editProductIndex = index;
  /* change value of text content */
  mainButton.textContent = "UPDATE";

  // fill the fields with product data
  productNameInput.value = allProducts[index].name;
  productPriceInput.value = allProducts[index].price;
  productCategoryInput.value = allProducts[index].cat;
  productDescrpInput.value = allProducts[index].desc;
  productImageInput.files["0"] = `./images/${allProducts[index].image}`;
}

function handleProductOptions() {
  let regexCompVal = validateAllInputs();
  if (mainButton.textContent === "ADD") {
    if (regexCompVal === true) {
      addProduct();
    } else {
      alert(regexCompVal);
    }
  } else {
    if (regexCompVal === true) {
      editProductData();
    } else {
      alert(regexCompVal);
    }
  }
}

function editProductData() {
  let inputVal = confirm("Are you Sure To update Product Data?");
  if (inputVal) {
    // update change in the values of the saved array
    allProducts[editProductIndex].name = productNameInput.value;
    allProducts[editProductIndex].price = productPriceInput.value;
    allProducts[editProductIndex].cat = productCategoryInput.value;
    allProducts[editProductIndex].desc = productDescrpInput.value;
    if (productImageInput.files["0"] != undefined) {
      imageVal = productImageInput.files["0"].name;
      allProducts[editProductIndex].image = imageVal;
    }

    addProductToUI(allProducts);
    SearchInput.value = "";
  } else {
    console.log("No Update");
  }

  // change the button text to Add
  mainButton.textContent = "ADD";

  //empty The fields
  deleteFields();
}

function searchProduct(searchitem) {
  // console.log(searchitem);

  let foundProducts = [];

  //search with the recrived text to matched name in products
  let j = 0;
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name.toLowerCase().includes(searchitem.toLowerCase())) {
      console.log(allProducts[i].name);
      foundProducts.push(allProducts[i]);
      foundProducts[j++].foundIndex = i;
    }

    console.log(foundProducts);
    addProductToUI(foundProducts);
  }

  // display new specified products
}

// let arr = [
//   { name: "Eslam", age: 25 },
//   { name: "Ali", age: 34 },
// ];

// localStorage.setItem("Arr", JSON.stringify(arr));

// console.log(JSON.parse(localStorage.getItem("Arr")));

// let test = "he  e+hl";

// let regex = /[^a-zA-Z]/g;

// let regEmail = /^[a-zA-Z][a-zA-Z0-9.]{2,}@(gmail|hotmail).com$/;

// console.log(regEmail.test("John.Doe@gmail.com"));

// let newString = test.replace(regex, "");

// console.log(newString);

// let reversedString = newString.split("").reverse().join("");

// console.log(reversedString);

function validateInput(regex, testedString) {
  return regex.test(testedString);
}

function validateAllInputs() {
  if (validateInput(productNameRegex, productNameInput.value) === false) {
    return "Product Name Must Start with Capital Letter consists of 3-12 letters";
  }
  if (validateInput(productCatRegex, productCategoryInput.value) === false) {
    return "Product Category Can only be TV or Mobile or Electronics ";
  }
  return true;
}
