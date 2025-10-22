<?php

// --- ZAČETEK: KODA ZA NALAGANJE .ENV DATOTEKE ---

/**
 * Naloži okoljske spremenljivke iz .env datoteke.
 * Pričakuje, da je .env datoteka en nivo višje od mape, kjer se nahaja ta skripta.
 * (npr. skripta je v /public_html/, .env pa v /home/uporabnik/)
 *
 * @param string $path Pot do .env datoteke.
 * @throws Exception Če datoteka ne obstaja.
 */
function loadEnv($path) {
    if (!file_exists($path)) {
        // Varnost: Ne izpišemo točne poti v javnem sporočilu o napaki.
        throw new Exception('Configuration file not found.');
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Preskočimo komentarje, ki se začnejo z #
        if (strpos(trim($line), '#') === 0) {
            continue;
        }

        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);

        // Odstranimo narekovaje na začetku in koncu vrednosti
        if (substr($value, 0, 1) == '"' && substr($value, -1) == '"') {
            $value = substr($value, 1, -1);
        }

        // Naložimo spremenljivko, da bo dostopna preko getenv()
        if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
            putenv(sprintf('%s=%s', $name, $value));
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

// --- KONEC: KODA ZA NALAGANJE .ENV DATOTEKE ---


// Poskusimo naložiti .env datoteko
try {
    // __DIR__ je trenutna mapa (/.../public_html), '/../' gre en nivo višje.
    loadEnv(__DIR__ . '/../.env');
} catch (Exception $e) {
    http_response_code(500);
    // Pošljemo generično sporočilo o napaki, da ne razkrijemo strukture strežnika.
    echo json_encode(['status' => 'error', 'message' => 'Internal server configuration error.']);
    exit;
}

// Preverimo, ali je zahteva poslana z metodo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

// Pridobimo Airtable nastavitve iz okoljskih spremenljivk, ki smo jih naložili
$airtableApiKey = getenv('AIRTABLE_API_KEY');
$airtableBaseId = getenv('AIRTABLE_BASE_ID');
$airtableTableName = getenv('AIRTABLE_TABLE_NAME');

// Preverimo, ali so vse potrebne nastavitve prisotne. Če niso, je napaka v .env datoteki.
if (!$airtableApiKey || !$airtableBaseId || !$airtableTableName) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Airtable configuration is missing on the server.']);
    exit;
}

// Preberemo podatke, ki jih je poslal React obrazec
$input = json_decode(file_get_contents('php://input'), true);

// Preverimo, ali so vsi obvezni podatki iz obrazca prisotni
if (empty($input['ime']) || empty($input['email']) || empty($input['sporocilo'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Manjkajoči podatki. Prosimo, izpolnite vsa obvezna polja.']);
    exit;
}

// Pripravimo podatke za pošiljanje v Airtable
// POPRAVLJENO: Imena polj se zdaj ujemajo z imeni stolpcev v Airtable.
$data = [
    'fields' => [
        'Name' => $input['ime'],
        'Email' => $input['email'],
        'Phone' => $input['telefonska'] ?? '',
        'Message' => $input['sporocilo']
    ]
];

$jsonData = json_encode($data);

// Uporabimo cURL za pošiljanje podatkov na Airtable API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.airtable.com/v0/{$airtableBaseId}/" . rawurlencode($airtableTableName));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $airtableApiKey,
    'Content-Type: application/json'
]);

// Izvedemo klic in shranimo odgovor
$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Pošljemo ustrezen odgovor nazaj na React aplikacijo
header('Content-Type: application/json');
if ($httpcode >= 200 && $httpcode < 300) {
    echo json_encode(['status' => 'success', 'message' => 'Sporočilo uspešno poslano!']);
} else {
    http_response_code($httpcode);
    echo json_encode(['status' => 'error', 'message' => 'Prišlo je do napake pri komunikaciji z Airtable.', 'details' => json_decode($response)]);
}
?>
