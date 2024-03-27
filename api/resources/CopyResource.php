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

            $student = $copy->student();
            if ($student) {
                logApi($student);
                $studentProfile = $student->profile();
                $newItem->{"student"} = $studentProfile->name . " " . $studentProfile->surnames;
            }

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
}
