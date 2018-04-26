

// const navbar = document.getElementById("navbar");
// const sticky = navbar.offsetTop;

// function stickyNav() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// }
// window.onscroll = function() {stickyNav()};


$.ajax({
	url: '/photos/' + id,
	method: 'Get',
	dataType: 'json',
	success: (pictureData) => {
		// this is the response from the server
		console.log(pictureData)
	},
	error: (err) => {
		console.log(err)
	}
})