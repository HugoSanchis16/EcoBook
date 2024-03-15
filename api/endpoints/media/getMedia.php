<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();

    $input = validate($data, [
        'code' => "required|string",
    ]);

    $media = Media::getByUniquecode($db, $input->code);

    $name = "$media->guid.$media->extension";
    $path = FileStorage::FilePath($name);

    $file = fopen($path, 'r');

    header("Content-Type: $media->mime");
    header("Content-Length: $media->size");

    fpassthru($file);
    exit;
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
