// Initialization
const supabaseUrl = "https://hjohjunaqvwnxcllpvij.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqb2hqdW5hcXZ3bnhjbGxwdmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0ODE0NDQsImV4cCI6MjA1MzA1NzQ0NH0.yr_hLQe6rcLhK21ThM6VLCrPaJt6CkyYFaMRHLBVdnU"
const supabasepro =  supabase.createClient(supabaseUrl, supabaseKey);



const signUpName = document.getElementById("inputname4")
const signupEmail = document.getElementById("inputEmail4")
const signupPassword = document.getElementById("inputPassword4")
const signupAddress = document.getElementById("inputAddress")
const signupCity = document.getElementById("inputCity4")
const signupRole = document.getElementById("inputRole")

// console.log(signUpName , signupAddress  , signupRole)


// signup 
async function signup(){
    // console.log("Phalastine")
    const name = signUpName.value
    const email = signupEmail.value
    const password = signupPassword.value
    const address = signupAddress.value
    const city = signupCity.value
    const role = signupRole.value
    // console.log(name , email, password,city , address, role);

    if (!name || !email || !password || !address || !city ) {
      alert("please fill all fields!");
      return;
  }

  const { data, error } = await supabasepro.auth.signUp({
        email,
        password,
      })




    const { error: tableError, data: tableData } = await supabasepro
  .from('users')
  .insert({
    name ,
    address ,
    city ,
    role ,
    uid: data.user.id
  })

  if(error){
    alert("Error!")
    console.log(error)
  }else{
  alert("SignUp succesfully")
  // console.log(tableData.user)
}


}




// signIn 
const signInEmail = document.getElementById("inputEmail")
const signInPassword = document.getElementById("inputPassword")

async function signIn(){
    // console.log("Phalastine")
    const email = signInEmail.value
    const password = signInPassword.value

    const { data, error } = await supabasepro.auth.signInWithPassword({
      email: email,
      password: password,
      })

      if(error){
        alert("Error!")
        console.log(error)
        return
      }else{
         alert("Login succesfully")
         console.log(data.user.id)
      }

      const { data:tableData, error:tableError} = await supabasepro
        .from('users')
        .select()
        .eq("uid" , data.user.id)
        .single()

        console.log(tableData)


        // if(tableData.role === "Buyer"){
        //   window.location.href= '\buyer.html'
        // }else if(tableData.role === "Seller"){
        //   window.location.href = '\seller.html'
        // }else{
        //   alert('no role match')
        // }

        if(tableData.role === 'Buyer'){
          // alert("buyer")
          window.location.href = './buyer.html'
        }else if(tableData.role === 'Seller'){
          // alert("seller")
          window.location.href = './seller.html'
        }else if(tableData.role === "admin"){
          window.location.href = './admin.html'
        }
          
}


// switchToSignin

// const signupDiv = document.querySelector('.signup')
// const LoginDiv = document.querySelector('.signin')

// function switchToSignin(){
//     signupDiv.classlist.add("hidden") 
//     LoginDiv.classlist.remove("hidden")
// }


// switchToSignin
const signupDiv = document.querySelector('.signup')
const signinDiv = document.querySelector('.signin')

function switchToSignin(){
//   console.log(signupDiv)
  signupDiv.classList.add('hidden')
  signinDiv.classList.remove('hidden')
}


// switchToSignUp 
function switchToSignup(){
    signinDiv.classList.add("hidden")
    signupDiv.classList.remove("hidden")
}

