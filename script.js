const foods = [
    { 
      id:1, 
      name:"Veg Biryani", 
      price:220, 
      cat:"veg", 
      img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500" 
    },
    { 
      id:2, 
      name:"Chicken Biryani", 
      price:320, 
      cat:"nonveg", 
      img:"https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500" 
    },
    { 
      id:3, 
      name:"Paneer Pizza", 
      price:250, 
      cat:"veg", 
      img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" 
    },
    
    { 
      id:5, 
      name:"Chocolate Cake", 
      price:150, 
      cat:"dessert", 
      img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500" 
    },
    { 
      id:6, 
      name:"Ice Cream", 
      price:90, 
      cat:"dessert", 
      img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500" 
    },
    { 
      id:7, 
      name:"Veg Noodles", 
      price:140, 
      cat:"veg", 
      img:"https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500" 
    },
    { 
      id:8, 
      name:"Fish Fry", 
      price:350, 
      cat:"nonveg", 
      img:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500" 
    }
];

let cart = [];

function display(list){
    let box = document.getElementById('foodContainer');
    box.innerHTML = "";
    if(list.length==0){ 
      box.innerHTML="<div class='col-12 text-center'><h4 style='color:#6a1b9a;'>No Food Found 😕</h4></div>"; 
      return; 
    }
    list.forEach(f=>{
        box.innerHTML += `<div class="col-12 col-md-3 mb-4"><div class="card food-card shadow"><img src="${f.img}" class="food-img"><div class="p-3"><h6 style="font-weight:bold; color:#4a148c;">${f.name}</h6><span class="price-tag">Rs.${f.price}</span><button class="btn-purple btn-sm float-right" onclick="addToCart(${f.id})">Add +</button></div></div></div>`;
    });
}

function doSearch(){ 
  let q=document.getElementById('searchInput').value.toLowerCase().trim(); 
  display(q===""?foods:foods.filter(f=>f.name.toLowerCase().includes(q))); 
}

function showAll(btn){ 
  document.getElementById('searchInput').value=""; 
  document.querySelectorAll('.btn-purple').forEach(b=>b.classList.remove('active')); 
  btn.classList.add('active'); 
  display(foods); 
}

function filterCat(cat,btn){ 
  document.getElementById('searchInput').value=""; 
  document.querySelectorAll('.btn-purple').forEach(b=>b.classList.remove('active')); 
  btn.classList.add('active'); 
  display(foods.filter(f=>f.cat===cat)); 
}

function addToCart(id){ cart.push(foods.find(f=>f.id===id)); updateCart(); }

function updateCart(){ 
  let total=cart.reduce((s,i)=>s+i.price,0); 
  document.getElementById('cartCount').innerText=cart.length; 
  document.getElementById('cartTotal1').innerText=total; 
  document.getElementById('cartTotal').innerText=total; 
  document.getElementById('navCount').innerText=cart.length; 
  document.getElementById('cartItems').innerHTML=cart.length===0?"Empty":cart.map((c,i)=>`<div class="d-flex justify-content-between py-2 border-bottom"><span>${c.name}</span><span>Rs.${c.price} <button class="btn btn-sm btn-danger ml-2" onclick="removeCart(${i})">x</button></span></div>`).join(''); 
}

function removeCart(i){ cart.splice(i,1); updateCart(); }
function clearCart(){ cart=[]; updateCart(); }
function toggleCart(){ document.getElementById('cartPanel').classList.toggle('open'); }
function placeOrder(){ if(cart.length===0) alert("Cart Empty!"); else { alert("Order Placed! Rs."+document.getElementById('cartTotal').innerText); clearCart(); toggleCart(); } }

display(foods);
document.getElementById('searchInput').addEventListener('input', doSearch);