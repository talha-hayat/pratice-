// Initialization
const supabaseUrl = "https://hjohjunaqvwnxcllpvij.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqb2hqdW5hcXZ3bnhjbGxwdmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0ODE0NDQsImV4cCI6MjA1MzA1NzQ0NH0.yr_hLQe6rcLhK21ThM6VLCrPaJt6CkyYFaMRHLBVdnU"
const supabasepro =  supabase.createClient(supabaseUrl, supabaseKey);


const container = document.getElementById("container")

async function fetchproducts(){
    const { data, error } = await supabasepro
  .from('products')
  .select()

  for(var i=0; i<data.length; i++){
        // console.log(data[i])
        const products = data[i]
        const imgsrc = `${supabaseUrl}/storage/v1/object`
        // console.log(products)

    // main div 
    // const m_div = document.createElement("div")
    // m_div.classList.add("card","mt-5") 
    // m_div.style.width = "18rem"
    
    // // Image 
    // const img = document.createElement("img")
    // img.classList.add("card-img-top")
    // img.setAttribute('src', `${products.image}`)

    // // card body
    // const c_body = document.createElement("div") 
    // c_body.className = "card-body"

    // // H5
    // const h5 = document.createElement("h5")
    // h5.className = "card-title my"
    // h5.innerHTML = products.title

    // // p 
    // const p = document.createElement("p")
    // p.classList.add("card-text" , "my")
    // p.innerHTML = products.description


    // //create price
    // const priceP = document.createElement('p')
    // priceP.classList.add("my")
    // priceP.innerHTML = `Price: ${products.price} PKR`


    // // buttons div 
    // const btn_div = document.createElement("div")
    // btn_div.classList.add("my")

    // // buy button 
    // const buyBtn = document.createElement("button")
    // buyBtn.className = "btn btn-success"
    // buyBtn.innerHTML = "Buy"


    // // add to cart button 
    // const cartbtn = document.createElement("button")
    // cartbtn.className = "btn m-2 btn-info"
    // cartbtn.innerHTML = "ADD to Cart"



    // // relation 
    // container.appendChild(m_div)
    // m_div.appendChild(img)
    // m_div.appendChild(c_body)
    // m_div.appendChild(h5)
    // m_div.appendChild(p)
    // m_div.appendChild(priceP)
    // priceP.appendChild(btn_div)
    // btn_div.appendChild(buyBtn)
    // btn_div.appendChild(cartbtn)




    // other way 
  


    const card_Div = document.createElement("div")
    card_Div.className = "card mt-5 "
    card_Div.innerHTML = `
              <div class="card mt-5 " style="width: 18rem;">
        <img src="${imgsrc}/${products.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${products.title}</h5>
          <p class="card-text">PKR ${products.price}</p>
          <p class="card-text">${products.description}.</p>
          <a href="#" class="btn btn-success">Buy Now</a>
          <a href="#" class="btn btn-info">Add to Cart</a>
        </div>
      </div>
    `

    container.appendChild(card_Div)
  }
}
fetchproducts()


