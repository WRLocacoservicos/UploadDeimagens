

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";


const firebaseConfig = {
apiKey: "AIzaSyDPhTabB7gNHdutY6CH7F9CoC0lxQS7IHw",
authDomain: "upload-de-imagens-396117.firebaseapp.com",
projectId: "upload-de-imagens-396117",
storageBucket: "upload-de-imagens-396117.appspot.com",
messagingSenderId: "875602451810",
appId: "1:875602451810:web:acbaab244dfa8bfecc603b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const input = document.querySelector('input[type=file]');
const progressBar = document.querySelector('progress');
const Ceara = document.querySelector('#Ceara');
const Para = document.querySelector('#Para');
const Balsa = document.querySelector('#Balsa');
const uploadImage = document.querySelector('#uploadImage');


 function logado() { 
 swal.fire({

icon: "success",
title: "Imagem enviada com sucesso!"
});
}


uploadImage.addEventListener( 'click',()=>{
    let folderName = '';
    if (Ceara.checked) {
        folderName = Ceara.name;
    } else if (Para.checked) {
        folderName = Para.name;
    } else if (Balsa.checked) {
        folderName = Balsa.name;
    }

    const files = input.files;
    for(let i = 0; i<files.length; i++){
        let file = files[i];
        const storageRef = ref(storage, `image/${folderName}/${file.name}`); 
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
                logado()
                return
                input.value= ''
            }
        );
    }
})
