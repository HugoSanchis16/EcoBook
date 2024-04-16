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
}
