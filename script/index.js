
$(document).ready(function () {

	const dbRef = db.collection('users');



	let displayData = ''
	dbRef.orderBy('nama').get().then((querySnapshot) => {
		querySnapshot.docs.forEach((doc) => {
			displayData += card(doc);
		});
		$('#myModal').modal('show');
	}).then(() => {
		$('.show-data').html(displayData);
	}).then(() => {
		
		new ClipboardJS('#copy-text', {
			text: function(trigger) {
				alert('text berhasil disalin')
				return trigger.innerHTML;
			}
		});
	})

	let card = function renderCard(doc) {
		let card =
			`<div class="card mt-2" style="width: 18rem;">
		<img src= ${doc.data().url} class="card-img-top" alt="images">
		<div class="card-body">
			<h5 class="card-title"><b>${doc.data().nama.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())}</b></h5><hr>
			<p class="card-text"> <span> Mata Pelajaran : <span class="text-danger">${doc.data().sub.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())}</span></span><hr>
			<span> No.Hp : <a href="#" class="text-primary" id="copy-text">${doc.data().number}</a></span>
			</p>
			
		</div>
		
	</div>
	
	`

		return card

	}

	$('#src-button').click(function (e) {
		e.preventDefault();
		
		let searchkeyword = $('#searchbox').val().toLowerCase();

		console.log(searchkeyword);

		

		dbRef.where('nama', '==', `${searchkeyword}`).get().then((snapshot => {
			
			let matchData = '';

			if(snapshot.docs.length==0){
				let data = ''
				$('#myFailModal').modal('show');
				dbRef.orderBy('nama').get().then(snapshot=>{
					snapshot.docs.forEach((doc) => {
						data += card(doc);
					});
				}).then(()=>{
					$('.show-data').html(data);
				})
			}
			else{
				snapshot.docs.forEach(doc => {
				// console.log(doc.data());
				matchData+=card(doc);
				
			})
			$('.show-data').html(matchData);}
			
			// matchData = ''
		}))
			.catch(e => {
				console.log(e.message);
			})

	});

	// const database = firebase.database()
	// const beforeQuery = database.ref('guru/')
	/*beforeQuery.on('value', function success(data) {

		if (data) {



			let card = ''

			$('#button-addon2').click(function (e) {
				e.preventDefault();


				let searchkeyword = $('#searchbox').val().toLowerCase();

				// console.log(searchkeyword);

				$.each(data.val(), function (key, value) {
					// console.log(key, value);
					let
						id = key,
						pegID = value['pegID'],
						fullname = value['fullname'],
						subject = value['subject'],
						phone = value['phone'],
						gelar1 = value['gelar1'],
						gelar2 = value['gelar2'],
						imgLink = value['link']
					// images += value['images']
					// card += `
							<div class="card" style="width: 18rem;">
							<img src="/root/images/edit.png" class="card-img-top" alt="images">
							<div class="card-body">
								<h5 class="card-title"><b>${gelar1} ${fullname} ${gelar2}</b></h5><hr>
								<p class="card-text"> <span> Mata Pelajaran : ${subject}</span><hr>
								<span> No.Hp : <span class="text-primary">${phone}</span></span>
								</p>
								<div class="d-grid">
									<button class="btn btn-primary" type="button">Salin No.Hp</button>
								</div>
							</div>
						</div>
					// 	`
					
					if (fullname==searchkeyword) {
						// console.log(searchkeyword);
						card += `
							<div class="card" style="width: 18rem;">
							<img src="${imgLink}" class="card-img-top" alt="images">
							<div class="card-body">
								<h5 class="card-title"><b>${gelar1} ${fullname.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())} ${gelar2}</b></h5><hr>
								<p class="card-text"> <span> Mata Pelajaran : ${subject}</span><hr>
								<span> No.Hp : <span class="text-primary">${phone}</span></span>
								</p>
								<div class="d-grid">
									<button class="btn btn-primary" type="button">Salin No.Hp</button>
								</div>
							</div>
						</div>
						`
					}
				});

				$('.show-data').html(card);
				card = ''
			});


		}

	});*/



})