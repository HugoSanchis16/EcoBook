<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($data, [
        'title' => 'required|string',
        'description' => 'sometimes|string',
        'status_guid' => 'required|string',
        'type' => "sometimes|string"
    ]);

    $status = Status::getByGuid($db, $input->status_guid);

    $newCard = new Card($db);
    $newCard->createdby = $userid;
    $newCard->title = $input->title;
    $newCard->description = $input->description;
    $newCard->statusid = $status->id;
    $newCard->position = count($status->cards());
    $newCard->type = $input->type;
    $newCard->store();

    $db->commit();

    Response::sendResponse(["status" => true]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
