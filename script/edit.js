$(document).ready(function () {

	const dbRef = db.collection('users');
	auth.onAuthStateChanged(user => {
		if (user) {
			$('#avatars').html(`${user.email}`);

			dbRef.where('mail', '==', `${user.email}`).get().then((snapshot) => {
				snapshot.docs.forEach(doc => {
					$('img').attr('src', `${doc.data().url}`);
					$('#id-field').val(`${doc.data().idPeg}`);
					$('#name-field').val(`${doc.data().nama}`);
					$('#phone-field').val(`${doc.data().number}`);
					$('#subject-field').val(`${doc.data().sub}`);
				})
			}).then(() => {
				$('#up-btn').click(function (e) {
					e.preventDefault();
					$('.form-control').prop("disabled", true);
					let pegID = $('#id-field').val(),
						namaLengkap = $('#name-field').val(),
						noHp = $('#phone-field').val(),
						subject = $('#subject-field').val();

					dbRef.doc(user.uid).update({
						idPeg:pegID,
						nama:namaLengkap,
						number:noHp,
						sub:subject
					}).then(()=>{
						$('#myModal').modal('show');
					}).then(()=>{
						$('.form-control').prop("disabled", false);
					})
				});
			})
		}
		else {
			// console.log(user);
			$('#navbarDropdownMenuLink').hide();
			$('img').attr('src', ``);
			$('#id-field').val(``);
			$('#name-field').val(``);
			$('#phone-field').val(``);
			$('#subject-field').val(``);
		}
	})

	$('#logout').click(function (e) {
		e.preventDefault();

		auth.signOut().then(() => {
			// $('#navbarDropdownMenuLink').hide();
			$('img').attr('src', ``);
			$('#avatars').val(``);
			$('#id-field').val(``);
			$('#name-field').val(``);
			$('#phone-field').val(``);
			$('#subject-field').val(``);

			window.location.assign('../pages/login.html');
		})
	});

	$('#home-button').click(function (e) { 
		e.preventDefault();

		auth.signOut().then(()=>{
			$('img').attr('src', ``);
			$('#avatars').val(``);
			$('#id-field').val(``);
			$('#name-field').val(``);
			$('#phone-field').val(``);
			$('#subject-field').val(``);

			window.location.assign('../index.html');
		})
	});

});