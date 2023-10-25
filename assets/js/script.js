 $(document).ready(function () {
	const maxFileSize = 20000; // Max File size Input
	let sekuritasSelected = []; // Untuk menampung data sekuritas yg dipilih user

	// Navigation Home Page
	if($("body").has("#home-page").length >0){
		$(".nav-link").each((i, el) => {
			if (window.location.hash === $(el).attr("href")) {
				$(el).addClass("nav-active");
			}

			$(this).on("click" ,() =>{
				setTimeout(() => {
					if (window.location.hash === $(el).attr("href")) {
						$(el).addClass("nav-active");
					} else{
						$(el).removeClass("nav-active");
					}
				},100)
			})
		})
	}

	// Data Sekuritas Dummy
	const dataSekuritas = [
		{
			id: 0,
			name: "USB Sekuritas",
			value: "usb-sekuritas"
		},
		{
			id: 1,
			name: "Maybank Sekuritas",
			value: "maybank-sekuritas"
		},
		{
			id: 2,
			name: "Mandiri Sekuritas",
			value: "mandiri-sekuritas"
		},
		{
			id: 3,
			name: "CGS-CIMB Sekuritas",
			value: "cgs-cimb-sekuritas"
		},
		{
			id: 4,
			name: "Mirae Asset Sekuritas",
			value: "mirae-asset-sekuritas"
		},
		{
			id: 5,
			name: "J.P. Morgan Sekuritas",
			value: "jp-merger-sekuritas"
		},
	]

	

	// User Section
	$(".user-default").click(() => {
		$(".modal").css("display", "block")
		$(".modal").html(`
			<div class="modal-login">
				<iframe
				width="100%"
				height="100%"
				frameborder="0"
				src="https://client.okezone.com/testing/login_sso/login.html"
				title="Iframe Example"></iframe>
			</div>
		`);

		// Set user login
		$(".user-default").addClass("hidden");
		$(".has-login").removeClass("hidden");

		// click area modal for hidden
		$(".modal").click(() => {
			$(".modal").css("display", "none")
		})
	})

	// Dropdown user
	$(".drop-down-ic").on("click", () => {
		if ($(".drop-down-ic").hasClass("active")) {
		$(".drop-down-ic").removeClass("active")
		$(".modal-user").css('display', 'none')
		} else{
			$(".drop-down-ic").addClass("active")
			$(".modal-user").css('display', 'flex')
		}

		// Log Out action
		$("#logout").click(() => {
			$(".user-default").removeClass("hidden");
			$(".has-login").addClass("hidden");

			// Navigate to home page
			window.location.href = "/";
		})

		// dropdown hidden after clicking outframe dropdown
		$(window).click((e) => {
			if (e.target !== $(".drop-down-ic").get(0)){
				$(".drop-down-ic").removeClass("active")
				$(".modal-user").css('display', 'none')
			}
		})
	})

	// Form Investor
	$("select").on("click touchstart change", () => {
		$("option").each((i,el) => {
			if ($(el).val() == 0 ){
				$(el).attr("disabled", true);
			}
		})
		if ($("#tipe-pengunjung").val() === "investor") {
			$("#sekuritas-terdaftar-active").css('display', 'block');
			$("#tipe-media-active").css('display', 'none');
			$("#tipe-umum-active").css('display', 'none');
		} else if($("#tipe-pengunjung").val() === "media"){
			$("#tipe-media-active").css('display', 'block');
			$("#sekuritas-terdaftar-active").css('display', 'none');
			$("#tipe-umum-active").css('display', 'none');
		} else if($("#tipe-pengunjung").val() === "umum"){
			$("#sekuritas-terdaftar-active").css('display', 'none');
			$("#tipe-media-active").css('display', 'none');
			$("#tipe-umum-active").css('display', 'block');
		}
	})

		// Input Tags Section
			// Displaying Tag
			$(".bootstrap-tagsinput").click(()=>{
				if ($("#page-investor").length > 0) {
					let content= []
					$(".bootstrap-tagsinput").css("border-color", "#04577c")
					dataSekuritas.forEach((data) => {
						content.push(`<li class="data-list" data-value="${data.name}" data-id="${data.id}">${data.name}</li>`)
					})
	
					// dropdown hidde after clicking outframe dropdown
					// $(window).click((e) => {
					// 	if (e.target !== $(".bootstrap-tagsinput").get(0)){
					// 		$(".wrapp-list-sekuritas").html(``)
					// 	}
					// })
	
					return $(".wrapp-list-sekuritas").html(`
						<div class="list-sekuritas">
							<ul>${content.join("")}</ul>
						</div>
					`)
				} 
			})

			// Set Tag			
			$(".wrapp-list-sekuritas").hover(()=>{
				$(".data-list").each(function(i) {
					$(this).click(() => {
						const data = $(this).text()
						sekuritasSelected.push(data)
						$("#sekuritas-terdaftar").attr("data-value" ,sekuritasSelected)
						$(".bootstrap-tagsinput").append(`<span class="tag tag-selected">${data}<span class="tag-remove" data-role="remove"></span></span>`)
					})
				})
			},() => {
				$(".bootstrap-tagsinput").css("border-color", "#5dcad1")
				return $(".wrapp-list-sekuritas").html(``)
			})
			
			// Remove Tag
			$(".bootstrap-tagsinput").hover(()=>{
				$(".tag-remove").click(function(){
					let index = $(".tag-remove").index($(this));
					$(".tag-selected").each(function(iData){
						if (index === iData) {
							sekuritasSelected.splice(iData, 1)
							$("#sekuritas-terdaftar").attr("data-value" ,sekuritasSelected)
							return $(this).remove();
						}
					})
				})
			})

		// Input Tags Section End
	
	// Select form
		// Investor page
		$("#tipe-pengunjung").on("click", () => {
			$("#tipe-pengunjung").css("color", "#04577c")
			
		}) 
		$("#jenis-kelamin").on("click", () => {
			$("#jenis-kelamin").css("color", "#04577c")
		}) 
		// Emiten page
		$("#kategori-papan").on("click", () => {
			$("#kategori-papan").css("color", "#04577c")
		}) 

	// Validate field Emitent
	const checkFieldEmiten = () => {
		if ($("#kode-perusahaan").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if($("#email-pic").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if($("#deskripsi-perusahaan").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if($("#nama-perusahaan").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if ($("#alamat-perusahaan").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if ($("#pic").val() == ""){
			$(".btn-submit").attr("disabled", true);
		} else if ($("#no-tel-pic").val() == ""){
			$(".btn-submit").attr("disabled", true);
		} else if($("#kategori-papan").val() == ""){
			$(".btn-submit").attr("disabled", true);
		} else if($("#file-input").val() == ""){
			$(".btn-submit").attr("disabled", true);
		} else if($("#file-input")[0].files[0]){
			const fileSizeInKb = $("#file-input")[0].files[0].size / 1000;
			if (fileSizeInKb >= maxFileSize) {
				$(".btn-submit").attr("disabled", true);
			} else{
				$(".btn-submit").attr("disabled", false);
			}
		}
	}
	// Validate field emitent end


	// Validate field Investor
	const checkFieldInvestor = () => {
		if ($("#nama").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if($("#alamat").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if($("#ttl").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if($("#jenis-kelamin").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if ($("#nik").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if ($("#no-tel").val() == ""){
			$(".btn-submit").attr("disabled", true);
		} else if ($("#email").val() == ""){
			$(".btn-submit").attr("disabled", true);
		} else if($("#tipe-pengunjung").val() == null) {
			$(".btn-submit").attr("disabled", true);
		} else if($("#tipe-pengunjung").val() == "investor"){
			if ($("#sekuritas-terdaftar").attr("data-value") == "") {
				$(".btn-submit").attr("disabled", true);
			} else {
				$(".btn-submit").attr("disabled", false);
			}
		} else if($("#tipe-pengunjung").val() == "media"){
			if ($("#tipe-media").val() == "") {
				$(".btn-submit").attr("disabled", true);
			} else {
				$(".btn-submit").attr("disabled", false);
			}
		}else if($("#tipe-pengunjung").val() == "umum"){
			if ($("#umum").val() && $("#sid").val()  == "") {
				$(".btn-submit").attr("disabled", true);
			} else {
				$(".btn-submit").attr("disabled", false);
			}
		} else {
			$(".btn-submit").attr("disabled", false);
		}
	}
	// Validate field investor end

	// Validate field edit Investor
	const checkFieldEditInvestor = () => {
		if ($("#nama").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if($("#alamat").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if($("#ttl").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if($("#jenis-kelamin").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if ($("#nik").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if ($("#no-tel").val() == ""){
			$(".btn-submit").attr("disabled", true);
		} else if ($("#email").val() == ""){
			$(".btn-submit").attr("disabled", true);
		} else if($("#tipe-pengunjung").val() == null) {
			$(".btn-submit").attr("disabled", true);
		} else if($("#tipe-pengunjung").val() == "investor"){
			if ($("#sekuritas-terdaftar").attr("data-value") == "") {
				$(".btn-submit").attr("disabled", true);
			} else {
				$(".btn-submit").attr("disabled", false);
			}
		} else if($("#tipe-pengunjung").val() == "media"){
			if ($("#tipe-media").val() == "") {
				$(".btn-submit").attr("disabled", true);
			} else {
				$(".btn-submit").attr("disabled", false);
			}
		} else {
			$(".btn-submit").attr("disabled", false);
		}
	}
	// Validate field edit investor end

	// Validate field My Submissions
	const checkFieldMySubmissions = () => {
		if ($("#link-yt").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if($("#email-pic").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if($("#deskripsi-perusahaan").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if($("#nama-perusahaan").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if ($("#alamat-perusahaan").val() == "") {
			$(".btn-submit").attr("disabled", true);
		} else if ($("#pic").val() == ""){
			$(".btn-submit").attr("disabled", true);
		} else if ($("#no-tel-pic").val() == ""){
			$(".btn-submit").attr("disabled", true);
		} else if($("#kategori-papan").val() == ""){
			$(".btn-submit").attr("disabled", true);
		} else if($("#file-input")[0].files[0]){
			const fileSizeInKb = $("#file-input")[0].files[0].size / 1000;
			if (fileSizeInKb >= maxFileSize) {
				$(".btn-submit").attr("disabled", true);
			} else{
				$(".btn-submit").attr("disabled", false);
			}
		} else {
			$(".btn-submit").attr("disabled", false);
		}
	}
	// Validate field my submision end

		// On Input change 
		$("input").on("keyup change", () => {
			if($("body").has("#page-investor").length >0){
				checkFieldInvestor();
			} else if ($("body").has("#page-emiten").length >0) {
				checkFieldEmiten();
			} else if ($("body").has("#edit-page-emiten").length >0) {
				checkFieldMySubmissions();
			} else if ($("body").has("#edit-page-investor").length >0){
				checkFieldEditInvestor();
			}
		});
		$("select").on("change", () => {
			if($("body").has("#page-investor").length >0){
				checkFieldInvestor();
			} else if ($("body").has("#page-emiten").length >0) {
				checkFieldEmiten();
			} else if ($("body").has("#edit-page-emiten").length >0) {
				checkFieldMySubmissions();
			} else if ($("body").has("#edit-page-investor").length >0){
				checkFieldEditInvestor();
			}
		});
		$("textarea").on("change", () => {
			if($("body").has("#page-investor").length >0){
				checkFieldInvestor();
			} else if ($("body").has("#page-emiten").length >0) {
				checkFieldEmiten();
			} else if ($("body").has("#edit-page-emiten").length >0) {
				checkFieldMySubmissions();
			} else if ($("body").has("#edit-page-investor").length >0){
				checkFieldEditInvestor();
			}
		});
		

		if ($("body").has("#page-investor").length >0) {
			$(".bootstrap-tagsinput").on("mouseover click", checkFieldInvestor);
			$(".tag-remove").on("click", checkFieldInvestor);
			$(".tag-selected").on("click", checkFieldInvestor);
			
			$(".bootstrap-tagsinput").on("mouseover click", () =>{
				$(".data-list").each(function(){
					$(this).on("click", () => {
						setTimeout(() => {
							checkFieldInvestor();
						},500)
					})
				})
			});
		} else if ($("body").has("#edit-page-investor").length >0){
			// Edit Investor section
			$(".btn-edit").click(() => {
				// Show submit button
				$(".btn-submit").removeClass("hidden")
				// Change title form
				$("h1").text("Edit Data Saya")
				$(".bootstrap-tagsinput").css("border-color", "#5dcad1")
				$(".bootstrap-tagsinput").css("cursor", "pointer")
				
				// Enable edit field
				$("input").attr("disabled", false)
				$("select").attr("disabled", false)
				$("select").attr("disabled", false)
				
				$("option").each(function(i, el) {
					if (i == 0) {
						$(el).css("display", "none")
					}
				})

				$("textarea").attr("disabled", false)
				$("#file-input").attr("type", "file")
				
				$(".btn-edit").css("display", "none")

				$(".bootstrap-tagsinput").click(()=>{
						let content= []
						$(".bootstrap-tagsinput").css("border-color", "#04577c")
						dataSekuritas.forEach((data) => {
							content.push(`<li class="data-list" data-value="${data.name}" data-id="${data.id}">${data.name}</li>`)
						})
						return $(".wrapp-list-sekuritas").html(`
							<div class="list-sekuritas">
								<ul>${content.join("")}</ul>
							</div>
						`)
				})
			})
			
			$("#jenis-kelamin").css("color", "#04577c")
			$("#tipe-pengunjung").css("color", "#04577c")
			$(".bootstrap-tagsinput").css("cursor", "default")
			$(".bootstrap-tagsinput").css("border-color", "#04577c")

			$("#nama").val("Revina Priagung")
			$("#alamat").text("Bogor")
			$("#ttl").val("2013-01-09")
			$("#jenis-kelamin").val("perempuan")
			$("#nik").val("1989999999909")
			$("#no-tel").val("08966666629")
			$("#email").val("user@email.com")
			$("#tipe-pengunjung").val("investor")
			
			if ($("#tipe-pengunjung").val() === "investor") {
				$("#sekuritas-terdaftar-active").css('display', 'block');
				// Looping data select from DB
				$(".bootstrap-tagsinput").html(`
					<span class="tag tag-selected">Mandiri Sekuritas<span class="tag-remove" data-role="remove"></span></span>
					<span class="tag tag-selected">Maybank Sekuritas<span class="tag-remove" data-role="remove"></span></span>
				`)
				
				// Set in data value
				$("#sekuritas-terdaftar").attr("data-value" ,"Mandiri Sekuritas,Maybank Sekuritas")
				// push data current value
				sekuritasSelected.push("Mandiri Sekuritas","Maybank Sekuritas") // sekuritasSelected type datanya array
			} else if($("#tipe-pengunjung").val() === "media"){
				$("#tipe-media-active").css('display', 'block');
				$("#tipe-media").val('MNC Portal');
			} else if ($("#tipe-pengunjung").val() === "umum") {
				$("#tipe-umum-active").css('display', 'block');
				$("#umum").val("Universitas Indonesia");
				$("#sid").val("987899909");
			}
			
			$(".bootstrap-tagsinput").on("mouseover click", checkFieldEditInvestor);
			$(".tag-remove").on("click", checkFieldEditInvestor);
			$(".tag-selected").on("click", checkFieldEditInvestor);
			
			$(".bootstrap-tagsinput").on("mouseover click", () =>{
				$(".data-list").each(function(){
					$(this).on("click", () => {
						setTimeout(() => {
							checkFieldEditInvestor();
						},500)
					})
				})
			});
		}
		
	

	// My Submissions Section
		const setDisabledForm = () => {
			if ($("body").has("#edit-page-investor").length >0) {
				// Change to default title
				$("h1").text("Data Saya")
				$(".bootstrap-tagsinput").css("border-color", "#04577c")
				$(".bootstrap-tagsinput").css("cursor", "default")
				$(".bootstrap-tagsinput").click(()=>{
					return $(".wrapp-list-sekuritas").html(``)
				});
			} else {
				$("h1").text("Data Perusahaan")
				$("#file-input").attr("type", "text")
				// Set value refrence database
				$("#file-input").val("nama-file-di-db")
			}
			
			// Disable edit field
			$("input").attr("disabled", true)
			$("select").attr("disabled", true)
			$("select").attr("disabled", true)
			$("textarea").attr("disabled", true)

			// Hidden btn
			$(".btn-submit").addClass("hidden")
			
			// Display edit btn
			$(".btn-edit").css("display", "block")

			// Show Alert dialog
			$(".success-edited-alert").css("display", "flex")
			setTimeout(() => {
				$(".success-edited-alert").css("display", "none")
			}, 2000)
		}
		
		

		if ($("body").has("#edit-page-emiten").length > 0) {
			if ($("option").is(":selected")) {
				$("#kategori-papan").css("color", "#533434")
			}

			$(".btn-edit").click(() => {
				// Show submit button
				$(".btn-submit").removeClass("hidden")
				// Change title form
				$("h1").text("Edit Data Perusahaan")
				
				// Enable edit field
				$("input").attr("disabled", false)
				$("select").attr("disabled", false)
				$("select").attr("disabled", false)
				
				$("option").each(function(i, el) {
					if (i == 0) {
						$(el).css("display", "none")
					}
				})

				$("textarea").attr("disabled", false)
				$("#file-input").attr("type", "file")
				
				$(".btn-edit").css("display", "none")
			})
		}


	// Input file selection
		async function progressAction(file) {
			// Endpoint URL unggah yang sesuai
            // const uploadEndpoint = "/upload-endpoint"; 
			
            const startTime = new Date().getTime();// waktu mulai
            const updateInterval = 1000; // Interval untuk memperbarui kecepatan (ms)

			// Methode upload
            // const response = await fetch(uploadEndpoint, {
            //     method: "POST",
            //     body: file,
            // });

            const fileSize = file.size; //get file size
			const fileSizeInKb = fileSize / 1000; //bytes to kb
			$("progress").attr("max", fileSizeInKb) // set target max progress

			
            function updateSpeed() {
				let currentProgress = $("progress").val() //value progress saat ini
				const currentTime = new Date().getTime(); //waktu saat fungsi dijalankan
				const duration = (currentTime - startTime) / 1000;
				const uploadSpeed =  (fileSize / duration ) / 1024; //1024 kb / -+ 1mb
				$("progress").val(currentProgress + Math.ceil(uploadSpeed))// set value progress
				$(".info-upload-speed").text(Math.ceil(uploadSpeed) + "Kbps")// set speed info
				
				// Jika total value progress == total file size
				if ($("progress").val() == fileSizeInKb) {
					// Set selesai
					$(".info-upload-speed").text("Selesai")
					// hentikan progress
					clearInterval(myInterval);
				}
            }
            // Perbarui kecepatan dengan interval
            const myInterval = setInterval(updateSpeed, updateInterval);
			
        }
		
		$("#file-input").click(() => {
			$("#file-input").change(() => {
				let file = $("#file-input")[0].files[0]; //get files data
				if (file) {
					const fileSizeInKb = file.size / 1000; //bytes to kb
					// Jika file lebih dari 20 mb
					if (fileSizeInKb >= maxFileSize) {
						$(".progressBar-wrapp").css("display", "none");
						$(".msg-input-file").removeClass("hidden")
						$("#file-input").addClass("warning")
						$(".btn-submit").attr("disabled", true);
						
						// Hide setelah 2 detik
						setTimeout(() => {
							$(".msg-input-file").addClass("hidden")
							$("#file-input").removeClass("warning")
						}, 2000)
					} else {
						// Jika file sesuai
						// Set Default
						$("progress").val(0)// set value progress
						$(".info-upload-speed").text(0 + "Kbps") //Set speed upload
						// Tampilkan display progress bar
						$(".progressBar-wrapp").css("display", "flex");
						// Function tracking perubahan value speed upload
						progressAction(file)
					}
				}
				
			})
			// Close progress bar
			$(".close-progress").click( () => {
				$(".progressBar-wrapp").css("display", "none");
			})
		})
	// End Input file selection

	// Submit handler
		$("#form-field").submit(function(event) {
			event.preventDefault();
			// Example Get nama
			// let nama = $("#nama-perusahaan").val();

			// POST Methode
			
			// If success
				// Check Form Pages
				if($("body").has("#page-investor").length >0){
					window.location.href = "success-regist-page.html?umum";
				} else if ($("body").has("#page-emiten").length >0) {
					window.location.href = "success-regist-page.html?emiten";
				} else if ($("body").has("#edit-page-emiten").length >0) {
					$(".progressBar-wrapp").css("display", "none");
					setDisabledForm()
				} else if($("body").has("#edit-page-investor").length >0){
					setDisabledForm()
				}
			
		});
	// Submit handler end

	// Home page section
		// Function daftar
		const daftarSection = (daftar) => {
			const path = daftar == "emiten" ? "form-emiten-page.html" : "form-investor-page.html";
			// Cek sudah login / blm
				//	JIka belum, tampilkan login modal
				//	redirect ke page

			// Jika Sudah Login, redirect ke page
			window.location.href = `${path}`
		}
		
		// Action
		$(".daftar-emiten").click(() => daftarSection("emiten"))
		$(".daftar-investor").click(() => daftarSection("investor"))
	
	// Success Page Section
	 if ($("body").has("#page-success-registration").length >0) {
		const getParams = new URLSearchParams(window.location.search);
		if (getParams.has("emiten")) {
			$("#success-info").text("Data Perusahaan Anda telah kami terima dan akan segera dievaluasi. Hasil seleksi emiten yang lolos akan diumumkan melalui website ini dan email terdaftar pada tanggal 26 Oktober 2023.")
			$(".btn-redirect").attr("href", "edit-form-emiten.html")
			$(".btn-redirect").text("View My Submission")
		} else{
			$("#success-info").text("PUBEX LIVE akan dilaksanakan pada tanggal 1-4 November 2023. Cekberkala website ini untuk mendapatkan informasi terbaru mengenai acara.")

			$(".btn-redirect").attr("href", "index.html")
			$(".btn-redirect").text("Home")
		}		
	 }

	//  Page Pubex Live Section
	if ($("body").has("#page-pubex-live").length >0) {
		const getParams = new URLSearchParams(window.location.search);
		if (getParams.has("edited")) {
			$(".success-edited-alert").removeClass("hidden");
			setTimeout(() => {
				$(".success-edited-alert").addClass("hidden");
			},2000)
		}
	}
})
