var rotation = 0;
var winAmmount = 0;

function spinForm() {
	var myBody = {
		name: document.getElementById("name").value,
		mobile: document.getElementById("mobile").value,
		email: document.getElementById("email").value
	};


	fetch('/spin-form', {
		method: 'POST',
		body: JSON.stringify(myBody),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(function (response) {
		console.log(response);
		return response.json();
	}).then(function (response) {
		if (response.success == 1) {
			afterSubmit();
		} else {
			alert(response.message);
		}
	}).catch(err => {
		console.log(err);
	});
	return false;
}

function afterSubmit() {
	let ptag = document.createElement("h3");
	ptag.innerHTML = "Hurray! Start playing & win awesome discounts...";
	ptag.id = "before-spin"
	let btn = document.createElement("button");
	btn.innerHTML = "Spin";
	btn.id = "spin-button";
	btn.className = "btn btn-danger";

	let formEle = document.getElementById("spin_form");
	formEle.innerHTML = "";
	formEle.appendChild(ptag);
	formEle.appendChild(btn);
	formEle.style.display = 'flex';
	formEle.style.flexDirection = 'column';
	formEle.style.alignItems = 'center';
	formEle.style.textAlign = 'center';

	document.querySelector("#spin-button").addEventListener('click', function () {
		var spinBtn = document.getElementById('spin-button');
        spinBtn.parentNode.removeChild(spinBtn);
		var style = document.createElement('style');
		var keyFrames = `
				@keyframes spin {
					from { transform: rotate(0deg); }
					to { transform: rotate(A_DYNAMIC_VALUE); }
				}
			 `;
	
		var winningArray = [800, 900, 1000, 1100, 1200];
		var randomNo = Math.floor(Math.random() * (winningArray.length));
		var valueDegree = randomNo * (360 / winningArray.length) + (360 / (winningArray.length * 2));
		var degree = 360 * 3 + valueDegree;
		style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, `-${degree}deg`);
		document.getElementsByTagName('head')[0].appendChild(style);
	
		console.log(randomNo, (randomNo * 100) + 800, winningArray[randomNo]);
		winAmmount = winningArray[randomNo]
		// alert(winningArray[randomNo])
	
		document.querySelector("#spinwheel").classList.add('rotating');
		setTimeout( function() { afterSpin(); }, 3000);
	});
}

function afterSpin() {
	let htag = document.createElement("h1");
	htag.innerHTML = "Yippee, you got Rs. " + winAmmount + " off...";
	htag.id = "after-spin"

	let winCaption = document.getElementById("before-spin");
	winCaption.innerHTML = ""

	winCaption.appendChild(htag);

	winCaption.style.display = 'flex';
	winCaption.style.flexDirection = 'column';
	winCaption.style.alignItems = 'center';
	winCaption.style.textAlign = 'center';
}