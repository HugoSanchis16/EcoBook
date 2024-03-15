<?php



include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($data, [
        'guid' => 'required|string',
        'start' => 'required|string',
        "end" => "required|string",
    ]);

    $board = Board::getByGuid($db, $input->guid);
    $status = $board->status();
    $cards = [];

    foreach ($status as $value) {
        $newCards = $value->cards($input->start, $input->end);
        $newCards =  CardResource::getCalendarArrayResource(...$newCards);
        $cards = array_merge($cards, $newCards);
    }

    $db->commit();

    Response::sendResponse([
        "status" => true,
        "data" => $cards
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
