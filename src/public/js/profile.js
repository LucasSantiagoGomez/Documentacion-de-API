
const logOutBtn = document.getElementById("logout-btn");

logOutBtn.addEventListener("click", async (e) => {
	e.preventDefault();
	const email = document
		.getElementById("email")
		.querySelector(".profile-panel-body-value").innerText;
	console.log(email);
	try {
		await fetch("/api/sessions/logout", {
			method: "POST",
			body: JSON.stringify({ username: email }),
			header: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				window.location.href = "/login";
			} else {
				const error = new Error(res.error);
				throw error;
			}
		});
	} catch (error) {
		console.error(error);
	}
});