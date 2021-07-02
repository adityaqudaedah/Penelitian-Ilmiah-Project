
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

})