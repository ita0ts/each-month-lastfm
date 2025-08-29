<?php
// Recebe o corpo da requisição
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['image'])) {
    http_response_code(400);
    echo 'Imagem não recebida.';
    exit;
}

// Extrai o conteúdo base64
$imageData = $data['image'];
$imageData = str_replace('data:image/png;base64,', '', $imageData);
$imageData = str_replace(' ', '+', $imageData);

$image = base64_decode($imageData);
$filename = 'top_albums_' . time() . '.png';

// Retorna o arquivo para download
header('Content-Type: image/png');
header('Content-Disposition: attachment; filename="' . $filename . '"');
echo $image;
exit;
