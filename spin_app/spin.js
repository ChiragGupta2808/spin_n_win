let container = document.querySelector(".cont");
let btn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 6000);

function spinWheel() {
	document.getElementById("spin_form").innerHTML = "You can spin now"
	btn.onclick = function () {
		container.style.transform = "rotate(" + number + "deg)";
		number += Math.ceil(Math.random() * 6000);
	}
}

function spinForm() {

	var myBody = {
		name: document.getElementById("name").value,
		mobile: document.getElementById("mobile").value,
		email: document.getElementById("email").value
	};
	fetch('http://127.0.0.1:5000/spin_form', {
		method: 'POST',
		body: JSON.stringify(myBody),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(function (response) {
		alert("hii")
		return response.json()
	}).then(function (response) {
		if (response.success == "1") {
			alert("yes")
			spinWheel();
		} else {
			alert("no")
			alert(response.message)
		}
	}).catch(err => {
		showError(err);
	});
}