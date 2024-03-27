<?php

class SubjectResource
{
    public static function getSubject(Subject $subject, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $subject->{$key};
        }

        return $newItem;
    }

    public static function getSubjectsNamesArray(array $subjects): array
    {
        $itemsArray = [];
        foreach ($subjects as $subject) {

            $newItem = self::getSubject($subject, ['guid', 'name']);

            $itemsArray[] = array(
                "value" => $newItem->guid,
                "label" => $newItem->name
            );
        }
        return $itemsArray;
    }
}
