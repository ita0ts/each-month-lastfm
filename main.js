function saveAsImage() {
    const content = document.getElementById('content'); // DOM que será capturado
  
    html2canvas(content, {
      allowTaint: true,
      useCORS: true
    }).then(function (canvas) {
      const imageData = canvas.toDataURL('image/png'); // base64
  
      // Envia para o servidor via fetch
      fetch('download.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageData })
      })
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'top_albums.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch(error => {
        console.error('Erro ao enviar imagem para o servidor:', error);
      });
  
    }).catch(error => {
      console.error('Erro ao capturar a imagem:', error);
    });
  }
  