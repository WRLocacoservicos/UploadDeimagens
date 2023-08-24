

 const storage = getStorage(app);

 const input = document.querySelector('input[type=file]');
 const progressBar = document.querySelector('progress');

 input.addEventListener('change', (e) => {
     let file = e.target.files[0];
     const storageRef = ref(storage, 'image/' + file.name); 
     const uploadTask = uploadBytesResumable(storageRef, file);

     uploadTask.on("state_changed",
         (snapshot) => {
             let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             progressBar.value = progress;
         },
         (error) => {
             console.log(error);
         },
         () => {
             console.log('Upload realizado com sucesso');
         }
     );
 });
