<?php

class UserResource
{
    private static function getUser(User $user, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $user->{$key};
        }

        return $newItem;
    }

    private static function getUsersArray(array $users, array $params)
    {
        $items = [];

        foreach ($users as $user) {
            $items[] = self::getUser($user, $params);
        }

        return $items;
    }

    // public static function getUserResource(User $user)
    // {
    //     $res = new UserResource();

    //     $profile = $user->profile();

    //     $newItem = $res->getUser($user, ['guid', 'email']);
    //     $newItem->{"avatar"} = $profile->avatar;
    //     $newItem->{'fullName'} = $profile->firstname . " " . $profile->lastname;

    //     return $newItem;
    // }

    // public static function getUsersArrayResource(User ...$users): array
    // {
    //     $itemsArray = [];
    //     foreach ($users as $user) {
    //         $profile = $user->profile();

    //         $newItem = self::getUser($user, ['guid', 'email']);
    //         $newItem->{"avatar"} = $profile->avatar;
    //         $newItem->{'fullName'} = $profile->firstname . " " . $profile->lastname;

    //         $itemsArray[] = $newItem;
    //     }
    //     return $itemsArray;
    // }

    // public static function getBoardUsersArrayResource(User ...$users)
    // {
    //     $itemsArray = [];
    //     foreach ($users as $user) {
    //         $profile = $user->profile();

    //         $newItem = self::getUser($user, ['guid', 'email']);
    //         $newItem->{'fullName'} = $profile->firstname . " " . $profile->lastname;
    //         $newItem->{'role'} = $user->{'role'}->name;

    //         $itemsArray[] = $newItem;
    //     }
    //     return $itemsArray;
    // }


    public static function getLoginResource(User $user): array
    {
        $profile = $user->profile();
        return array(
            "token" => $user->token,
            "email" => $user->email,
            "fullName" => $profile->name . " " . $profile->surnames
        );
    }
}
