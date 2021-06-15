
$(document).ready(function () {

	let file = {};

	$('#image-profile').change(function (e) {
		e.preventDefault();
		file = e.target.files[0];


		if (file.size > 2097152) {
			$("#note").css("visibility", "visible");
		} else {
			$("#note").css("visibility", "hidden");
		}
	});

	//signed in user
	$('#submit').click(function (e) {
		e.preventDefault();

		let email = $('#input-email').val(),
			pegID = $('#input-id').val(),
			namaLengkap = $('#input-nama').val().toLowerCase(),
			subject = $('#input-subject').val().toLowerCase(),
			phone = $('#input-nomer').val(),
			password = $('#input-password').val();
		// 	profileImg = $('#image-profile').val();
		// // currAva = $('#curr-avatar')

		if (!email | !pegID | !namaLengkap | !subject | !phone | file.size>2097152) {
			// $('#myFailModal').show();
			$('#myFailModal').modal('show');
		} else {
			auth.createUserWithEmailAndPassword(email, password)
				.then(cred => {

					let storageRef = firebase.storage().ref('users/' + cred.user.uid + '/profile.jpg'),
						// insertToStorage = storageRef.put(file)
						uploadOnTask = storageRef.put(file);

					uploadOnTask.on('state_changed',
						(snapshot) => {
							// tracking progress uploading pada storage
							$('.form-control').prop("disabled", true);
							$('#submit').prop("disabled", true);

							var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							$('.progress-bar').css({ "width": progress + "%" });
							switch (snapshot.state) {
								case firebase.storage.TaskState.PAUSED: // or 'paused'
									console.log('Upload is paused');
									break;
								case firebase.storage.TaskState.RUNNING: // or 'running'
									console.log('Upload is running');
									break;
							}
						},
						(error) => {
							alert(error)
						},
						() => {
							// callback function saat proses success
							uploadOnTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
								return db.collection('users').doc(cred.user.uid).set({
									mail: email,
									idPeg: pegID,
									nama: namaLengkap,
									sub: subject,
									number: phone,
									url: downloadURL
								})
							}).then(() => {
								$('#myModal').show();
							})
								.then(() => {
									$('.progress-bar').css({ "width": 0 + "%" });
									$('.form-control').prop("disabled", false);
									$('#submit').prop("disabled", false);
									$('#input-email').val(""),
										$('#input-nama').val(""),
										$('#input-nomer').val(""),
										$('#input-id').val(""),
										$('#input-subject').val(""),
										$('#input-password').val(""),
										$('#image-profile').val("");

								}).then(() => {
									window.location.assign('../pages/edit.html');
								});
						}
					);

				})
				.catch(e => {
					// handling errors
					$('#myFailModal').modal('show');
				})
		}

	});

	auth.onAuthStateChanged(user => {
		if (user) {
			$('#avatars').html(`${user.email}`);
			$('#navbarDropdownMenuLink').show();
			
		} else {
			$('#navbarDropdownMenuLink').hide();
			$('.navbar-toggler').hide();
		}
	})

	$('#sign-out').click(function (e) {
		e.preventDefault();
		auth.signOut().then(() => {
			console.log(user);
		})
	});


});



