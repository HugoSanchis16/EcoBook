<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($data, [
        'card_guid' => 'required|string',
    ]);

    $card = Card::getByGuid($db, $input->card_guid);
    $card = CardResource::getCardOverviewResource($card);

    $db->commit();

    Response::sendResponse(["status" => true, "card" => $card]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
