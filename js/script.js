let productCount = 0;
const phoneContainer = document.getElementById('phone-container');
const addedPhoneContainer = document.getElementById('added-phone-container');

const loadPhoneData = async() =>{
    const url = "../data.json"
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const displayPhonesToUi = async () =>{
    const phones = await loadPhoneData();
    phones.forEach(phone => {
        const {id, price, img, name} = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('card', 'card-compact' , 'bg-base-100', 'shadow-xl');
        phoneDiv.innerHTML = `
        <figure class="p-4 "><img src="${img}" alt="Shoes" class="rounded-xl"/></figure>
        <div class="card-body flex flex-col gap-4">
            <div class="flex items-center justify-between">
                <h2 class="card-title">${name}</h2>
                <div class="text-2xl">
                    <i class="fa-solid fa-heart mr-2 "></i>
                    <i class="fa-solid fa-square-minus text-red-600"></i>
                </div>
            </div>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <p class="text-xl font-bold">Price: ${price}</p>
          <div class="card-actions justify-between">
            <button class="btn btn-primary btn-outline w-[48%]"> <i class="fa-solid fa-circle-info mr-2"></i> See Details</button>
            <button class="btn btn-secondary btn-outline w-[48%]" onclick = "addToCartById('${id}')"> <i class="fa-solid fa-bag-shopping mr-2"></i>Buy Now</button>
          </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv);
    });
}

/* function addToCartById (id){
    const phones = 
} */

const addToCartById = async(id) =>{
    console.log(id);
    const phones = await loadPhoneData();
    const phone = phones.find(phone => phone.id === id);
    const {img, name} = phone;
    const addedPhoneDiv = document.createElement('div');
    addedPhoneDiv.classList.add('flex', 'border-2', 'items-center', 'justify-between', 'p-2', 'shadow-lg', 'mt-3', 'rounded-md');
    addedPhoneDiv.innerHTML = `
                    <img src="${img}" alt="" class="w-[50px]" >
                    <p class="font-semibold">${name}</p>
                    <p class=" border-yellow-700 border-2 rounded-lg px-3 py-1">1</p>
                    <i class="fa-solid fa-trash text-xl text-red-600"></i>
    `
    addedPhoneContainer.appendChild(addedPhoneDiv);
    document.getElementById('cart-product-count').innerText = ++productCount;

}


displayPhonesToUi();