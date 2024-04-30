<?php

class CourseResource
{
    public static function getCourse(Course $course, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $course->{$key};
        }

        return $newItem;
    }

    public static function getCoursesArray(array $courses): array
    {
        $itemsArray = [];
        foreach ($courses as $course) {

            $newItem = self::getCourse($course, ['abbr', 'name', 'guid', 'season']);

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }

    public static function getCoursesNamesArray(array $subjects): array
    {
        $itemsArray = [];
        foreach ($subjects as $subject) {

            $newItem = self::getCourse($subject, ['guid', 'name']);

            $itemsArray[] = array(
                "value" => $newItem->guid,
                "label" => $newItem->name
            );
        }
        return $itemsArray;
    }
    public static function getCoursesAbbrArray(array $subjects): array
    {
        $itemsArray = [];
        foreach ($subjects as $subject) {

            $newItem = self::getCourse($subject, ['id', 'abbr']);

            logAPI($newItem);

            $itemsArray[] = array(
                "value" => $newItem->id,
                "label" => $newItem->abbr
            );
        }
        return $itemsArray;
    }
    public static function getCoursesSeasonArray(array $subjects): array
    {
        $itemsArray = [];
        foreach ($subjects as $subject) {

            $newItem = self::getCourse($subject, ['season']);


            $itemsArray[] = array(
                "value" => $newItem->season,
                "label" => $newItem->season
            );
        }
        return $itemsArray;
    }
}
