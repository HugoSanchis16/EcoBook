<?php

class CopyResource
{
    public static function getCopy(Copy $copy, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $copy->{$key};
        }

        return $newItem;
    }

    public static function getCopiesArray(array $copies): array
    {
        $itemsArray = [];
        foreach ($copies as $copy) {
            $newItem = self::getCopy($copy, ["guid", "uniqid", "state"]);

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
    public static function getAssignCopiesArray(array $copies): array
    {
        $itemsArray = [];
        foreach ($copies as $copy) {
            $newItem = self::getCopy($copy, ["guid", "uniqid", "state", "book_name"]);

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
}
