<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();


    $cursesCount = Course::getAllCountDashboard($db);
    $copiesCount = Copy::getAllCountDashboard($db);
    $goodCopiesCount = Copy::getAllCountGoodCopiesDashboard($db);
    $badCopiesCount = Copy::getAllBadCopiesCountDashboard($db);

    $responseData = [
        "cursesCount" => $cursesCount,
        "cursesCountColor" => "#ffaa00",
        "copiesCount" => $copiesCount,
        "copiesCountColor" =>  "#00AAFF",
        "goodCopiesCount" => $goodCopiesCount,
        "goodCopiesColor" => "#55FF55",
        "badCopiesCount" => $badCopiesCount,
        "badCopiesColor" => "#ff4545",
    ];

    $db->commit();
    Response::sendResponse([
        "data" => $responseData,
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
