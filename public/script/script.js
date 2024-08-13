const videoElement = document.getElementById('video');

        // Запрашиваем доступ к камере пользователя
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user' // Используем фронтальную камеру
            }
        })
        .then((stream) => {
            // Передаем видеопоток в элемент <video>
            videoElement.srcObject = stream;
        })
        .catch((error) => {
            console.error('Ошибка доступа к камере: ', error);
        });