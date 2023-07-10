
const form = document.getElementById("register-form");

form.addEventListener("submit", async (e) => {
	e.preventDefault();

	const formData = new FormData(e.target);
	const formObject = Object.fromEntries(formData.entries())
	const obj = JSON.stringify(formObject)

    try{
		await fetch("/api/sessions/register",{
		method: "POST",
		body: obj,
		headers:{
			"Content-Type":"application/json"
		}
		}).then((response)=>{
			if(response.status===201){
				window.location.href="/"
			}else{
				window.alert("error")
			}
		})
	}catch (error){
		console.error(error)
	}
})