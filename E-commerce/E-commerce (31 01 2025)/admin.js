// Initialization
const supabaseUrl = "https://hjohjunaqvwnxcllpvij.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqb2hqdW5hcXZ3bnhjbGxwdmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0ODE0NDQsImV4cCI6MjA1MzA1NzQ0NH0.yr_hLQe6rcLhK21ThM6VLCrPaJt6CkyYFaMRHLBVdnU"
const supabasepro =  supabase.createClient(supabaseUrl, supabaseKey);


const TableBody = document.getElementById("tBody")
// console.log(TableBody)

async function fetchdata(){
    const { data, error } = await supabasepro
  .from('sells')
  .select()
//   console.log(data)
for(var i=0; i<data.length; i++){
    // console.log(data[i])
    const product = data[i]
    const tr = document.createElement("tr")
    tr.innerHTML = `
            <th scope="row">${[i + 1]}</th>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.productId}</td>
            <td>${product.userId}</td>

    ` 
    tBody.appendChild(tr)
}
}

fetchdata()