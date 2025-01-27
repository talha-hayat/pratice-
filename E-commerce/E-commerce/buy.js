// Initialization
const supabaseUrl = "https://hjohjunaqvwnxcllpvij.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqb2hqdW5hcXZ3bnhjbGxwdmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0ODE0NDQsImV4cCI6MjA1MzA1NzQ0NH0.yr_hLQe6rcLhK21ThM6VLCrPaJt6CkyYFaMRHLBVdnU"
const supabasepro =  supabase.createClient(supabaseUrl, supabaseKey);

const id =localStorage.getItem("product_id")
// console.log(id)

// variables
const img = document.getElementById("img")
const title= document.getElementById("title")
const description = document.getElementById("Description")
const price = document.getElementById("price")

async function product_info(){
    const { data, error } = await supabasepro
  .from('products')
  .select()
  .eq("id",id)
  .single()

  const products = data
  console.log(products)

  img.setAttribute("scr", `${supabaseUrl}/storage/v1/object/${products.image}`)
  title.innerHTML = products.title
  description.innerHTML = products.description
  price.innerHTML = products.price

//   console.log(products)
//   `    <div width="100%" class="container d-flex my-margin">

//         <div >
//             <img width="350px" src="./images/product 01.webp" alt="">
//         </div>

//         <div class="text-primary mt-5">
//             <h3>${products.title}</h3>
//             <br>
//             <p>${products.description}</p>
//             <h3>${products.price}</h3>
//             <br>
//             <button class="btn btn-info">Confirm order</button>
//         </div>
//     </div>
// `
}

product_info()