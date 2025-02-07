// Initialization
const supabaseUrl = "https://hjohjunaqvwnxcllpvij.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqb2hqdW5hcXZ3bnhjbGxwdmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0ODE0NDQsImV4cCI6MjA1MzA1NzQ0NH0.yr_hLQe6rcLhK21ThM6VLCrPaJt6CkyYFaMRHLBVdnU"
const supabasepro = supabase.createClient(supabaseUrl, supabaseKey);


// Product Id
const product_id = localStorage.getItem("product_id")
// console.log(id)


// User id 
const Id = JSON.parse(localStorage.getItem("sb-bxmjjcahiffnqdgzfbhv-auth-token"))
const UserId = Id.user.id
// console.log(UserId)

// main-card 
const container = document.getElementById("container")

// variables
const img = document.getElementById("img")
const title = document.getElementById("title")
const description = document.getElementById("Description")
const price = document.getElementById("price")

async function product_info() {
  const { data, error } = await supabasepro
    .from('products')
    .select()
    .eq("id", product_id)
    .single()

  const products = data
  console.log(products)

  // img.setAttribute("src", `${supabaseUrl}/storage/v1/object/${products.image}`)
  // title.innerHTML = products.title
  // description.innerHTML = products.description
  // price.innerHTML = products.price
  //   console.log(products)


  const card = document.createElement("div")
  card.className = "container d-flex my-margin"
  card.innerHTML = `<div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 text-center">
          <img class="img-fluid rounded" width="300px" src="${supabaseUrl}/storage/v1/object/public/${products.image}" alt="">
        </div>
        <div class="col-md-6 mt-3 text-primary">
          <h3>${products.title}</h3>
          <p>${products.description}</p>
          <h3>${products.price}</h3>
          <button onclick="confirmBtn()" class="btn btn-info text-white mt-5 w-700">Confirm Order</button>
        </div>
      </div>
    </div>
  `
  container.appendChild(card)

  localStorage.setItem("title", products.title)
  localStorage.setItem("price", products.price)

}

product_info()

async function confirmBtn() {

  const { error } = await supabasepro
    .from('sells')
    .insert({
      title: localStorage.getItem("title"),
      price: localStorage.getItem("price"),
      userId: UserId,
      productId: product_id
    })

  if (error) {
    alert("Error!")
    console.log(error)
  } else {
    alert("Product Confirm")
    window.location.href = "./buyer.html"
  }


}