<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuth(false);

    $input = validate($data, [
        'email' => 'required|email',
    ]);

    //check if admin exist
    $admin = User::getByEmail($db, $input->email);

    $admin->recoverycode = uniqid("");
    $admin->recoveryexpiry = newDate(15, 'minutes');
    $admin->update();
    $forgot_password->content = str_replace('%FORGOT_PASSWORD_LINK%', APP_URL . "/reset-password/$admin->recoverycode", $forgot_password->content);

    sendEmail(
        $admin->email,
        $forgot_password->subject,
        $forgot_password->content
    );

    $db->commit();
    Response::sendResponse([
        "status" => true
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    if ($th->getCode() !== 0)
        logError($th->getMessage());
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
