// Initialization
const supabaseUrl = "https://hjohjunaqvwnxcllpvij.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqb2hqdW5hcXZ3bnhjbGxwdmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0ODE0NDQsImV4cCI6MjA1MzA1NzQ0NH0.yr_hLQe6rcLhK21ThM6VLCrPaJt6CkyYFaMRHLBVdnU"
const supabasepro = supabase.createClient(supabaseUrl, supabaseKey);


const user_key = localStorage.getItem("sb-bxmjjcahiffnqdgzfbhv-auth-token")
const key = JSON.parse(user_key)
// console.log(key.user.id)


const titleinp = document.getElementById("title")
const descinp = document.getElementById("desc")
const priceinp = document.getElementById("price")
const imginp = document.getElementById("imageInp")
// console.log(titleinp , descinp , priceinp , imginp)

async function addProduct() {
    title = titleinp.value
    description = descinp.value
    price = priceinp.value
    // console.log(title , description, price)

    const file = imginp.files[0]
    // console.log(file)

    const filename = `${file.name}-${Date.now()}`
    // console.log(filename)

    const { data, error } = await supabasepro.storage
        .from('images')
        .upload(filename, file, {
            cacheControl: '3600',
            upsert: false
        })

    // if (error) {
    //     alert("Uploading Failed!")
    //     console.log(error)
    // } else {
    //     alert("upload Successful")
    // }
    // console.log(data.path)

    const {data: productData, error:producterror } = await supabasepro
        .from('products')
        .insert([{
            title: title,
            description,
            price: price,
            image: data.fullPath,
            uid : key.user.id
          }]).select()

        console.log(productData)

    if(producterror){
        alert("Uploading Failed!")
        console.log(producterror)
    }else{
        alert("upload Successful")
    } 
    
    showtoui(productData[0])
    get_product_form.className = "hidden"
}

const get_product_form = document.querySelector(".add_product")
function addProducticon(){
    get_product_form.className = "block"
}



// async function getuser(){
//     // alert("user get")
//     const { data: { user } } = await supabasepro.auth.getUser()
//     // console.log(user.id)
//   }  
//   getuser()



const myCards = document.querySelector(".my-cards");

async function fetchproducts(){
    const { data, error } = await supabasepro
  .from('products')
  .select()
  .eq("uid",key.user.id)

  for(var i=0; i<data.length; i++){
    const product = data[i]
    showtoui(product)


  }
}
fetchproducts()

async function deleteproduct(data_id){
    // console.log(data_id)
    const response = await supabasepro
    .from('products')
    .delete()
    .eq('id', data_id)
    
    if(response){
        window.location.reload()
    }
}


function showtoui(product){
    console.log(product)


    const user_Div = document.createElement("div")
    user_Div.className = "col-md-3 col-sm-6"
    user_Div.innerHTML =`
              <div class="card mt-5 " style="width: 18rem;">
        <img src="${supabaseUrl}/storage/v1/object/${product.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">PKR ${product.price}</p>
          <p class="card-text">${product.description}.</p>
                <button class="btn btn-info">
                    Update
                </button>
                <button onclick="deleteproduct(${product.id})" class="btn btn-danger">
                    Delete
                </button>
               </div>
        </div>
      </div>
    `
    myCards.appendChild(user_Div)
}