// Initialization
const supabaseUrl = "https://hjohjunaqvwnxcllpvij.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqb2hqdW5hcXZ3bnhjbGxwdmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0ODE0NDQsImV4cCI6MjA1MzA1NzQ0NH0.yr_hLQe6rcLhK21ThM6VLCrPaJt6CkyYFaMRHLBVdnU"
const supabasepro = supabase.createClient(supabaseUrl, supabaseKey);

let productId = null
const Modal = new bootstrap.Modal(document.getElementById("staticBackdrop"))
const myCards = document.querySelector(".my-cards");



const titleinp = document.getElementById("title")
const descinp = document.getElementById("desc")
const priceinp = document.getElementById("price")
const imginp = document.getElementById("imageInp")
const listproduct = document.getElementById("listproduct")
// console.log(titleinp , descinp , priceinp , imginp)

async function getuser() {
    const { data: { user } } = await supabasepro.auth.getUser()
    const u_id = localStorage.setItem("uid", user.id)
}
getuser()

async function fetchProduct(){
    const uid = localStorage.getItem("uid")
    const { data, error } = await supabasepro
        .from('products')
        .select()
        .eq("uid",uid)

        // console.log(data)
        myCards.innerHTML = ""
        

    for(var i=0; i<data.length; i++){
        const product = data[i]
        // showtoui(product)

        const user_Div = document.createElement("div")
        user_Div.className = "col-md-3 col-sm-6"
        user_Div.innerHTML =`
                <div class="card mt-5  g-col-6" style="width: 18rem;">
            <img src="${supabaseUrl}/storage/v1/object/${product.image}" class="card-img-top" alt="...">
            <div class="card-body ">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">PKR ${product.price}</p>
            <p class="card-text">${product.description}.</p>
                    <button onclick="UpdateProduct(${product.id})" class="btn btn-info">
                        Update
                    </button>
                    <button onclick="deletedata(${product.id})" class="btn btn-danger">
                        Delete
                    </button>
                </div>
            </div>
        </div>
        `
        myCards.appendChild(user_Div)
    }
}
fetchProduct()

async function addProduct(){
    title = titleinp.value
    description = descinp.value
    price = priceinp.value
    const user_id = localStorage.getItem("uid")
    // console.log(title , description, price)
    const file = imginp.files[0]
    // console.log(file)
    const filename = `${file.name}-${Date.now()}`
    // console.log(filename)

    if(productId){
        // console.log("edit")
        const { error } = await supabasepro
            .from('products')
            .update({
                title,
                description,
                price
            })
            .eq('id',productId)

        if(!error){
            console.log("product updated")
        }



    }else{
        // console.log("add product")

        const { data, error } = await supabasepro.storage
        .from('images')
        .upload(filename, file, {
            cacheControl: '3600',
            upsert: false
  })

//     console.log(data.fullPath)

    const { error:inserterror } = await supabasepro
        .from('products')
        .insert({ 
            title,
            description,
            price,
            image:data.fullPath,
            uid:user_id
         })

        if(!inserterror){
            alert("Product Upload")
        }else{
            alert("Error")
            console.log(inserterror)
            return
        }
    }

    Modal.hide()
    fetchProduct()
    clearfield()
}

async function deletedata(P_id){
    const response = await supabasepro
  .from('products')
  .delete()
  .eq('id',P_id)

  fetchProduct()

}

async function UpdateProduct(Id){
    // console.log(Id)
    listproduct.innerHTML= "Edit Product"
    Modal.show()
    productId = Id

    const { data, error } = await supabasepro
        .from('products')
        .select()
        .eq("id",Id)
        .single()


    // console.log(data)

    titleinp.value = data.title
    descinp.value = data.description
    priceinp.value = data.price 
}

function clearfield(){
    titleinp.value = " "
    descinp.value= " "
    priceinp.value = " "
    imginp.value= " "
    listproduct.innerHTML = "Add product"
}


