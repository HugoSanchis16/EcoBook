<?php

use Illuminate\Support\Facades\Storage;

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

// $data = postInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($_POST, [
        'data' => "required|string",
        'board_guid' => 'required|string',
        'card_guid' => "sometimes|string"
    ]);

    if (!$_FILES) createException('No files selected');
    $files = getFiles();
    $data = json_decode($input->data);

    $board = Board::getByGuid($db, $input->board_guid);
    $card = null;
    if (isset($input->card_guid))
        $card = Card::getByGuid($db, $input->card_guid);

    //Create folders
    $filePath = FileStorage::FilePath();
    $thumbPath = FileStorage::ThumbnailPath();
    if (!file_exists($filePath))
        mkdir($filePath, 0775, true);
    if (!file_exists($thumbPath))
        mkdir($thumbPath, 0775, true);

    $mediaCreated =  [];
    foreach ($files as $index => $file) {
        //Save Media
        $uniqueCode = uniqid();

        $newMedia = new Media($db);
        $newMedia->boardid = $board->id;
        $newMedia->cardid = $card ? $card->id : null;
        $newMedia->uniquecode = $uniqueCode;
        $newMedia->title = $data[$index]->name;
        $newMedia->description = $data[$index]->description;
        $newMedia->alt = $data[$index]->name;
        $newMedia->size = $file->fileSize;
        $newMedia->mime = $file->type;
        $newMedia->extension = FileStorage::getFileExtension($file);
        $newMedia->uploadedby = $userid;
        $newMedia->url = FileStorage::FileURL($uniqueCode);
        $newMedia->thumbnail = FileStorage::ThumbnailURL($uniqueCode);
        $newMedia->store();

        //Move files
        $name = FileStorage::getFileName($newMedia, $file);
        $filePath = FileStorage::FilePath($name);
        move_uploaded_file($file->tempPath, $filePath);

        //Create thumbnail
        $name = FileStorage::getThumbnailName($newMedia, $file);
        $thumbPath = FileStorage::ThumbnailPath($name);
        FileStorage::generateThumbnail($thumbPath, $filePath);

        $mediaCreated[] = array(
            "guid" => $newMedia->guid,
            "fileURL" => $newMedia->url,
            "thumbURL" => $newMedia->thumbnail
        );
    }

    $db->commit();

    Response::sendResponse(["created_media" => $mediaCreated]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
